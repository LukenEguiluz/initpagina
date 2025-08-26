#!/bin/bash

echo "🔍 Verificando estado de los servicios..."
echo "========================================"

# Verificar estado de contenedores
echo "📋 Estado de contenedores:"
docker compose ps

echo ""
echo "📋 Logs de Nginx (últimas 10 líneas):"
docker compose logs --tail=10 nginx

echo ""
echo "📋 Logs de Frontend (últimas 10 líneas):"
docker compose logs --tail=10 frontend

echo ""
echo "📋 Logs de Backend (últimas 10 líneas):"
docker compose logs --tail=10 backend

echo ""
echo "🌐 Verificando DNS:"
DROPLET_IP=$(curl -s ifconfig.me)
INIT_IP=$(dig +short init.com.mx)
API_IP=$(dig +short api.init.com.mx)

echo "📍 IP del droplet: $DROPLET_IP"
echo "📍 init.com.mx apunta a: $INIT_IP"
echo "📍 api.init.com.mx apunta a: $API_IP"

echo ""
echo "🔒 Verificando certificados SSL:"
if [[ -f "ssl/cert.pem" ]]; then
    echo "✅ Certificado SSL existe"
    openssl x509 -in ssl/cert.pem -text -noout | grep -A 5 "Subject Alternative Name"
else
    echo "❌ Certificado SSL no existe"
fi

echo ""
echo "🧪 Probando conectividad local:"
echo "📋 Puerto 80:"
curl -s -I http://localhost 2>/dev/null | head -1 || echo "❌ Puerto 80 no responde"

echo "📋 Puerto 443:"
curl -s -k -I https://localhost 2>/dev/null | head -1 || echo "❌ Puerto 443 no responde"

echo ""
echo "🎯 Posibles problemas:"
echo "===================="
echo "1. DNS no configurado correctamente"
echo "2. Contenedores no están corriendo"
echo "3. Certificados SSL incorrectos"
echo "4. Puertos bloqueados por firewall"
echo "5. Configuración de Nginx incorrecta"
