#!/bin/bash
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=INIT
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=true
VITE_DOMAIN=localhost:5173
VITE_API_DOMAIN=localhost:8000
EOF
echo "✅ Archivo .env de desarrollo creado exitosamente"
echo "Contenido del archivo .env:"
echo "======================================"
cat .env
