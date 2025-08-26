#!/bin/bash

# Crear archivo .env para el backend
cat > .env << EOF
# Django Settings
SECRET_KEY=django-insecure-your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,api.init.com.mx,init.com.mx

# PostgreSQL Database Settings
DB_NAME=init_db
DB_USER=init_user
DB_PASSWORD=init_password
DB_HOST=localhost
DB_PORT=5432

# JWT Settings
JWT_SECRET_KEY=your-jwt-secret-key-here
JWT_ACCESS_TOKEN_LIFETIME=60
JWT_REFRESH_TOKEN_LIFETIME=1440

# CORS Settings
CORS_ALLOWED_ORIGINS=https://init.com.mx,https://www.init.com.mx,https://api.init.com.mx
EOF

echo "Archivo .env creado exitosamente en el directorio backend"
echo "Contenido del archivo .env:"
echo "=========================="
cat .env
