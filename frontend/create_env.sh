#!/bin/bash

# Crear archivo .env para el frontend
cat > .env << EOF
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api

# App Configuration
VITE_APP_NAME=INIT
VITE_APP_VERSION=1.0.0

# Development Configuration
VITE_DEV_MODE=true
EOF

echo "Archivo .env creado exitosamente en el directorio frontend"
echo "Contenido del archivo .env:"
echo "=========================="
cat .env
