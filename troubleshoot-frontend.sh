#!/bin/bash

# Script de troubleshooting para el frontend
set -e

echo "🔍 Troubleshooting del Frontend..."

# Verificar estructura de archivos
echo "📁 Verificando estructura de archivos..."
if [[ ! -f "frontend/package.json" ]]; then
    echo "❌ frontend/package.json no encontrado"
    exit 1
fi

if [[ ! -f "Dockerfile.frontend" ]]; then
    echo "❌ Dockerfile.frontend no encontrado"
    exit 1
fi

if [[ ! -f "nginx.conf" ]]; then
    echo "❌ nginx.conf no encontrado"
    exit 1
fi

echo "✅ Estructura de archivos correcta"

# Verificar contenido del package.json
echo "📦 Verificando package.json..."
if ! grep -q '"build"' frontend/package.json; then
    echo "❌ Script 'build' no encontrado en package.json"
    exit 1
fi

if ! grep -q '"vite"' frontend/package.json; then
    echo "❌ Vite no encontrado en dependencias"
    exit 1
fi

echo "✅ package.json correcto"

# Verificar dependencias
echo "📋 Verificando dependencias..."
cd frontend
if [[ ! -f "node_modules/.bin/vite" ]]; then
    echo "⚠️  node_modules no encontrado, instalando dependencias..."
    npm install
fi
cd ..

echo "✅ Dependencias verificadas"

# Test build local
echo "🧪 Probando build local..."
cd frontend
if npm run build; then
    echo "✅ Build local exitoso"
else
    echo "❌ Build local falló"
    exit 1
fi
cd ..

# Test build Docker
echo "🐳 Probando build Docker..."
if docker build -f Dockerfile.frontend -t init-frontend-test .; then
    echo "✅ Build Docker exitoso"
    # Limpiar imagen de test
    docker rmi init-frontend-test
else
    echo "❌ Build Docker falló"
    exit 1
fi

echo "🎉 Frontend listo para producción!"
