#!/bin/bash

echo "🚀 Despliegue completo con SSL automático"
echo "========================================="

# Verificar si estamos en el droplet
if [[ ! -f "docker-compose.prod.yml" ]]; then
    echo "❌ No se encontró docker-compose.prod.yml"
    echo "💡 Ejecuta este script en tu droplet de DigitalOcean"
    exit 1
fi

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones de logging
info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }

# 1. Actualizar código
info "📥 Actualizando código desde GitHub..."
git pull origin main
success "Código actualizado"

# 2. Crear directorios necesarios
info "📁 Creando directorios necesarios..."
mkdir -p ssl webroot logs/nginx logs/certbot backend/media backend/staticfiles
success "Directorios creados"

# 3. Crear archivo .env del frontend
info "📝 Creando archivo .env del frontend..."
cd frontend
./create_env.sh
cd ..
success "Archivo .env del frontend creado"

# 4. Parar contenedores existentes
info "⏹️  Parando contenedores existentes..."
docker compose -f docker-compose.prod.yml down --remove-orphans 2>/dev/null || true
success "Contenedores detenidos"

# 5. Verificar DNS
info "🌐 Verificando configuración DNS..."
DROPLET_IP=$(curl -s ifconfig.me)
INIT_IP=$(dig +short init.com.mx)
API_IP=$(dig +short api.init.com.mx)

echo "📍 IP del droplet: $DROPLET_IP"
echo "📍 init.com.mx apunta a: $INIT_IP"
echo "📍 api.init.com.mx apunta a: $API_IP"

if [[ "$INIT_IP" == "$DROPLET_IP" && "$API_IP" == "$DROPLET_IP" ]]; then
    success "DNS configurado correctamente"
else
    warn "⚠️  DNS no configurado correctamente"
    echo "   Configura en DigitalOcean:"
    echo "   - init.com.mx → $DROPLET_IP"
    echo "   - api.init.com.mx → $DROPLET_IP"
fi

# 6. Instalar certbot si no está
info "📦 Verificando certbot..."
if ! command -v certbot &> /dev/null; then
    info "Instalando certbot..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
    success "Certbot instalado"
else
    success "Certbot ya está instalado"
fi

# 7. Generar certificados SSL iniciales
info "🔒 Generando certificados SSL iniciales..."
if [[ ! -f "ssl/cert.pem" || ! -f "ssl/key.pem" ]]; then
    # Generar certificados autofirmados iniciales
    info "Generando certificados autofirmados iniciales..."
    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout ssl/key.pem \
        -out ssl/cert.pem \
        -subj '/C=MX/ST=CDMX/L=Ciudad de México/O=INIT/CN=init.com.mx' \
        -addext 'subjectAltName=DNS:init.com.mx,DNS:www.init.com.mx,DNS:api.init.com.mx'
    sudo chown -R $USER:$USER ssl/
    sudo chmod 600 ssl/key.pem
    sudo chmod 644 ssl/cert.pem
    success "Certificados autofirmados generados"
else
    success "Certificados SSL ya existen"
fi

# 8. Reconstruir contenedores
info "🔨 Reconstruyendo contenedores..."
if docker compose -f docker-compose.prod.yml build --pull; then
    success "Contenedores construidos"
else
    error "Error construyendo contenedores"
    exit 1
fi

# 9. Levantar contenedores
info "🚀 Levantando contenedores..."
if docker compose -f docker-compose.prod.yml up -d; then
    success "Contenedores levantados"
else
    error "Error levantando contenedores"
    exit 1
fi

# 10. Esperar a que estén listos
info "⏳ Esperando a que los servicios estén listos..."
sleep 20

# 11. Verificar estado
info "🔍 Verificando estado de los contenedores..."
docker compose -f docker-compose.prod.yml ps

# 12. Verificar que funciona
info "🧪 Verificando que funciona..."
echo ""

# Probar API
echo "📋 Probando api.init.com.mx:"
if curl -s -I https://api.init.com.mx/health | grep -q "200"; then
    success "api.init.com.mx funciona correctamente"
else
    warn "api.init.com.mx no responde correctamente"
fi

# Probar Frontend
echo "📋 Probando init.com.mx:"
if curl -s -I https://init.com.mx | grep -q "200"; then
    success "init.com.mx funciona correctamente"
else
    warn "init.com.mx no responde correctamente"
fi

# 13. Configurar renovación automática
info "🔄 Configurando renovación automática..."

# Configurar renovación automática con Docker
info "🔄 Configurando renovación automática con Docker..."

# Crear script de renovación para Docker
sudo tee /usr/local/bin/renew-ssl-docker.sh << 'EOF'
#!/bin/bash
cd /home/kaki/Init
docker exec init_nginx /usr/local/bin/renew-ssl.sh
if [ $? -eq 0 ]; then
    echo "$(date): SSL certificates renewed successfully" >> /var/log/ssl-renewal.log
fi
EOF

sudo chmod +x /usr/local/bin/renew-ssl-docker.sh

# Agregar al crontab para renovación automática
(crontab -l 2>/dev/null | grep -v "renew-ssl-docker.sh"; echo "0 12 * * * /usr/local/bin/renew-ssl-docker.sh") | crontab -
success "Renovación automática configurada (diaria a las 12:00 PM)"

# 14. Mostrar información final
echo ""
echo "🎉 ¡Despliegue completado exitosamente!"
echo "======================================"
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
echo "🔄 SSL se renovará automáticamente cada día a las 12:00 PM"
echo "📅 Próxima renovación: mañana a las 12:00 PM"
echo ""
echo "✅ ¡Todo listo!"
