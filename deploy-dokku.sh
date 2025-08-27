#!/bin/bash

echo "🚀 Despliegue INIT con Dokku"
echo "============================"

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

# Nombre de la aplicación
APP_NAME="init-backend"

echo "📋 Configurando aplicación Dokku..."

# Crear aplicación si no existe
if ! dokku apps:exists $APP_NAME; then
    echo "🔧 Creando aplicación $APP_NAME..."
    dokku apps:create $APP_NAME
    success "Aplicación creada"
else
    warn "La aplicación $APP_NAME ya existe"
fi

# Configurar base de datos PostgreSQL
echo "🗄️  Configurando base de datos..."
if ! dokku postgres:exists $APP_NAME-db; then
    dokku postgres:create $APP_NAME-db
    dokku postgres:link $APP_NAME-db $APP_NAME
    success "Base de datos creada y vinculada"
else
    warn "La base de datos ya existe"
fi

# Configurar variables de entorno
echo "⚙️  Configurando variables de entorno..."
dokku config:set $APP_NAME DEBUG=False
dokku config:set $APP_NAME ALLOWED_HOSTS=".dokku.me,.herokuapp.com,init.com.mx,www.init.com.mx"
dokku config:set $APP_NAME CORS_ALLOWED_ORIGINS="https://init.com.mx,https://www.init.com.mx"
success "Variables de entorno configuradas"

# Configurar dominio personalizado (opcional)
read -p "¿Quieres configurar un dominio personalizado? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Ingresa el dominio (ej: api.init.com.mx): " DOMAIN
    if [ ! -z "$DOMAIN" ]; then
        dokku domains:add $APP_NAME $DOMAIN
        success "Dominio $DOMAIN configurado"
    fi
fi

# Desplegar aplicación
echo "🚀 Desplegando aplicación..."
git push dokku main:master

# Ejecutar migraciones
echo "🔄 Ejecutando migraciones..."
dokku run $APP_NAME python manage.py migrate

# Crear superusuario (opcional)
read -p "¿Quieres crear un superusuario? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    dokku run $APP_NAME python manage.py createsuperuser
fi

# Mostrar información
echo ""
echo "🎉 ¡Despliegue completado!"
echo "=========================="
echo ""
echo "📋 Información de la aplicación:"
echo "   URL: https://$APP_NAME.dokku.me"
if [ ! -z "$DOMAIN" ]; then
    echo "   Dominio personalizado: https://$DOMAIN"
fi
echo ""
echo "🔧 Comandos útiles:"
echo "   Ver logs: dokku logs $APP_NAME"
echo "   Reiniciar: dokku ps:restart $APP_NAME"
echo "   Configuración: dokku config $APP_NAME"
echo "   Base de datos: dokku postgres:info $APP_NAME-db"
echo ""
