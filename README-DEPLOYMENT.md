# 🚀 Despliegue INIT con Dokku + GitHub Actions

Guía completa para desplegar el monorepo INIT (Django + React) usando Dokku y GitHub Actions.

## 📋 Estructura del Proyecto

```
Init/
├── backend/                 # Backend Django
│   ├── init_backend/       # Configuración Django
│   ├── accounts/           # App de autenticación
│   ├── team/              # App de gestión de equipo
│   ├── Procfile           # Configuración Dokku
│   └── requirements.txt   # Dependencias Python
├── frontend/              # Frontend React
│   ├── src/              # Código fuente
│   ├── public/           # Archivos públicos
│   ├── Dockerfile        # Configuración Docker
│   └── package.json      # Dependencias Node.js
├── .github/workflows/    # GitHub Actions
│   ├── deploy-backend.yml
│   └── deploy-frontend.yml
└── setup-dokku-server.sh # Script de configuración
```

## 🎯 Aplicaciones Dokku

- **`api`** - Backend Django (api.init.com.mx)
- **`web`** - Frontend React (init.com.mx)

## 🚀 Despliegue Paso a Paso

### 1️⃣ Configurar el Servidor (Una sola vez)

```bash
# En tu servidor con Dokku instalado
chmod +x setup-dokku-server.sh
./setup-dokku-server.sh
```

Este script automáticamente:

- ✅ Instala plugin PostgreSQL
- ✅ Crea aplicaciones `api` y `web`
- ✅ Configura base de datos PostgreSQL
- ✅ Configura variables de entorno
- ✅ Crea llave SSH para GitHub Actions
- ✅ Configura dominios

### 2️⃣ Configurar GitHub Secrets

Ve a tu repositorio → Settings → Secrets → Actions y crea:

- **`DOKKU_HOST`** = IP de tu servidor (ej: `203.0.113.10`)
- **`SSH_PRIVATE_KEY`** = Contenido de la llave privada (mostrada por el script)

### 3️⃣ Configurar DNS

En tu proveedor de DNS, apunta:

- `init.com.mx` → IP del servidor
- `api.init.com.mx` → IP del servidor

### 4️⃣ Desplegar

```bash
# Hacer commit y push
git add .
git commit -m "feat: Configurar despliegue con Dokku + GitHub Actions"
git push origin main
```

Los workflows de GitHub Actions se ejecutarán automáticamente:

- **Deploy Backend** - Cuando cambies archivos en `backend/`
- **Deploy Frontend** - Cuando cambies archivos en `frontend/`

### 5️⃣ Configurar SSL (Después del primer deploy)

```bash
# En el servidor
dokku letsencrypt api
dokku letsencrypt web
dokku letsencrypt:cron-job --add
```

## 🔧 Comandos Útiles

### Verificar Estado

```bash
# Estado de aplicaciones
dokku ps:report api
dokku ps:report web

# Logs en tiempo real
dokku logs api -t
dokku logs web -t

# Configuración
dokku config api
dokku config web
```

### Gestión de Aplicaciones

```bash
# Reiniciar
dokku ps:restart api
dokku ps:restart web

# Ver logs
dokku logs api
dokku logs web

# Ejecutar comandos Django
dokku run api python manage.py createsuperuser
dokku run api python manage.py migrate
```

### Base de Datos

```bash
# Conectar a PostgreSQL
dokku postgres:connect api-db

# Backup
dokku postgres:export api-db > backup.sql

# Restaurar
dokku postgres:import api-db < backup.sql
```

## 🌐 URLs de la API

- `GET https://api.init.com.mx/api/team/public` - Miembros del equipo
- `GET https://api.init.com.mx/api/team/owners` - Solo dueños
- `GET https://api.init.com.mx/api/team/interns` - Solo becarios
- `POST https://api.init.com.mx/api/auth/login/` - Iniciar sesión
- `POST https://api.init.com.mx/api/auth/register/` - Registrarse
- `GET https://api.init.com.mx/api/auth/profile/` - Perfil de usuario
- `POST https://api.init.com.mx/api/auth/logout/` - Cerrar sesión

## 🛠️ Solución de Problemas

### Error: "postgres:create no es un comando"

```bash
# Instalar plugin PostgreSQL
dokku plugin:install https://github.com/dokku/dokku-postgres.git
```

### Error: "Permission denied (publickey)" en Actions

- Verifica que la llave pública esté en `dokku ssh-keys:list`
- Verifica que el secret `SSH_PRIVATE_KEY` esté correcto

### Error: "No web listeners specified"

- Se resuelve después del primer deploy exitoso
- Verifica que el Procfile y Dockerfile estén correctos

### Error: Django 400/Bad Request

```bash
# Agregar dominio a ALLOWED_HOSTS
dokku config:set api ALLOWED_HOSTS="api.init.com.mx,.dokku.me,.herokuapp.com"
```

### Error: CORS bloquea peticiones

```bash
# Agregar origen a CORS
dokku config:set api CORS_ALLOWED_ORIGINS="https://init.com.mx,https://www.init.com.mx"
```

### Falta RAM en build de React

```bash
# Crear swap de 2GB
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## 📝 Variables de Entorno

### Backend (api)

- `DJANGO_SETTINGS_MODULE=init_backend.settings`
- `SECRET_KEY` (generada automáticamente)
- `DEBUG=False`
- `ALLOWED_HOSTS=api.init.com.mx,.dokku.me,.herokuapp.com`
- `CORS_ALLOWED_ORIGINS=https://init.com.mx,https://www.init.com.mx`
- `DATABASE_URL` (configurada automáticamente por Dokku)

### Frontend (web)

- `NODE_ENV=production`
- `VITE_API_BASE_URL=https://api.init.com.mx`
- `VITE_APP_NAME=INIT`
- `VITE_APP_VERSION=1.0.0`
- `VITE_DEV_MODE=false`

## 🎉 ¡Listo!

Después de seguir estos pasos tendrás:

- ✅ Backend Django desplegado en `https://api.init.com.mx`
- ✅ Frontend React desplegado en `https://init.com.mx`
- ✅ Base de datos PostgreSQL configurada
- ✅ SSL automático con Let's Encrypt
- ✅ Despliegue automático con GitHub Actions
- ✅ Monitoreo y logs centralizados
