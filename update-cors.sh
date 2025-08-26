#!/bin/bash

# Script para actualizar configuración de CORS
set -e

echo "🔧 Actualizando configuración de CORS..."

# Verificar si estamos en desarrollo o producción
if [[ "${ENVIRONMENT:-development}" == "production" ]]; then
    echo "📦 Modo producción detectado"
    
    # Actualizar CORS para producción
    cat > backend/init_backend/cors_production.py << 'EOF'
# CORS configuration for production
CORS_ALLOWED_ORIGINS = [
    "https://init.com.mx",
    "https://www.init.com.mx",
    "http://init.com.mx",  # Fallback para desarrollo
    "http://www.init.com.mx",  # Fallback para desarrollo
]

# Permitir credenciales
CORS_ALLOW_CREDENTIALS = True

# Headers permitidos
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    
]

# Métodos permitidos
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]
EOF

    echo "✅ Configuración de CORS para producción creada"
    
else
    echo "🔧 Modo desarrollo detectado"
    
    # Actualizar CORS para desarrollo
    cat > backend/init_backend/cors_development.py << 'EOF'
# CORS configuration for development
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://init.com.mx",
    "https://init.com.mx",
    "http://www.init.com.mx",
    "https://www.init.com.mx",
]

# Permitir credenciales
CORS_ALLOW_CREDENTIALS = True

# Headers permitidos
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Métodos permitidos
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]
EOF

    echo "✅ Configuración de CORS para desarrollo creada"
fi

echo "🔄 Reiniciando servicios..."
if command -v docker &> /dev/null; then
    if [[ -f "docker-compose.prod.yml" ]]; then
        docker compose -f docker-compose.prod.yml restart backend
        echo "✅ Backend reiniciado"
    elif [[ -f "docker-compose.yml" ]]; then
        docker compose restart backend
        echo "✅ Backend reiniciado"
    fi
else
    echo "⚠️  Docker no encontrado. Reinicia manualmente el backend."
fi

echo "🎉 Configuración de CORS actualizada!"
