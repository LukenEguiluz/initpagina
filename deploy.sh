#!/usr/bin/env bash
#
# Despliegue para Docker Compose v2 (docker compose ...)
# Uso:
#   ./deploy.sh [production|staging] [--prune]
#
# Requiere:
#   - docker >= 20.10 y docker compose v2 (integrado)
#   - archivo .env presente (no se sube a git)
#   - archivo docker-compose.prod.yml o docker-compose.staging.yml
#
set -Eeuo pipefail
IFS=$'\n\t'

# ---------- Colores ----------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

info()    { echo -e "${GREEN}[INFO]${NC} $*"; }
warn()    { echo -e "${YELLOW}[WARN]${NC} $*"; }
error()   { echo -e "${RED}[ERROR]${NC} $*"; }
header()  { echo -e "${BLUE}================================${NC}\n${BLUE} $*${NC}\n${BLUE}================================${NC}"; }

trap 'error "Fallo en la línea $LINENO"; exit 1' ERR

# ---------- Args ----------
ENVIRONMENT="${1:-production}"
PRUNE="false"
if [[ "${2:-}" == "--prune" ]]; then
  PRUNE="true"
fi

if [[ "$ENVIRONMENT" != "production" && "$ENVIRONMENT" != "staging" ]]; then
  error "Ambiente debe ser 'production' o 'staging'"
  exit 1
fi

COMPOSE_FILE="docker-compose.${ENVIRONMENT}.yml"
if [[ ! -f "$COMPOSE_FILE" ]]; then
  # fallback a nombres comunes
  [[ -f "docker-compose.prod.yml" && "$ENVIRONMENT" == "production" ]] && COMPOSE_FILE="docker-compose.prod.yml"
  [[ -f "docker compose.prod.yml" && "$ENVIRONMENT" == "production" ]] && COMPOSE_FILE="docker compose.prod.yml" # por si existe con espacio (no recomendado)
fi

header "Despliegue INIT - ${ENVIRONMENT}"
info "Usando compose file: ${COMPOSE_FILE}"

# ---------- Checks de binarios ----------
command -v docker >/dev/null || { error "Docker no está instalado"; exit 1; }
docker compose version >/dev/null 2>&1 || { error "Docker Compose v2 no está disponible (usa 'docker compose')"; exit 1; }
command -v openssl >/dev/null || warn "openssl no encontrado (solo necesario si generas certs autofirmados)"
command -v curl >/dev/null || warn "curl no encontrado (solo necesario para health HTTP)"

# ---------- .env ----------
if [[ ! -f ".env" ]]; then
  error "Archivo .env no encontrado"
  if [[ -f ".env.example" ]]; then
    info "Creando .env desde .env.example"
    cp .env.example .env
    warn "Edita el archivo .env con tus configuraciones"
  fi
  exit 1
fi

# Cargar variables de entorno (sin romper si hay export ya hecho)
set -a
# shellcheck disable=SC1091
source .env
set +a

# ---------- Variables críticas ----------
: "${SECRET_KEY:?SECRET_KEY no está configurada en .env}"
: "${DB_PASSWORD:?DB_PASSWORD no está configurada en .env}"

# Opcionales
APP_HOST="${APP_HOST:-localhost}"
HEALTH_URL="${HEALTH_URL:-http://localhost/health}"
SSL_DIR="${SSL_DIR:-ssl}"
LOG_DIR="${LOG_DIR:-logs}"
MEDIA_DIR="${MEDIA_DIR:-backend/media/team}"
STATIC_DIR="${STATIC_DIR:-backend/staticfiles}"

# ---------- Directorios ----------
info "Creando directorios necesarios..."
mkdir -p "${LOG_DIR}/nginx" "${SSL_DIR}" "${MEDIA_DIR}" "${STATIC_DIR}"

# ---------- SSL (solo producción, autofirmado si no hay certs) ----------
if [[ "$ENVIRONMENT" == "production" ]]; then
  if [[ ! -f "${SSL_DIR}/cert.pem" || ! -f "${SSL_DIR}/key.pem" ]]; then
    warn "Certificados SSL no encontrados en ${SSL_DIR}"
    if command -v openssl >/dev/null; then
      info "Generando certificados SSL autofirmados (temporal)..."
      openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "${SSL_DIR}/key.pem" \
        -out "${SSL_DIR}/cert.pem" \
        -subj "/C=MX/ST=CDMX/L=Ciudad de México/O=INIT/CN=${APP_HOST}"
      warn "Usa Let's Encrypt (Caddy/Traefik/certbot) para certs reales."
    else
      warn "openssl no disponible: omitiendo generación de certs."
    fi
  fi
fi

# ---------- Bajar stack anterior ----------
info "Parando contenedores existentes..."
docker compose -f "${COMPOSE_FILE}" down --remove-orphans || true

# ---------- Limpieza opcional ----------
if [[ "${PRUNE}" == "true" ]]; then
  warn "Limpiando imágenes y recursos no utilizados (docker system prune -f)"
  docker system prune -f
else
  info "Saltando prune (usa --prune para limpiar imágenes colgantes)."
