# Deploy automático al hacer push (GitHub Actions → VM)

Cuando haces **push a `main`**, GitHub Actions entra por SSH en la VM y ejecuta:

```bash
cd /opt/init
git pull
docker compose up -d --build
```

No tienes que hacer nada manual en la VM.

---

## 1. Crear una clave SSH solo para deploy (recomendado)

En tu **PC** (o donde tengas Git):

```bash
ssh-keygen -t ed25519 -C "github-deploy-init" -f deploy_key -N ""
```

Se crean `deploy_key` (privada) y `deploy_key.pub` (pública).

**En la VM** (por SSH), añade la clave pública para que GitHub pueda entrar:

```bash
# Entras: ssh root@IP_DEL_DROPLET
mkdir -p ~/.ssh
echo "PEGA_AQUI_EL_CONTENIDO_DE_deploy_key.pub" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

(Pega el contenido de `deploy_key.pub` en una sola línea.)

**En tu PC**, el contenido de la clave **privada** lo usarás en el paso 2:

```bash
# En Windows (PowerShell) o en Mac/Linux:
cat deploy_key
```

Cópialo entero (incluyendo `-----BEGIN ... KEY-----` y `-----END ... KEY-----`).

Opcional: borra `deploy_key` y `deploy_key.pub` de tu PC después de guardarlos en GitHub Secrets si no quieres conservarlos.

---

## 2. Añadir secretos en GitHub

1. Repo en GitHub → **Settings** → **Secrets and variables** → **Actions**.
2. **New repository secret** y crea estos tres:

| Nombre            | Valor                    | Ejemplo        |
|-------------------|--------------------------|----------------|
| `DEPLOY_HOST`     | IP o dominio de la VM    | `165.232.xx.xx` o `init.com.mx` |
| `DEPLOY_USER`     | Usuario SSH en la VM     | `root`         |
| `SSH_PRIVATE_KEY` | Contenido de la clave **privada** | Todo el texto de `deploy_key` |

---

## 3. Comprobar que el repo en la VM es el correcto

En la VM, el clone debe ser del **mismo repo** al que haces push (para que `git pull` traiga los cambios):

```bash
ssh root@IP_DEL_DROPLET
cd /opt/init
git remote -v
```

Debería salir `origin` apuntando a tu repo (ej. `https://github.com/LukenEguiluz/initpagina.git` o el que uses). Si clonaste por HTTPS, `git pull` puede pedir credenciales; para que funcione sin intervención es mejor que el clone use **SSH** o que configures un token. Opción sencilla:

**En la VM**, si el remote es HTTPS y quieres que `git pull` funcione sin contraseña en el deploy automático:

```bash
cd /opt/init
git remote set-url origin git@github.com:LukenEguiluz/initpagina.git
```

Para que eso funcione, la VM debe tener acceso a GitHub por SSH (la misma `deploy_key` que añadiste a la VM es para que **GitHub Actions entre en la VM**; la VM no usa esa clave para hablar con GitHub). Por tanto, en la VM hay dos opciones:

- **A)** Dejar el remote en HTTPS y usar un **Personal Access Token (PAT)** de GitHub: en la VM no hace falta configurar nada si el repo es público (git pull sin auth). Si el repo es privado, en la VM puedes configurar un credential helper con el PAT.
- **B)** Poner el remote en SSH y añadir en la VM una clave SSH que tenga acceso al repo (por ejemplo otra clave, o la misma deploy que también añades como Deploy Key del repo en GitHub).

La opción más simple si el repo es **público**: dejar `origin` en HTTPS. Entonces `git pull` en la VM no pide nada y el deploy automático funcionará solo con los tres secretos anteriores.

Si el repo es **privado**, en la VM:

1. GitHub → Repo → **Settings** → **Deploy keys** → Add deploy key. Pega la **misma** `deploy_key.pub` y así la VM puede hacer `git pull` usando esa clave.
2. En la VM: `git remote set-url origin git@github.com:TU_USER/TU_REPO.git`.

(Así la clave que usa GitHub Actions para entrar en la VM es la misma que la VM usa para hacer pull.)

---

## 4. Probar

Haz un cambio, commit y push a `main`:

```bash
git add .
git commit -m "test deploy automático"
git push origin main
```

En GitHub: pestaña **Actions** → workflow **Deploy to VM (Droplet)**. Debe terminar en verde y en la VM la app habrá hecho `git pull` y `docker compose up -d --build`.

También puedes lanzar el deploy a mano: **Actions** → **Deploy to VM (Droplet)** → **Run workflow**.

---

## Resumen

| Dónde    | Qué hacer |
|----------|-----------|
| PC       | Generar `deploy_key` y `deploy_key.pub` |
| VM       | Añadir `deploy_key.pub` a `~/.ssh/authorized_keys` (y si repo privado: deploy key en GitHub + remote por SSH) |
| GitHub   | Crear secretos `DEPLOY_HOST`, `DEPLOY_USER`, `SSH_PRIVATE_KEY` |
| Push main| El workflow hace SSH a la VM y ejecuta `git pull` + `docker compose up -d --build` |
