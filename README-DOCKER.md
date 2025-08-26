# 🐳 Docker & DigitalOcean Deployment Guide

Guía completa para desplegar la aplicación INIT en DigitalOcean usando Docker Compose.

## 📋 Prerrequisitos

### En tu Droplet de DigitalOcean:

1. **Docker instalado**
2. **Docker Compose instalado**
3. **Dominio configurado** (opcional, para SSL)
4. **Puertos abiertos**: 80, 443, 22

## 🚀 Despliegue Rápido

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/INIT.git
cd INIT
```

### 2. Configurar variables de entorno

```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar variables
nano .env
```

**Variables importantes a configurar:**
```env
SECRET_KEY=tu-clave-secreta-super-segura
DB_PASSWORD=tu-contraseña-fuerte
ALLOWED_HOSTS=tu-dominio.com,www.tu-dominio.com
CORS_ALLOWED_ORIGINS=https://tu-dominio.com
```

### 3. Ejecutar despliegue

```bash
# Hacer ejecutable el script
chmod +x deploy.sh

# Desplegar en producción
./deploy.sh production
```

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx (80/443)│    │  Frontend React │    │  Backend Django │
│   (Reverse Proxy)│   │   (Static Files)│    │   (API REST)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  PostgreSQL DB  │
                    │   (Data Store)  │
                    └─────────────────┘
```

## 📁 Estructura de Archivos Docker

```
INIT/
├── Dockerfile.backend          # Backend Django
├── Dockerfile.frontend         # Frontend React + Nginx
├── docker-compose.yml          # Desarrollo completo
├── docker-compose.prod.yml     # Producción simplificado
├── nginx.conf                  # Configuración Nginx dev
├── nginx.prod.conf             # Configuración Nginx prod
├── deploy.sh                   # Script de despliegue
├── .dockerignore               # Archivos ignorados
├── env.example                 # Variables de entorno
└── ssl/                        # Certificados SSL
    ├── cert.pem
    └── key.pem
```

## 🔧 Configuración Detallada

### Variables de Entorno (.env)

```env
# Django
SECRET_KEY=tu-clave-secreta
DEBUG=False
ALLOWED_HOSTS=tu-dominio.com,www.tu-dominio.com

# Base de Datos
DB_NAME=init_db
DB_USER=init_user
DB_PASSWORD=tu-contraseña-fuerte
DB_HOST=db
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=https://tu-dominio.com

# JWT
JWT_SECRET_KEY=tu-jwt-secret
JWT_ACCESS_TOKEN_LIFETIME=60
JWT_REFRESH_TOKEN_LIFETIME=1440
```

### Configuración de Dominio

1. **Configurar DNS** en DigitalOcean
2. **Apuntar dominio** a tu droplet IP
3. **Actualizar ALLOWED_HOSTS** en .env
4. **Configurar SSL** (opcional)

## 🔒 Configuración SSL

### Opción 1: Certificados Autofirmados (Desarrollo)

```bash
# Generar certificados SSL
mkdir -p ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ssl/key.pem \
    -out ssl/cert.pem \
    -subj "/C=ES/ST=Madrid/L=Madrid/O=INIT/CN=tu-dominio.com"
```

### Opción 2: Let's Encrypt (Producción)

```bash
# Instalar Certbot
sudo apt update
sudo apt install certbot

# Obtener certificado
sudo certbot certonly --standalone -d tu-dominio.com -d www.tu-dominio.com

# Copiar certificados
sudo cp /etc/letsencrypt/live/tu-dominio.com/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/tu-dominio.com/privkey.pem ssl/key.pem
sudo chown $USER:$USER ssl/*
```

## 🚀 Comandos de Gestión

### Despliegue

```bash
# Despliegue inicial
./deploy.sh production

# Actualizar aplicación
git pull && ./deploy.sh production

# Despliegue en staging
./deploy.sh staging
```

### Gestión de Contenedores

```bash
# Ver estado
docker-compose -f docker-compose.prod.yml ps

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f

# Reiniciar servicios
docker-compose -f docker-compose.prod.yml restart

# Parar servicios
docker-compose -f docker-compose.prod.yml down

# Parar y eliminar volúmenes
docker-compose -f docker-compose.prod.yml down -v
```

### Base de Datos

```bash
# Backup
docker-compose -f docker-compose.prod.yml exec db \
    pg_dump -U $DB_USER $DB_NAME > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurar
docker-compose -f docker-compose.prod.yml exec -T db \
    psql -U $DB_USER $DB_NAME < backup.sql

# Conectar a base de datos
docker-compose -f docker-compose.prod.yml exec db psql -U $DB_USER $DB_NAME
```

