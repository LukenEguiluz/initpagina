#!/bin/bash

echo "🚀 Solución rápida para problemas de CORS..."

# 1. Verificar si estamos en Docker
if [[ -f "docker-compose.prod.yml" ]] || [[ -f "docker-compose.yml" ]]; then
    echo "🐳 Detectado entorno Docker"
    
    # Parar contenedores
    echo "⏹️  Parando contenedores..."
    if [[ -f "docker-compose.prod.yml" ]]; then
        docker compose -f docker-compose.prod.yml down
    else
        docker compose down
    fi
    
    # Reconstruir backend
    echo "🔨 Reconstruyendo backend..."
    if [[ -f "docker-compose.prod.yml" ]]; then
        docker compose -f docker-compose.prod.yml build backend
    else
        docker compose build backend
    fi
    
    # Levantar contenedores
    echo "🚀 Levantando contenedores..."
    if [[ -f "docker-compose.prod.yml" ]]; then
        docker compose -f docker-compose.prod.yml up -d
    else
        docker compose up -d
    fi
    
else
    echo "💻 Entorno local detectado"
    echo "🔄 Reinicia manualmente el backend Django"
fi

# 2. Esperar a que el backend esté listo
echo "⏳ Esperando a que el backend esté listo..."
sleep 10

# 3. Verificar CORS
echo "🔍 Verificando CORS..."
if curl -fsS -H "Origin: http://init.com.mx" http://localhost:8000/api/ >/dev/null 2>&1; then
    echo "✅ CORS funcionando correctamente"
else
    echo "❌ CORS aún no funciona"
    echo "💡 Verifica que:"
    echo "   - El backend esté corriendo en puerto 8000"
    echo "   - La configuración de CORS incluya init.com.mx"
    echo "   - No haya firewall bloqueando las conexiones"
fi

echo "🎉 Proceso completado!"
