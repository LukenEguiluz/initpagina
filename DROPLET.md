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

## 8. (Opcional) Dominio y HTTPS

1. En DigitalOcean: **Networking** → **Domains** → añade tu dominio y apunta los DNS (A record a la IP del Droplet).
2. En el Droplet, instala Certbot y obtén un certificado:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d tudominio.com
```

Si usas solo el contenedor (sin nginx en el host), tendrías que exponer el puerto 443 y usar un proxy o un nginx en el host que apunte al contenedor. Para empezar basta con HTTP en el puerto 80.

## Resumen rápido

```bash
# En el Droplet (tras instalar Docker)
cd /opt && git clone https://github.com/LukenEguiluz/initpagina.git init && cd init
docker compose up -d --build
# Abrir http://IP_DROPLET
```
