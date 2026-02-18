#!/bin/bash

# Crear archivo .env.production para el frontend
cat > .env.production << EOF
VITE_API_BASE_URL=https://api.init.com.mx
VITE_APP_NAME=INIT
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=false
VITE_DOMAIN=init.com.mx
VITE_API_DOMAIN=api.init.com.mx
EOF

echo "✅ Archivo .env.production creado exitosamente"
echo "Contenido del archivo .env.production:"
echo "======================================"
cat .env.production
