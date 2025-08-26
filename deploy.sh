#!/bin/bash

# Script de despliegue para DigitalOcean
# Uso: ./deploy.sh [production|staging]

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE} $1${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Verificar argumentos
ENVIRONMENT=${1:-production}
if [[ "$ENVIRONMENT" != "production" && "$ENVIRONMENT" != "staging" ]]; then
    print_error "Ambiente debe ser 'production' o 'staging'"
    exit 1
fi

print_header "Despliegue INIT - $ENVIRONMENT"

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker no está instalado"
    exit 1
fi

if ! command -v docker compose &> /dev/null; then
    print_error "Docker Compose no está instalado"
    exit 1
fi

print_message "Docker y Docker Compose verificados"

# Verificar archivo .env
if [[ ! -f ".env" ]]; then
    print_error "Archivo .env no encontrado"
    print_message "Creando archivo .env desde template..."
    cp .env.example .env
    print_warning "Por favor, edita el archivo .env con tus configuraciones"
    exit 1
fi

# Cargar variables de entorno
print_message "Cargando variables de entorno..."
source .env

# Verificar variables críticas
if [[ -z "$SECRET_KEY" ]]; then
    print_error "SECRET_KEY no está configurada en .env"
    exit 1
fi

if [[ -z "$DB_PASSWORD" ]]; then
    print_error "DB_PASSWORD no está configurada en .env"
    exit 1
fi

print_message "Variables de entorno verificadas"

# Crear directorios necesarios
print_message "Creando directorios necesarios..."
mkdir -p logs/nginx
mkdir -p ssl
mkdir -p backend/media/team
mkdir -p backend/staticfiles

# Verificar certificados SSL para producción
if [[ "$ENVIRONMENT" == "production" ]]; then
    if [[ ! -f "ssl/cert.pem" || ! -f "ssl/key.pem" ]]; then
        print_warning "Certificados SSL no encontrados"
        print_message "Generando certificados SSL autofirmados para desarrollo..."
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout ssl/key.pem \
            -out ssl/cert.pem \
            -subj "/C=MX/ST=CDMX/L=Ciudad de México/O=INIT/CN=init.com.mx"
    fi
fi

# Parar contenedores existentes
print_message "Parando contenedores existentes..."
docker compose -f docker compose.prod.yml down --remove-orphans

# Limpiar imágenes no utilizadas
print_message "Limpiando imágenes no utilizadas..."
docker system prune -f

# Construir y levantar contenedores
print_message "Construyendo y levantando contenedores..."
docker compose -f docker compose.prod.yml up -d --build

# Esperar a que los servicios estén listos
print_message "Esperando a que los servicios estén listos..."
sleep 30

# Verificar estado de los contenedores
print_message "Verificando estado de los contenedores..."
docker compose -f docker compose.prod.yml ps

# Verificar logs
print_message "Verificando logs..."
docker compose -f docker compose.prod.yml logs --tail=20

# Verificar conectividad
print_message "Verificando conectividad..."
if curl -f http://localhost/health > /dev/null 2>&1; then
    print_message "✅ Aplicación respondiendo correctamente"
else
    print_warning "⚠️  Aplicación no responde inmediatamente, verificando logs..."
    docker compose -f docker compose.prod.yml logs backend
    docker compose -f docker compose.prod.yml logs frontend
fi

# Mostrar información de despliegue
print_header "Despliegue Completado"

echo -e "${GREEN}✅ Aplicación desplegada exitosamente${NC}"
echo -e "${BLUE}🌐 URL:${NC} http://$(curl -s ifconfig.me)"
echo -e "${BLUE}📊 Estado:${NC} docker compose -f docker compose.prod.yml ps"
echo -e "${BLUE}📋 Logs:${NC} docker compose -f docker compose.prod.yml logs -f"
echo -e "${BLUE}🛑 Parar:${NC} docker compose -f docker compose.prod.yml down"

# Mostrar comandos útiles
print_header "Comandos Útiles"

echo -e "${YELLOW}Ver logs en tiempo real:${NC}"
echo "docker compose -f docker compose.prod.yml logs -f"

echo -e "${YELLOW}Reiniciar servicios:${NC}"
echo "docker compose -f docker compose.prod.yml restart"

echo -e "${YELLOW}Actualizar aplicación:${NC}"
echo "git pull && ./deploy.sh $ENVIRONMENT"

echo -e "${YELLOW}Backup de base de datos:${NC}"
echo "docker compose -f docker compose.prod.yml exec db pg_dump -U \$DB_USER \$DB_NAME > backup.sql"

echo -e "${YELLOW}Restaurar base de datos:${NC}"
echo "docker compose -f docker compose.prod.yml exec -T db psql -U \$DB_USER \$DB_NAME < backup.sql"

print_message "Despliegue completado exitosamente! 🚀"