fi

# ---------- Build & Up ----------
info "Construyendo y levantando contenedores..."
# Usa progreso plain para logs más legibles en CI
if ! DOCKER_BUILDKIT=1 docker compose -f "${COMPOSE_FILE}" build --pull --progress=plain; then
    error "❌ Error en el build. Verificando problemas comunes..."
    
    # Verificar que los archivos necesarios existen
    if [[ ! -f "frontend/package.json" ]]; then
        error "❌ frontend/package.json no encontrado"
        exit 1
    fi
    
    if [[ ! -f "backend/requirements.txt" ]]; then
        error "❌ backend/requirements.txt no encontrado"
        exit 1
    fi
    
    # Intentar build individual para identificar el problema
    info "🔍 Intentando build individual del frontend..."
    if ! docker build -f Dockerfile.frontend .; then
        error "❌ Error en build del frontend"
        exit 1
    fi
    
    info "🔍 Intentando build individual del backend..."
    if ! docker build -f Dockerfile.backend .; then
        error "❌ Error en build del backend"
        exit 1
    fi
    
    error "❌ Build individual exitoso pero compose falló. Revisa la configuración."
    exit 1
fi

if ! docker compose -f "${COMPOSE_FILE}" up -d; then
    error "❌ Error al levantar contenedores"
    exit 1
fi

# ---------- Espera de servicios ----------
# Si tienes healthchecks en tus servicios (Dockerfile/compose), puedes esperar por ellos.
wait_for_healthy() {
  local service="$1"
  local timeout="${2:-120}"
  local start_ts
  start_ts=$(date +%s)
  info "Esperando a que '${service}' esté healthy (timeout ${timeout}s)..."
  while true; do
    local status
    status="$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{end}}' "$(docker compose -f "${COMPOSE_FILE}" ps -q "${service}")" 2>/dev/null || true)"
    [[ "${status}" == "healthy" ]] && { info "Servicio '${service}' healthy ✅"; return 0; }
    if (( $(date +%s) - start_ts > timeout )); then
      warn "Timeout esperando health de '${service}'"
      return 1
    fi
    sleep 2
  done
}

# Si tus servicios definen healthcheck, agrégalos aquí para esperar por ellos.
# Ejemplo:
# wait_for_healthy backend || true
# wait_for_healthy frontend || true

# ---------- Logs y estado ----------
info "Estado de los contenedores:"
docker compose -f "${COMPOSE_FILE}" ps

info "Últimas líneas de logs:"
docker compose -f "${COMPOSE_FILE}" logs --tail=50 || true

# ---------- Health HTTP opcional ----------
if command -v curl >/dev/null; then
  info "Verificando conectividad HTTP (${HEALTH_URL})..."
  if curl -fsS "${HEALTH_URL}" >/dev/null 2>&1; then
    info "✅ Aplicación respondiendo correctamente"
  else
    warn "La aplicación no respondió en ${HEALTH_URL}. Revisando logs de servicios comunes..."
    # Ajusta nombres de servicios según tu compose
    docker compose -f "${COMPOSE_FILE}" logs backend || true
    docker compose -f "${COMPOSE_FILE}" logs frontend || true
    docker compose -f "${COMPOSE_FILE}" logs web || true
  fi
else
  warn "curl no instalado; omitiendo verificación HTTP."
fi

# ---------- Resumen ----------
header "Despliegue Completado"
echo -e "${GREEN}✅ Aplicación desplegada exitosamente${NC}"
# IP pública (puede fallar si no hay salida a internet)
PUB_IP="$(curl -s ifconfig.me || echo 'your-server-ip')"
echo -e "${BLUE}🌐 URL (estimada):${NC} http://${PUB_IP}"
echo -e "${BLUE}📊 Estado:${NC} docker compose -f '${COMPOSE_FILE}' ps"
echo -e "${BLUE}📋 Logs:${NC} docker compose -f '${COMPOSE_FILE}' logs -f"
echo -e "${BLUE}🛑 Parar:${NC} docker compose -f '${COMPOSE_FILE}' down"

echo
header "Comandos Útiles"
echo -e "${YELLOW}Ver logs en tiempo real:${NC}"
echo "docker compose -f '${COMPOSE_FILE}' logs -f"
echo -e "${YELLOW}Reiniciar servicios:${NC}"
echo "docker compose -f '${COMPOSE_FILE}' restart"
echo -e "${YELLOW}Actualizar app (git pull + deploy):${NC}"
echo "git pull && ./deploy.sh ${ENVIRONMENT}"
echo -e "${YELLOW}Backup DB (ajusta nombres de servicio/vars):${NC}"
echo "docker compose -f '${COMPOSE_FILE}' exec db pg_dump -U \"\${DB_USER}\" \"\${DB_NAME}\" > backup.sql"
echo -e "${YELLOW}Restaurar DB:${NC}"
echo "docker compose -f '${COMPOSE_FILE}' exec -T db psql -U \"\${DB_USER}\" \"\${DB_NAME}\" < backup.sql"

info "¡Despliegue completado! 🚀"