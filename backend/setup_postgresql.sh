#!/bin/bash

echo "=== Configurando PostgreSQL para INIT ==="

# Verificar si PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL no está instalado"
    echo "Por favor instala PostgreSQL:"
    echo "  - macOS: brew install postgresql"
    echo "  - Ubuntu: sudo apt-get install postgresql postgresql-contrib"
    exit 1
fi

echo "✅ PostgreSQL está instalado"

# Verificar si el servicio está corriendo
if ! pg_isready -q; then
    echo "❌ PostgreSQL no está corriendo"
    echo "Inicia PostgreSQL:"
    echo "  - macOS: brew services start postgresql"
    echo "  - Ubuntu: sudo systemctl start postgresql"
    exit 1
fi

echo "✅ PostgreSQL está corriendo"

# Crear base de datos y usuario
echo "Creando base de datos y usuario..."

# Crear usuario
psql -c "CREATE USER init_user WITH PASSWORD 'init_password';" postgres 2>/dev/null || echo "Usuario ya existe"

# Crear base de datos
psql -c "CREATE DATABASE init_db OWNER init_user;" postgres 2>/dev/null || echo "Base de datos ya existe"

# Dar permisos al usuario
psql -c "GRANT ALL PRIVILEGES ON DATABASE init_db TO init_user;" postgres

echo "✅ Base de datos y usuario creados"

echo ""
echo "=== Configuración completada ==="
echo "Base de datos: init_db"
echo "Usuario: init_user"
echo "Contraseña: init_password"
echo ""
echo "Ahora puedes ejecutar:"
echo "  python manage.py migrate"
echo "  python manage.py createsuperuser"
