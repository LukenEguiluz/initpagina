#!/bin/bash

echo "🔍 Verificando estado de puertos..."
echo "=================================="

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

success() { echo -e "${GREEN}✅ $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }

# 1. Verificar qué puertos están escuchando
echo "📋 Puertos escuchando en el sistema:"
echo "==================================="
sudo netstat -tlnp | grep -E ':(80|443|8000|5432)' || echo "No se encontraron puertos escuchando"

echo ""
echo "📋 Puertos escuchando en Docker:"
echo "================================"
docker ps --format "table {{.Names}}\t{{.Ports}}" | grep -E '(80|443|8000|5432)' || echo "No se encontraron contenedores con esos puertos"

echo ""
echo "📋 Estado del firewall (UFW):"
echo "============================="
if command -v ufw &> /dev/null; then
    sudo ufw status
else
    echo "UFW no está instalado"
fi

echo ""
echo "📋 Estado del firewall (iptables):"
echo "=================================="
sudo iptables -L -n | grep -E '(80|443|8000|5432)' || echo "No se encontraron reglas específicas"

echo ""
echo "🧪 Probando conectividad local:"
echo "=============================="

# Probar puerto 80
echo "📋 Puerto 80:"
if curl -s -I http://localhost:80 2>/dev/null | head -1; then
    success "Puerto 80 responde"
else
    error "Puerto 80 no responde"
fi

# Probar puerto 443
echo "📋 Puerto 443:"
if curl -s -k -I https://localhost:443 2>/dev/null | head -1; then
    success "Puerto 443 responde"
else
    error "Puerto 443 no responde"
fi

# Probar puerto 8000 (backend)
echo "📋 Puerto 8000 (backend):"
if curl -s -I http://localhost:8000 2>/dev/null | head -1; then
    success "Puerto 8000 responde"
else
    error "Puerto 8000 no responde"
fi

echo ""
echo "🌐 Verificando desde fuera:"
echo "=========================="
DROPLET_IP=$(curl -s ifconfig.me)
echo "📍 IP del droplet: $DROPLET_IP"

# Probar desde fuera (puerto 80)
echo "📋 Puerto 80 desde fuera:"
if curl -s -I http://$DROPLET_IP:80 2>/dev/null | head -1; then
    success "Puerto 80 accesible desde fuera"
else
    error "Puerto 80 NO accesible desde fuera"
fi

# Probar desde fuera (puerto 443)
echo "📋 Puerto 443 desde fuera:"
if curl -s -k -I https://$DROPLET_IP:443 2>/dev/null | head -1; then
    success "Puerto 443 accesible desde fuera"
else
    error "Puerto 443 NO accesible desde fuera"
fi

echo ""
echo "🎯 Soluciones si los puertos están bloqueados:"
echo "============================================="
echo "1. Abrir puertos en UFW:"
echo "   sudo ufw allow 80"
echo "   sudo ufw allow 443"
echo ""
echo "2. Verificar reglas de iptables:"
echo "   sudo iptables -L -n"
echo ""
echo "3. Verificar configuración de DigitalOcean:"
echo "   - Ir a DigitalOcean → Networking → Firewalls"
echo "   - Verificar que los puertos 80 y 443 estén abiertos"
echo ""
echo "4. Reiniciar servicios de red:"
echo "   sudo systemctl restart networking"
echo ""
echo "5. Verificar que Docker esté usando los puertos correctos:"
echo "   docker compose -f docker-compose.prod.yml ps"
