#!/bin/bash

# Script de build para el frontend
set -e

echo "🔨 Construyendo frontend..."

# Verificar que estamos en el directorio correcto
if [[ ! -f "frontend/package.json" ]]; then
    echo "❌ Error: No se encontró frontend/package.json"
    echo "Asegúrate de ejecutar este script desde el directorio raíz del proyecto"
    exit 1
fi

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker no está instalado"
    exit 1
fi

# Construir imagen del frontend
echo "📦 Construyendo imagen Docker del frontend..."
docker build -f Dockerfile.frontend -t init-frontend .

echo "✅ Frontend construido exitosamente!"
echo "🚀 Para ejecutar: docker run -p 80:80 init-frontend"
