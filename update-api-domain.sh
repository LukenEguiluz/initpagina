#!/bin/bash

echo "🚀 Actualizando configuración para API separada..."
echo "=================================================="

# 1. Hacer pull de los cambios
echo "📥 Haciendo pull de los cambios..."
git pull origin main

# 2. Crear archivo .env del frontend
echo "📝 Creando archivo .env del frontend..."
cd frontend
./create_env.sh
cd ..

# 3. Verificar configuración
echo "🔍 Verificando configuración..."
./verify-api-config.sh

# 4. Si estamos en Docker, actualizar
if [[ -f "docker-compose.prod.yml" ]] || [[ -f "docker-compose.yml" ]]; then
    echo "🐳 Actualizando contenedores Docker..."
    
    # Parar contenedores
    if [[ -f "docker-compose.prod.yml" ]]; then
        docker compose -f docker-compose.prod.yml down
    else
        docker compose down
    fi
    
    # Reconstruir
    if [[ -f "docker-compose.prod.yml" ]]; then
        docker compose -f docker-compose.prod.yml build
    else
        docker compose build
    fi
    
    # Levantar
    if [[ -f "docker-compose.prod.yml" ]]; then
        docker compose -f docker-compose.prod.yml up -d
    else
        docker compose up -d
    fi
    
    echo "⏳ Esperando a que los servicios estén listos..."
    sleep 15
    
    # Verificar estado
    echo "🔍 Verificando estado..."
    if [[ -f "docker-compose.prod.yml" ]]; then
        docker compose -f docker-compose.prod.yml ps
    else
        docker compose ps
    fi
fi

echo ""
echo "🎉 Configuración actualizada!"
echo ""
echo "📋 URLs finales:"
echo "   Frontend: https://init.com.mx"
echo "   Backend:  https://api.init.com.mx"
echo ""
echo "🧪 Para probar:"
echo "   curl https://api.init.com.mx/team/public/"
echo "   curl https://api.init.com.mx/health"
