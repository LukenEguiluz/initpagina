#!/bin/bash

echo "🔄 Reiniciando frontend con configuración corregida..."

# Parar solo el frontend
docker compose -f docker-compose.prod.yml stop frontend

# Reconstruir solo el frontend
docker compose -f docker-compose.prod.yml build frontend

# Levantar el frontend
docker compose -f docker-compose.prod.yml up -d frontend

echo "✅ Frontend reiniciado"
echo "📋 Verificando logs..."
docker compose -f docker-compose.prod.yml logs frontend --tail=20
