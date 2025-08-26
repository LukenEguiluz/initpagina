#!/bin/bash

# Crear archivo .env para el backend
cat > .env << EOF
# Django Settings
SECRET_KEY=django-insecure-your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

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
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173
EOF

echo "Archivo .env creado exitosamente en el directorio backend"
echo "Contenido del archivo .env:"
echo "=========================="
cat .env
