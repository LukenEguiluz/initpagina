#!/bin/bash

echo "🔍 Verificando configuración de API separada..."
echo "================================================"

echo "📋 Configuración actual:"
echo "   Frontend: https://init.com.mx"
echo "   Backend:  https://api.init.com.mx"
echo ""

# Verificar configuración de Nginx
echo "🌐 Verificando configuración de Nginx..."
if grep -q "api.init.com.mx" nginx.prod.conf; then
    echo "✅ api.init.com.mx configurado en nginx.prod.conf"
else
    echo "❌ api.init.com.mx NO encontrado en nginx.prod.conf"
fi

if grep -q "init.com.mx" nginx.prod.conf; then
    echo "✅ init.com.mx configurado en nginx.prod.conf"
else
    echo "❌ init.com.mx NO encontrado en nginx.prod.conf"
fi

# Verificar configuración de Django
echo ""
echo "🐍 Verificando configuración de Django..."
if grep -q "api.init.com.mx" backend/init_backend/settings.py; then
    echo "✅ api.init.com.mx en CORS_ALLOWED_ORIGINS"
else
    echo "❌ api.init.com.mx NO en CORS_ALLOWED_ORIGINS"
fi

# Verificar configuración del frontend
echo ""
echo "⚛️  Verificando configuración del frontend..."
if grep -q "api.init.com.mx" frontend/src/config/index.js; then
    echo "✅ API_BASE_URL configurado para api.init.com.mx"
else
    echo "❌ API_BASE_URL NO configurado para api.init.com.mx"
fi

# Verificar Docker Compose
echo ""
echo "🐳 Verificando Docker Compose..."
if grep -q "api.init.com.mx" docker-compose.prod.yml; then
    echo "✅ api.init.com.mx en docker-compose.prod.yml"
else
    echo "❌ api.init.com.mx NO en docker-compose.prod.yml"
fi

echo ""
echo "🎯 URLs de prueba:"
echo "   Frontend: https://init.com.mx"
echo "   API:      https://api.init.com.mx/team/public/"
echo "   Health:   https://api.init.com.mx/health"
echo ""
echo "🔧 Para aplicar cambios:"
echo "   ./deploy.sh production"
