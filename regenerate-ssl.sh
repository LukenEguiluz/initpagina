#!/bin/bash

echo "🔒 Regenerando certificado SSL con api.init.com.mx..."
echo "=================================================="

# Crear directorio SSL si no existe
sudo mkdir -p /etc/nginx/ssl

# Regenerar certificado SSL con api.init.com.mx incluido
echo "🔑 Generando nuevo certificado SSL..."
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/key.pem \
    -out /etc/nginx/ssl/cert.pem \
    -subj '/C=MX/ST=CDMX/L=Ciudad de México/O=INIT/CN=init.com.mx' \
    -addext 'subjectAltName=DNS:init.com.mx,DNS:www.init.com.mx,DNS:api.init.com.mx'

# Verificar que el certificado se creó correctamente
echo "✅ Verificando certificado..."
if sudo openssl x509 -in /etc/nginx/ssl/cert.pem -text -noout | grep -q "api.init.com.mx"; then
    echo "✅ Certificado incluye api.init.com.mx"
else
    echo "❌ Error: Certificado no incluye api.init.com.mx"
    exit 1
fi

# Reiniciar servicios Docker
echo "🔄 Reiniciando servicios..."
if [[ -f "docker-compose.prod.yml" ]]; then
    docker compose -f docker-compose.prod.yml restart
else
    docker compose restart
fi

echo "⏳ Esperando a que los servicios estén listos..."
sleep 10

# Verificar que funciona
echo "🔍 Verificando que funciona..."
echo ""

echo "📋 Probando api.init.com.mx:"
if curl -s -I https://api.init.com.mx/health | grep -q "200"; then
    echo "✅ api.init.com.mx funciona correctamente"
else
    echo "❌ api.init.com.mx no responde correctamente"
fi

echo ""
echo "📋 Probando init.com.mx:"
if curl -s -I https://init.com.mx | grep -q "200"; then
    echo "✅ init.com.mx funciona correctamente"
else
    echo "❌ init.com.mx no responde correctamente"
fi

echo ""
echo "🎉 Certificado SSL regenerado exitosamente!"
echo "💡 Ahora api.init.com.mx debería funcionar independientemente"
