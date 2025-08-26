#!/bin/bash

echo "🔍 Diagnosticando problema de Nginx..."
echo "====================================="

# Verificar si estamos en el droplet
if [[ ! -f "docker-compose.prod.yml" ]]; then
    echo "❌ No se encontró docker-compose.prod.yml"
    echo "💡 Ejecuta este script en tu droplet de DigitalOcean"
    exit 1
fi

echo "📍 Verificando configuración actual..."

# 1. Verificar qué archivo de Nginx se está usando
echo "📄 Verificando archivo de Nginx en Dockerfile.frontend..."
if grep -q "nginx.prod.conf" Dockerfile.frontend; then
    echo "✅ Dockerfile.frontend usa nginx.prod.conf"
else
    echo "❌ Dockerfile.frontend usa nginx.conf (INCORRECTO)"
    echo "💡 Necesitas actualizar Dockerfile.frontend"
fi

# 2. Verificar configuración de nginx.prod.conf
echo ""
echo "🌐 Verificando nginx.prod.conf..."
if grep -q "server_name api.init.com.mx" nginx.prod.conf; then
    echo "✅ nginx.prod.conf incluye api.init.com.mx"
else
    echo "❌ nginx.prod.conf NO incluye api.init.com.mx"
fi

if grep -q "server_name init.com.mx" nginx.prod.conf; then
    echo "✅ nginx.prod.conf incluye init.com.mx"
else
    echo "❌ nginx.prod.conf NO incluye init.com.mx"
fi

# 3. Verificar contenedores
echo ""
echo "🐳 Verificando contenedores..."
if docker compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ Contenedores están corriendo"
    
    # Verificar qué configuración está usando el contenedor
    echo "🔍 Verificando configuración dentro del contenedor..."
    if docker exec init_frontend cat /etc/nginx/nginx.conf | grep -q "api.init.com.mx"; then
        echo "✅ Contenedor usa configuración con api.init.com.mx"
    else
        echo "❌ Contenedor NO usa configuración con api.init.com.mx"
    fi
else
    echo "❌ Contenedores no están corriendo"
fi

# 4. Verificar logs
echo ""
echo "📋 Verificando logs de Nginx..."
docker compose -f docker-compose.prod.yml logs frontend | tail -10

echo ""
echo "🎯 Solución:"
echo "==========="
echo "1. El problema está en Dockerfile.frontend"
echo "2. Está usando nginx.conf en lugar de nginx.prod.conf"
echo "3. Necesitas reconstruir el contenedor frontend"
echo ""
echo "🔧 Comandos para solucionar:"
echo "   docker compose -f docker-compose.prod.yml down"
echo "   docker compose -f docker-compose.prod.yml build frontend"
echo "   docker compose -f docker-compose.prod.yml up -d"
echo ""
echo "🚀 ¿Quieres que ejecute la solución automáticamente? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "🔄 Ejecutando solución..."
    
    # Parar contenedores
    echo "⏹️  Parando contenedores..."
    docker compose -f docker-compose.prod.yml down
    
    # Reconstruir frontend
    echo "🔨 Reconstruyendo frontend..."
    docker compose -f docker-compose.prod.yml build frontend
    
    # Levantar contenedores
    echo "🚀 Levantando contenedores..."
    docker compose -f docker-compose.prod.yml up -d
    
    echo "⏳ Esperando a que los servicios estén listos..."
    sleep 15
    
    # Verificar
    echo "🔍 Verificando configuración..."
    if docker exec init_frontend cat /etc/nginx/nginx.conf | grep -q "api.init.com.mx"; then
        echo "✅ Configuración corregida"
    else
        echo "❌ Configuración aún incorrecta"
    fi
    
    echo ""
    echo "🧪 Probando URLs:"
    curl -I https://api.init.com.mx/health 2>/dev/null | head -1 || echo "❌ api.init.com.mx no responde"
    curl -I https://init.com.mx 2>/dev/null | head -1 || echo "❌ init.com.mx no responde"
    
    echo "✅ Solución aplicada"
fi
