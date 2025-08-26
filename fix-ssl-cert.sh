#!/bin/bash

echo "🔒 Regenerando certificado SSL con api.init.com.mx..."
echo "=================================================="

# Verificar si estamos en el droplet
if [[ ! -f "docker-compose.prod.yml" ]]; then
    echo "❌ No se encontró docker-compose.prod.yml"
    echo "💡 Ejecuta este script en tu droplet de DigitalOcean"
    exit 1
fi

# Crear directorio SSL si no existe
sudo mkdir -p ssl

# Parar contenedores para regenerar certificado
echo "⏹️  Parando contenedores..."
docker compose -f docker-compose.prod.yml down

# Regenerar certificado SSL con api.init.com.mx incluido
echo "🔑 Generando nuevo certificado SSL..."
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/key.pem \
    -out ssl/cert.pem \
    -subj '/C=MX/ST=CDMX/L=Ciudad de México/O=INIT/CN=init.com.mx' \
    -addext 'subjectAltName=DNS:init.com.mx,DNS:www.init.com.mx,DNS:api.init.com.mx'

# Verificar que el certificado se creó correctamente
echo "✅ Verificando certificado..."
if sudo openssl x509 -in ssl/cert.pem -text -noout | grep -q "api.init.com.mx"; then
    echo "✅ Certificado incluye api.init.com.mx"
else
    echo "❌ Error: Certificado no incluye api.init.com.mx"
    exit 1
fi

# Mostrar detalles del certificado
echo "📋 Detalles del certificado:"
sudo openssl x509 -in ssl/cert.pem -text -noout | grep -A 5 "Subject Alternative Name"

# Reconstruir contenedores
echo "🔨 Reconstruyendo contenedores..."
docker compose -f docker-compose.prod.yml build frontend

# Levantar contenedores
echo "🚀 Levantando contenedores..."
docker compose -f docker-compose.prod.yml up -d

echo "⏳ Esperando a que los servicios estén listos..."
sleep 15

# Verificar que funciona
echo "🔍 Verificando que funciona..."
echo ""

echo "📋 Probando api.init.com.mx:"
if curl -k -s -I https://api.init.com.mx/health | grep -q "200"; then
    echo "✅ api.init.com.mx funciona correctamente"
else
    echo "❌ api.init.com.mx no responde correctamente"
fi

echo ""
echo "📋 Probando init.com.mx:"
if curl -k -s -I https://init.com.mx | grep -q "200"; then
    echo "✅ init.com.mx funciona correctamente"
else
    echo "❌ init.com.mx no responde correctamente"
fi

echo ""
echo "🎉 Certificado SSL regenerado exitosamente!"
echo ""
echo "⚠️  NOTA: Este es un certificado autofirmado."
echo "💡 Para producción, usa Let's Encrypt o un certificado real."
echo ""
echo "🧪 Para probar en el navegador, acepta el certificado autofirmado."
