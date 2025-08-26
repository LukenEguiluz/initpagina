#!/bin/bash

echo "🔍 Verificando configuración de CORS..."

# Verificar si el backend está corriendo
if curl -fsS http://localhost:8000/api/ >/dev/null 2>&1; then
    echo "✅ Backend respondiendo en http://localhost:8000"
else
    echo "❌ Backend no responde en http://localhost:8000"
    echo "💡 Asegúrate de que el backend esté corriendo"
    exit 1
fi

# Verificar headers de CORS
echo "📋 Verificando headers de CORS..."
CORS_HEADERS=$(curl -s -I -H "Origin: http://init.com.mx" http://localhost:8000/api/ | grep -i "access-control")

if [[ -n "$CORS_HEADERS" ]]; then
    echo "✅ Headers de CORS encontrados:"
    echo "$CORS_HEADERS"
else
    echo "❌ No se encontraron headers de CORS"
    echo "💡 Verifica la configuración en settings.py"
fi

# Verificar configuración en settings.py
echo "📄 Verificando configuración en settings.py..."
if grep -q "init.com.mx" backend/init_backend/settings.py; then
    echo "✅ init.com.mx encontrado en CORS_ALLOWED_ORIGINS"
else
    echo "❌ init.com.mx NO encontrado en CORS_ALLOWED_ORIGINS"
fi

# Verificar variables de entorno
echo "🔧 Verificando variables de entorno..."
if [[ -f ".env" ]]; then
    echo "✅ Archivo .env encontrado"
    if grep -q "CORS_ALLOWED_ORIGINS" .env; then
        echo "✅ CORS_ALLOWED_ORIGINS configurado en .env"
    else
        echo "⚠️  CORS_ALLOWED_ORIGINS no configurado en .env"
    fi
else
    echo "⚠️  Archivo .env no encontrado"
fi

echo "🎯 Para solucionar problemas de CORS:"
echo "1. Ejecuta: ./update-cors.sh"
echo "2. Reinicia el backend: docker compose restart backend"
echo "3. Verifica: curl -H 'Origin: http://init.com.mx' http://localhost:8000/api/"
