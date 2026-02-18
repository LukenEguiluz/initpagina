# Desplegar INIT en un Droplet de DigitalOcean (Docker)

Pasos para levantar la app en un Droplet con Docker.

## 1. Crear el Droplet

1. Entra en [DigitalOcean](https://cloud.digitalocean.com) → **Create** → **Droplets**.
2. Elige **Ubuntu 22.04** (o la última LTS).
3. Plan: **Basic** (1 GB RAM suele bastar para esta app).
4. Región: la más cercana a tus usuarios.
5. Añade tu SSH key (recomendado) o usa contraseña.
6. Nombre del Droplet, p. ej. `init-web`.
7. **Create Droplet**.

## 2. Conectarte por SSH

```bash
ssh root@TU_IP_DEL_DROPLET
```

(Sustituye `TU_IP_DEL_DROPLET` por la IP que te asigna DigitalOcean.)

## 3. Instalar Docker en el Droplet

```bash
apt update && apt install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update && apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

Comprueba:

```bash
docker --version
docker compose version
```

## 4. Subir el proyecto al Droplet

**Opción A – Clonar el repo (recomendado)**

```bash
cd /opt
git clone https://github.com/LukenEguiluz/initpagina.git init
cd init
```

**Opción B – Copiar con scp desde tu PC**

Desde tu máquina (PowerShell o CMD):

```bash
scp -r c:\Users\luken\Documents\init\Init\* root@TU_IP_DROPLET:/opt/init/
```

(En el Droplet crea antes `mkdir -p /opt/init`.)

## 5. Construir y levantar el contenedor

En el Droplet:

```bash
cd /opt/init
docker compose build --no-cache
docker compose up -d
```

La app queda en el puerto **80**. Abre en el navegador:

```
http://TU_IP_DEL_DROPLET
```

## 6. Comandos útiles

| Acción              | Comando                    |
|---------------------|----------------------------|
| Ver logs            | `docker compose logs -f`   |
| Parar               | `docker compose down`      |
| Reiniciar           | `docker compose restart`   |
| Reconstruir y subir | `docker compose up -d --build` |

## 7. Actualizar la app después de cambios en el repo

```bash
cd /opt/init
git pull
docker compose build --no-cache
docker compose up -d
```

## 8. Apuntar init.com.mx y redirigir www

El contenedor ya está configurado para:
- **init.com.mx** → muestra la web
- **www.init.com.mx** → redirección 301 a **init.com.mx**

### DNS (en tu registrador o DigitalOcean)

Donde tengas el dominio **init.com.mx** (GoDaddy, Namecheap, DigitalOcean Domains, etc.) configura:

| Tipo | Nombre / Host | Valor / Apunta a | TTL |
|------|----------------|-------------------|-----|
| **A**  | `@` (o vacío) | **IP de tu Droplet** | 300 o por defecto |
| **A**  | `www`         | **IP de tu Droplet** | 300 o por defecto |

Si usas DigitalOcean → **Networking** → **Domains** → **Add Domain** → `init.com.mx`. Añade los registros A para `@` y `www` apuntando a la IP del Droplet.

Tras guardar, espera unos minutos (hasta 48 h en casos raros). Luego:
- **https://init.com.mx** → tu sitio
- **https://www.init.com.mx** → redirige a **https://init.com.mx**

## 9. HTTPS con renovación automática

El contenedor pasa a escuchar en el puerto **8081** del host para que nginx use el 80 y el 443. Así puedes tener HTTPS con Let's Encrypt y que el certificado se renueve solo.

### Requisito

- **init.com.mx** y **www.init.com.mx** deben apuntar en DNS a la IP del Droplet (paso 8).

### Opción A – Script automático (recomendado)

En el Droplet, con el proyecto clonado en `/opt/init`:

```bash
cd /opt/init
git pull
chmod +x deploy/setup-https.sh
./deploy/setup-https.sh
```

Cuando pida email, usa uno válido (p. ej. `admin@init.com.mx`). El script:

1. Instala nginx y certbot
2. Obtiene el certificado para init.com.mx y www.init.com.mx
3. Configura nginx como proxy HTTPS hacia el contenedor (8081)
4. Activa el **timer de certbot** para que renueve el certificado solo (2 veces al día; Let's Encrypt renueva cuando faltan &lt; 30 días)

### Opción B – Paso a paso manual

1. **Contenedor en 8081** (ya está así en `docker-compose.yml`):

   ```bash
   cd /opt/init && docker compose up -d --build
   ```

2. **Instalar nginx y certbot en el host:**

   ```bash
   apt update && apt install -y nginx certbot python3-certbot-nginx
   mkdir -p /var/www/certbot
   ```

3. **Configuración inicial (solo puerto 80) para obtener el certificado:**

   ```bash
   cp /opt/init/deploy/nginx-bootstrap.conf /etc/nginx/sites-available/init.com.mx
   ln -sf /etc/nginx/sites-available/init.com.mx /etc/nginx/sites-enabled/
   rm -f /etc/nginx/sites-enabled/default
   nginx -t && systemctl reload nginx
   ```

4. **Obtener certificado Let's Encrypt:**

   ```bash
   certbot certonly --webroot -w /var/www/certbot -d init.com.mx -d www.init.com.mx --agree-tos -m admin@init.com.mx
   ```

5. **Activar HTTPS y proxy:**

   ```bash
   cp /opt/init/deploy/nginx-ssl.conf /etc/nginx/sites-available/init.com.mx
   nginx -t && systemctl reload nginx
   ```

6. **Renovación automática** (certbot suele configurar un timer al instalarlo):

   ```bash
   systemctl enable certbot.timer
   systemctl start certbot.timer
   ```

   Para comprobar que la renovación funciona:

   ```bash
   certbot renew --dry-run
   ```

### Comprobar

- **https://init.com.mx** → sitio en HTTPS  
- **https://www.init.com.mx** → redirige a **https://init.com.mx**  
- El certificado se renueva solo; no hace falta hacer nada más.

## Resumen rápido

```bash
# En el Droplet (tras instalar Docker)
cd /opt && git clone https://github.com/LukenEguiluz/initpagina.git init && cd init
docker compose up -d --build
# Abrir http://IP_DROPLET
```