### Logs y Monitoreo

```bash
# Logs en tiempo real
docker-compose -f docker-compose.prod.yml logs -f

# Logs de un servicio específico
docker-compose -f docker-compose.prod.yml logs -f backend

# Ver uso de recursos
docker stats

# Limpiar recursos no utilizados
docker system prune -f
```

## 🔧 Configuración de DigitalOcean

### 1. Crear Droplet

- **Ubuntu 22.04 LTS**
- **2GB RAM mínimo** (recomendado 4GB)
- **50GB SSD**
- **Ubicación cercana** a tus usuarios

### 2. Configurar Firewall

```bash
# Abrir puertos necesarios
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 3. Instalar Docker

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 4. Configurar Swap (Opcional)

```bash
# Crear archivo de swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Hacer permanente
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## 📊 Monitoreo y Mantenimiento

### Health Checks

```bash
# Verificar estado de la aplicación
curl -f http://tu-dominio.com/health

# Verificar API
curl -f http://tu-dominio.com/api/team/public/
```

### Backups Automáticos

Crear script de backup automático:

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

# Crear backup de base de datos
docker-compose -f docker-compose.prod.yml exec -T db \
    pg_dump -U $DB_USER $DB_NAME > $BACKUP_DIR/db_$DATE.sql

# Backup de archivos de media
tar -czf $BACKUP_DIR/media_$DATE.tar.gz backend/media/

# Eliminar backups antiguos (más de 30 días)
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
```

### Logs y Monitoreo

```bash
# Configurar logrotate
sudo nano /etc/logrotate.d/init-app

# Contenido:
/var/log/init/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 root root
}
```

## 🚨 Troubleshooting

### Problemas Comunes

#### 1. Contenedores no inician

```bash
# Verificar logs
docker-compose -f docker-compose.prod.yml logs

# Verificar variables de entorno
docker-compose -f docker-compose.prod.yml config
```

#### 2. Base de datos no conecta

```bash
# Verificar estado de PostgreSQL
docker-compose -f docker-compose.prod.yml exec db pg_isready

# Verificar variables de entorno
docker-compose -f docker-compose.prod.yml exec backend env | grep DB
```

#### 3. SSL no funciona

```bash
# Verificar certificados
openssl x509 -in ssl/cert.pem -text -noout

# Verificar configuración Nginx
docker-compose -f docker-compose.prod.yml exec frontend nginx -t
```

#### 4. Memoria insuficiente

```bash
# Verificar uso de memoria
free -h
docker stats

# Aumentar swap
sudo fallocate -l 4G /swapfile2
sudo chmod 600 /swapfile2
sudo mkswap /swapfile2
sudo swapon /swapfile2
```

### Comandos de Diagnóstico

```bash
# Estado del sistema
docker system df
docker volume ls
docker network ls

# Información de contenedores
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml top

# Logs detallados
docker-compose -f docker-compose.prod.yml logs --tail=100
```

## 🔄 Actualizaciones

### Actualización de Código

```bash
# 1. Hacer backup
./backup.sh

# 2. Actualizar código
git pull origin main

# 3. Reconstruir y desplegar
./deploy.sh production
```

### Actualización de Dependencias

```bash
# 1. Actualizar requirements.txt
# 2. Reconstruir imágenes
docker-compose -f docker-compose.prod.yml build --no-cache

# 3. Redesplegar
./deploy.sh production
```

## 📈 Escalabilidad

### Opciones de Escalado

1. **Escalado Vertical**: Aumentar recursos del droplet
2. **Escalado Horizontal**: Múltiples instancias con load balancer
3. **Microservicios**: Separar servicios en contenedores independientes

### Configuración para Alto Tráfico

```yaml
# docker-compose.prod.yml
services:
  backend:
    deploy:
      replicas: 3
    environment:
      - GUNICORN_WORKERS=4
      - GUNICORN_TIMEOUT=120
```

## 🛡️ Seguridad

### Mejores Prácticas

1. **Cambiar puertos por defecto**
2. **Usar contraseñas fuertes**
3. **Configurar firewall**
4. **Mantener actualizado**
5. **Backups regulares**
6. **Logs de seguridad**

### Configuración de Seguridad

```bash
# Configurar fail2ban
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Configurar UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

**¡Tu aplicación INIT está lista para producción en DigitalOcean!** 🚀✨
