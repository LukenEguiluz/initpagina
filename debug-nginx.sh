#!/bin/bash

echo "🔍 Diagnosticando problemas de Nginx..."
echo "====================================="

# Verificar estado de contenedores
echo "📋 Estado de contenedores:"
docker compose -f docker-compose.prod.yml ps

echo ""
echo "📋 Logs de Nginx (últimas 20 líneas):"
docker compose -f docker-compose.prod.yml logs --tail=20 nginx

echo ""
echo "📋 Logs de todos los servicios:"
docker compose -f docker-compose.prod.yml logs --tail=10

echo ""
echo "🔍 Verificando archivos de configuración..."

# Verificar que los archivos necesarios existan
if [[ -f "nginx.ssl.conf" ]]; then
    echo "✅ nginx.ssl.conf existe"
else
    echo "❌ nginx.ssl.conf NO existe"
fi

if [[ -f "renew-ssl.sh" ]]; then
    echo "✅ renew-ssl.sh existe"
else
    echo "❌ renew-ssl.sh NO existe"
fi

if [[ -f "ssl/cert.pem" ]]; then
    echo "✅ ssl/cert.pem existe"
else
    echo "❌ ssl/cert.pem NO existe"
fi

if [[ -f "ssl/key.pem" ]]; then
    echo "✅ ssl/key.pem existe"
else
    echo "❌ ssl/key.pem NO existe"
fi

echo ""
echo "🎯 Posibles soluciones:"
echo "======================"

# Verificar configuración de Nginx
echo "1️⃣  Verificar configuración de Nginx:"
if [[ -f "nginx.ssl.conf" ]]; then
    echo "   nginx -t (verificar sintaxis):"
    docker run --rm -v $(pwd)/nginx.ssl.conf:/etc/nginx/nginx.conf nginx:alpine nginx -t 2>&1 || echo "   ❌ Error en configuración"
fi

echo ""
echo "2️⃣  Reconstruir imagen de Nginx:"
echo "   docker compose -f docker-compose.prod.yml build nginx"

echo ""
echo "3️⃣  Verificar permisos de SSL:"
echo "   ls -la ssl/"

echo ""
echo "4️⃣  Reiniciar con logs detallados:"
echo "   docker compose -f docker-compose.prod.yml up nginx"

echo ""
echo "🚀 ¿Quieres que ejecute la solución automáticamente? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "🔄 Ejecutando solución automática..."
    
    # Parar contenedores
    echo "⏹️  Parando contenedores..."
    docker compose -f docker-compose.prod.yml down
    
    # Verificar archivos SSL
    echo "🔒 Verificando certificados SSL..."
    if [[ ! -f "ssl/cert.pem" || ! -f "ssl/key.pem" ]]; then
        echo "Generando certificados SSL..."
        mkdir -p ssl
        sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout ssl/key.pem \
            -out ssl/cert.pem \
            -subj '/C=MX/ST=CDMX/L=Ciudad de México/O=INIT/CN=init.com.mx' \
            -addext 'subjectAltName=DNS:init.com.mx,DNS:www.init.com.mx,DNS:api.init.com.mx'
        sudo chown -R $USER:$USER ssl/
        sudo chmod 600 ssl/key.pem
        sudo chmod 644 ssl/cert.pem
    fi
    
    # Reconstruir Nginx
    echo "🔨 Reconstruyendo Nginx..."
    docker compose -f docker-compose.prod.yml build nginx
    
    # Levantar solo Nginx primero
    echo "🚀 Levantando Nginx..."
    docker compose -f docker-compose.prod.yml up nginx -d
    
    # Esperar y verificar
    sleep 10
    echo "🔍 Verificando estado..."
    docker compose -f docker-compose.prod.yml ps
    
    echo "📋 Logs de Nginx:"
    docker compose -f docker-compose.prod.yml logs nginx
    
    echo "✅ Solución aplicada"
fi
