#!/bin/bash

echo "🚀 Configuración completa del servidor Dokku para INIT"
echo "====================================================="

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Funciones
success() { echo -e "${GREEN}✅ $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }

# Verificar que Dokku esté instalado
if ! command -v dokku &> /dev/null; then
    error "Dokku no está instalado. Instálalo primero."
    exit 1
fi

echo "📋 Paso 1: Instalando plugin PostgreSQL..."
if ! dokku plugin:list | grep postgres; then
    dokku plugin:install https://github.com/dokku/dokku-postgres.git
    success "Plugin PostgreSQL instalado"
else
    warn "Plugin PostgreSQL ya está instalado"
fi

echo ""
echo "📋 Paso 2: Creando aplicaciones..."
# Crear aplicación backend (api)
if ! dokku apps:exists api; then
    dokku apps:create api
    success "Aplicación 'api' creada"
else
    warn "Aplicación 'api' ya existe"
fi

# Crear aplicación frontend (web)
if ! dokku apps:exists web; then
    dokku apps:create web
    success "Aplicación 'web' creada"
else
    warn "Aplicación 'web' ya existe"
fi

echo ""
echo "📋 Paso 3: Configurando base de datos..."
# Crear base de datos PostgreSQL
if ! dokku postgres:exists api-db; then
    dokku postgres:create api-db
    success "Base de datos 'api-db' creada"
else
    warn "Base de datos 'api-db' ya existe"
fi

# Vincular base de datos a la aplicación api
dokku postgres:link api-db api
success "Base de datos vinculada a la aplicación 'api'"

echo ""
echo "📋 Paso 4: Configurando variables de entorno para Django..."
# Configurar variables de entorno para Django
dokku config:set api \
  DJANGO_SETTINGS_MODULE=init_backend.settings \
  SECRET_KEY="$(openssl rand -base64 32)" \
  DEBUG=False \
  ALLOWED_HOSTS="api.init.com.mx,.dokku.me,.herokuapp.com" \
  CORS_ALLOWED_ORIGINS="https://init.com.mx,https://www.init.com.mx" \
  PYTHONUNBUFFERED=1 \
  TZ=America/Mexico_City
success "Variables de entorno configuradas para Django"

echo ""
echo "📋 Paso 5: Configurando variables de entorno para React..."
# Configurar variables de entorno para React
dokku config:set web \
  NODE_ENV=production \
  VITE_API_BASE_URL=https://api.init.com.mx \
  VITE_APP_NAME=INIT \
  VITE_APP_VERSION=1.0.0 \
  VITE_DEV_MODE=false

# Configurar Nginx para el frontend (SPA)
dokku nginx:set web client-max-body-size 10M
success "Variables de entorno configuradas para React"

echo ""
echo "📋 Paso 6: Creando llave SSH para GitHub Actions..."
# Crear llave SSH para GitHub Actions
if [ ! -f /root/gha-dokku ]; then
    ssh-keygen -t ed25519 -C "gha-dokku" -f /root/gha-dokku -N ""
    dokku ssh-keys:add gha /root/gha-dokku.pub
    success "Llave SSH creada y agregada a Dokku"
else
    warn "Llave SSH ya existe"
fi

echo ""
echo "📋 Paso 7: Configurando dominios..."
# Configurar dominios
dokku domains:add api api.init.com.mx
dokku domains:add web init.com.mx
dokku domains:add web www.init.com.mx
success "Dominios configurados"

echo ""
echo "🎉 ¡Configuración del servidor completada!"
echo "=========================================="
echo ""
echo "📋 Información importante:"
echo ""
echo "🔑 Llave SSH privada (agrégala a GitHub Secrets como SSH_PRIVATE_KEY):"
echo "=========================================="
cat /root/gha-dokku
echo "=========================================="
echo ""
echo "🌐 URLs de las aplicaciones:"
echo "   Backend (API): https://api.init.com.mx"
echo "   Frontend (Web): https://init.com.mx"
echo ""
echo "🔧 Comandos útiles:"
echo "   Ver logs backend: dokku logs api -t"
echo "   Ver logs frontend: dokku logs web -t"
echo "   Reiniciar backend: dokku ps:restart api"
echo "   Reiniciar frontend: dokku ps:restart web"
echo "   Ver configuración: dokku config api"
echo ""
echo "📝 Próximos pasos:"
echo "   1. Copia la llave SSH privada arriba"
echo "   2. Ve a GitHub → Settings → Secrets → Actions"
echo "   3. Crea los secrets:"
echo "      - DOKKU_HOST = $(hostname -I | awk '{print $1}')"
echo "      - SSH_PRIVATE_KEY = (la llave privada de arriba)"
echo "   4. Haz commit y push de tu código"
echo "   5. Ejecuta: dokku letsencrypt api && dokku letsencrypt web"
echo ""
