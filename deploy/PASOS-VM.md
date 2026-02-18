# Qué hacer en la VM (Droplet)

Todo se ejecuta **dentro del Droplet** por SSH. Sustituye `IP_DEL_DROPLET` por la IP que te dio DigitalOcean.

---

## 1. Entrar por SSH

```bash
ssh root@IP_DEL_DROPLET
```

---

## 2. Instalar Docker

```bash
apt update && apt install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update && apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

---

## 3. Clonar el proyecto y levantar la app

```bash
cd /opt
git clone https://github.com/LukenEguiluz/initpagina.git init
cd init
docker compose up -d --build
```

La app queda en el puerto **8081**. Puedes probar: `http://IP_DEL_DROPLET:8081`

---

## 4. Configurar DNS (fuera de la VM)

En tu registrador del dominio **init.com.mx** (GoDaddy, Namecheap, DigitalOcean, etc.):

- **A** → nombre `@` (o vacío) → IP del Droplet  
- **A** → nombre `www` → IP del Droplet  

Espera unos minutos a que propague.

---

## 5. Activar HTTPS y que se renueve solo

Sigue en el Droplet, con el dominio ya apuntando a esta IP:

```bash
cd /opt/init
chmod +x deploy/setup-https.sh
./deploy/setup-https.sh
```

Si pide email, pon uno tuyo (ej. `admin@init.com.mx`).

Al terminar:

- **https://init.com.mx** → tu sitio  
- **https://www.init.com.mx** → redirige a init.com.mx  
- El certificado se renueva solo (Let's Encrypt).

---

## Resumen en 4 bloques

| Paso | Qué haces |
|------|-----------|
| 1 | `ssh root@IP` |
| 2 | Pegar el bloque de instalación de Docker |
| 3 | `cd /opt` → clonar repo → `docker compose up -d --build` |
| 4 | En el registrador: A @ y A www → IP del Droplet |
| 5 | `cd /opt/init` → `./deploy/setup-https.sh` |

Nada más. La VM queda con la app en Docker y nginx con HTTPS y renovación automática.

---

## 6. Actualizar la app cuando subas cambios

**Opción A – Automático (recomendado):** Configura el deploy con GitHub Actions para que, al hacer push a `main`, la VM haga solo `git pull` y `docker compose up -d --build`. Instrucciones en **[deploy/DEPLOY-AUTOMATICO.md](DEPLOY-AUTOMATICO.md)**.

**Opción B – Manual:** Entra por SSH y ejecuta:

```bash
cd /opt/init
git pull
docker compose up -d --build
```
