#!/bin/bash

# Crear archivo .env para el frontend
cat > .env << EOF
# ===== CONFIGURACIÓN DEL FRONTEND =====

# API Configuration
VITE_API_BASE_URL=https://api.init.com.mx

# App Configuration
VITE_APP_NAME=INIT
VITE_APP_VERSION=1.0.0

# Development Configuration
VITE_DEV_MODE=false

# ===== CONFIGURACIÓN DE DOMINIO =====
VITE_DOMAIN=init.com.mx
VITE_API_DOMAIN=api.init.com.mx
EOF

echo "✅ Archivo .env creado exitosamente en el directorio frontend"
echo "Contenido del archivo .env:"
echo "=========================="
cat .env
