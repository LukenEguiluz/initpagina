#!/bin/bash

echo "🔄 Actualizando aplicación Docker en ejecución..."

# 1. Hacer pull de los cambios
echo "📥 Haciendo pull de los cambios..."
git pull origin main

# 2. Parar contenedores sin eliminar volúmenes
echo "⏹️  Parando contenedores..."
if [[ -f "docker-compose.prod.yml" ]]; then
    docker compose -f docker-compose.prod.yml stop
else
    docker compose stop
fi

# 3. Reconstruir solo el backend (más rápido)
echo "🔨 Reconstruyendo backend con nueva configuración de CORS..."
if [[ -f "docker-compose.prod.yml" ]]; then
    docker compose -f docker-compose.prod.yml build backend
else
    docker compose build backend
fi

# 4. Levantar contenedores
echo "🚀 Levantando contenedores..."
if [[ -f "docker-compose.prod.yml" ]]; then
    docker compose -f docker-compose.prod.yml up -d
else
    docker compose up -d
fi

# 5. Esperar a que esté listo
echo "⏳ Esperando a que los servicios estén listos..."
sleep 15

# 6. Verificar estado
echo "🔍 Verificando estado de los contenedores..."
if [[ -f "docker-compose.prod.yml" ]]; then
    docker compose -f docker-compose.prod.yml ps
else
    docker compose ps
fi

# 7. Verificar CORS
echo "✅ Verificando CORS..."
if curl -fsS -H "Origin: http://init.com.mx" http://localhost:8000/api/ >/dev/null 2>&1; then
    echo "🎉 ¡CORS funcionando correctamente!"
else
    echo "⚠️  CORS aún no responde. Revisando logs..."
    if [[ -f "docker-compose.prod.yml" ]]; then
        docker compose -f docker-compose.prod.yml logs --tail=20 backend
    else
        docker compose logs --tail=20 backend
    fi
fi

echo "🎯 Actualización completada!"
