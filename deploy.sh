#!/bin/bash

echo "🚀 Despliegue INIT - Simple y Funcional"
echo "======================================"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Funciones
success() { echo -e "${GREEN}✅ $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }

# 1. Actualizar código
echo "📥 Actualizando código..."
git pull origin main
success "Código actualizado"

# 2. Crear directorios
echo "📁 Creando directorios..."
mkdir -p ssl webroot logs/nginx backend/media backend/staticfiles
success "Directorios creados"

# 3. Crear archivos .env
echo "📝 Configurando archivos .env..."
cd frontend && ./create_env.sh && cd ..
cd backend && ./create_env.sh && cd ..
success "Archivos .env configurados"

# 4. Generar certificados SSL
echo "🔒 Generando certificados SSL..."
if [[ ! -f "ssl/cert.pem" ]]; then
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout ssl/key.pem \
        -out ssl/cert.pem \
        -subj '/C=MX/ST=CDMX/L=Ciudad de México/O=INIT/CN=init.com.mx' \
        -addext 'subjectAltName=DNS:init.com.mx,DNS:www.init.com.mx,DNS:api.init.com.mx'
    chmod 600 ssl/key.pem
    chmod 644 ssl/cert.pem
    success "Certificados SSL generados"
else
    success "Certificados SSL ya existen"
fi

# 5. Parar contenedores
echo "⏹️  Parando contenedores..."
docker compose -f docker-compose.prod.yml down 2>/dev/null || true
success "Contenedores detenidos"

# 6. Reconstruir y levantar
echo "🔨 Reconstruyendo contenedores..."
docker compose -f docker-compose.prod.yml build --pull
success "Contenedores construidos"

echo "🚀 Levantando contenedores..."
docker compose -f docker-compose.prod.yml up -d
success "Contenedores levantados"

# 7. Esperar y verificar
echo "⏳ Esperando a que estén listos..."
sleep 15

echo "🔍 Verificando estado..."
docker compose -f docker-compose.prod.yml ps

# 8. Verificar que funciona
echo "🧪 Probando servicios..."
echo ""

# Probar API
if curl -s -k https://api.init.com.mx/health | grep -q "healthy"; then
    success "api.init.com.mx funciona"
else
    warn "api.init.com.mx no responde"
fi

# Probar Frontend
if curl -s -k https://init.com.mx | grep -q "html"; then
    success "init.com.mx funciona"
else
    warn "init.com.mx no responde"
fi

echo ""
echo "🎉 ¡Despliegue completado!"
echo "=========================="
echo ""
echo "📋 URLs:"
echo "   Frontend: https://init.com.mx"
echo "   API:      https://api.init.com.mx"
echo "   Health:   https://api.init.com.mx/health"
echo ""
echo "🔧 Comandos útiles:"
echo "   Ver logs: docker compose -f docker-compose.prod.yml logs"
echo "   Reiniciar: docker compose -f docker-compose.prod.yml restart"
echo "   Parar: docker compose -f docker-compose.prod.yml down"
echo ""
echo "✅ ¡Todo listo!"