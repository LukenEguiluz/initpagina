#!/bin/bash

echo "🔧 Diagnosticando problema del subdominio API..."
echo "================================================"

# Verificar si estamos en el droplet
if [[ ! -f "docker-compose.prod.yml" ]]; then
    echo "❌ No se encontró docker-compose.prod.yml"
    echo "💡 Ejecuta este script en tu droplet de DigitalOcean"
    exit 1
fi

echo "📍 Verificando configuración actual..."

# 1. Verificar configuración de Nginx
echo "🌐 Verificando configuración de Nginx..."
if grep -q "server_name api.init.com.mx" nginx.prod.conf; then
    echo "✅ api.init.com.mx configurado en nginx.prod.conf"
else
    echo "❌ api.init.com.mx NO encontrado en nginx.prod.conf"
fi

# 2. Verificar certificado SSL
echo "🔒 Verificando certificado SSL..."
if [[ -f "/etc/nginx/ssl/cert.pem" ]]; then
    echo "✅ Certificado SSL encontrado"
    # Verificar si el certificado incluye api.init.com.mx
    if openssl x509 -in /etc/nginx/ssl/cert.pem -text -noout | grep -q "api.init.com.mx"; then
        echo "✅ Certificado incluye api.init.com.mx"
    else
        echo "❌ Certificado NO incluye api.init.com.mx"
        echo "💡 Necesitas regenerar el certificado SSL"
    fi
else
    echo "❌ Certificado SSL no encontrado"
fi

# 3. Verificar contenedores
echo "🐳 Verificando contenedores..."
if docker compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ Contenedores están corriendo"
else
    echo "❌ Contenedores no están corriendo"
fi

# 4. Verificar logs de Nginx
echo "📋 Verificando logs de Nginx..."
if docker compose -f docker-compose.prod.yml logs nginx 2>/dev/null | grep -q "error"; then
    echo "❌ Errores encontrados en logs de Nginx:"
    docker compose -f docker-compose.prod.yml logs nginx | grep -i error | tail -5
else
    echo "✅ No se encontraron errores en logs de Nginx"
fi

echo ""
echo "🎯 Soluciones posibles:"
echo "======================"

# Solución 1: Regenerar certificado SSL
echo "1️⃣  Regenerar certificado SSL con api.init.com.mx:"
echo "   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\"
echo "   -keyout /etc/nginx/ssl/key.pem \\"
echo "   -out /etc/nginx/ssl/cert.pem \\"
echo "   -subj '/C=MX/ST=CDMX/L=Ciudad de México/O=INIT/CN=init.com.mx' \\"
echo "   -addext 'subjectAltName=DNS:init.com.mx,DNS:www.init.com.mx,DNS:api.init.com.mx'"

echo ""
echo "2️⃣  Reiniciar servicios:"
echo "   docker compose -f docker-compose.prod.yml restart"

echo ""
echo "3️⃣  Verificar configuración:"
echo "   curl -I https://api.init.com.mx/health"
echo "   curl -I https://init.com.mx"

echo ""
echo "🔧 ¿Quieres que ejecute la solución automáticamente? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "🚀 Ejecutando solución automática..."
    
    # Crear directorio SSL si no existe
    sudo mkdir -p /etc/nginx/ssl
    
    # Regenerar certificado SSL
    echo "🔒 Regenerando certificado SSL..."
    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/key.pem \
        -out /etc/nginx/ssl/cert.pem \
        -subj '/C=MX/ST=CDMX/L=Ciudad de México/O=INIT/CN=init.com.mx' \
        -addext 'subjectAltName=DNS:init.com.mx,DNS:www.init.com.mx,DNS:api.init.com.mx'
    
    # Reiniciar servicios
    echo "🔄 Reiniciando servicios..."
    docker compose -f docker-compose.prod.yml restart
    
    echo "⏳ Esperando a que los servicios estén listos..."
    sleep 10
    
    # Verificar
    echo "🔍 Verificando..."
    curl -I https://api.init.com.mx/health 2>/dev/null || echo "❌ api.init.com.mx no responde"
    curl -I https://init.com.mx 2>/dev/null || echo "❌ init.com.mx no responde"
    
    echo "✅ Solución aplicada"
fi
