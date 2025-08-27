# INIT - Empresa de Desarrollo de Software

Sitio web corporativo de INIT con sistema de autenticación y gestión de equipo.

## 🚀 Despliegue con Dokku

### Prerrequisitos

- Servidor con Dokku instalado
- Dominio configurado (opcional)

### Despliegue Automático

```bash
# Clonar el repositorio
git clone https://github.com/KakiGro/Init.git
cd Init

# Ejecutar el script de despliegue
chmod +x deploy-dokku.sh
./deploy-dokku.sh
```

### Despliegue Manual

```bash
# 1. Crear aplicación en Dokku
dokku apps:create init-backend

# 2. Crear base de datos PostgreSQL
dokku postgres:create init-backend-db
dokku postgres:link init-backend-db init-backend

# 3. Configurar variables de entorno
dokku config:set init-backend DEBUG=False
dokku config:set init-backend ALLOWED_HOSTS=".dokku.me,.herokuapp.com,init.com.mx,www.init.com.mx"
dokku config:set init-backend CORS_ALLOWED_ORIGINS="https://init.com.mx,https://www.init.com.mx"

# 4. Configurar dominio personalizado (opcional)
dokku domains:add init-backend api.init.com.mx

# 5. Desplegar aplicación
git push dokku main:master

# 6. Ejecutar migraciones
dokku run init-backend python manage.py migrate
```

### Comandos Útiles

```bash
# Ver logs
dokku logs init-backend

# Reiniciar aplicación
dokku ps:restart init-backend

# Ver configuración
dokku config init-backend

# Conectar a base de datos
dokku postgres:connect init-backend-db

# Ejecutar comandos Django
dokku run init-backend python manage.py createsuperuser
dokku run init-backend python manage.py collectstatic
```

## 📁 Estructura del Proyecto

```
Init/
├── backend/                 # Backend Django
│   ├── init_backend/       # Configuración principal
│   ├── accounts/           # App de autenticación
│   ├── team/              # App de gestión de equipo
│   └── requirements.txt   # Dependencias Python
├── frontend/              # Frontend React
│   ├── src/              # Código fuente
│   ├── public/           # Archivos públicos
│   └── package.json      # Dependencias Node.js
├── Procfile              # Configuración para Dokku
├── app.json             # Metadatos de la aplicación
├── runtime.txt          # Versión de Python
├── requirements.txt     # Dependencias principales
└── deploy-dokku.sh     # Script de despliegue
```

## 🔧 Configuración

### Variables de Entorno

- `SECRET_KEY`: Clave secreta de Django (generada automáticamente)
- `DEBUG`: Modo debug (False en producción)
- `ALLOWED_HOSTS`: Hosts permitidos
- `CORS_ALLOWED_ORIGINS`: Orígenes permitidos para CORS
- `DATABASE_URL`: URL de la base de datos (configurada automáticamente por Dokku)

### Base de Datos

La aplicación usa PostgreSQL configurado automáticamente por Dokku.

### Archivos Estáticos

Los archivos estáticos se sirven usando WhiteNoise en producción.

## 🌐 URLs de la API

- `GET /api/team/public` - Obtener miembros del equipo (público)
- `GET /api/team/owners` - Obtener solo dueños
- `GET /api/team/interns` - Obtener solo becarios
- `POST /api/auth/login/` - Iniciar sesión
- `POST /api/auth/register/` - Registrarse
- `GET /api/auth/profile/` - Obtener perfil de usuario
- `POST /api/auth/logout/` - Cerrar sesión

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
