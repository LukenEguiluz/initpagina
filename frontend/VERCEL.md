# Despliegue en Vercel – INIT

Este proyecto está preparado para desplegarse en [Vercel](https://vercel.com) como sitio estático (SPA).

## Requisitos

- Cuenta en [vercel.com](https://vercel.com)
- Repositorio en GitHub, GitLab o Bitbucket (o despliegue por CLI)

## Opción 1: Despliegue desde la web (recomendado)

### 1. Conectar el repositorio

1. Entra en [vercel.com/new](https://vercel.com/new).
2. Importa tu repositorio (GitHub/GitLab/Bitbucket).
3. Si el repo tiene **varios proyectos** (por ejemplo backend y frontend), configura:
   - **Root Directory:** `frontend`  
     Así Vercel solo usará la carpeta del frontend.

### 2. Configuración del proyecto

Vercel suele detectar Vite y rellenar esto automáticamente. Comprueba que coincida:

| Campo              | Valor           |
|--------------------|-----------------|
| **Framework Preset** | Vite            |
| **Build Command**    | `npm run build` |
| **Output Directory** | `dist`           |
| **Install Command**  | `npm install`   |

No hace falta definir variables de entorno para que el sitio funcione (todo es estático).

### 3. Desplegar

- Pulsa **Deploy**.
- Cuando termine, tendrás una URL tipo `tu-proyecto.vercel.app`.
- Cada push a la rama conectada (p. ej. `main`) generará un nuevo despliegue.

## Opción 2: Despliegue con Vercel CLI

```bash
# Instalar CLI (una vez)
npm i -g vercel

# Desde la raíz del repo
cd frontend
vercel

# Seguir las preguntas; indicar que el directorio actual es el del proyecto.
# Para producción:
vercel --prod
```

Si ejecutas `vercel` desde la raíz del repo (y no desde `frontend`), en el asistente indica que el **root** del proyecto es `frontend`, o ejecuta `vercel` desde dentro de `frontend`.

## Rutas (SPA)

El `vercel.json` incluye **rewrites** para que todas las rutas sirvan `index.html`:

- `/` → Inicio  
- `/team` → Equipo  
- `/services` → Servicios  
- `/contact` → Contacto  
- `/login`, `/register` → Login / Registro  

Así el enrutado de React funciona al recargar o al entrar directo a una URL.

## Archivos de configuración

- **`vercel.json`** – Comando de build, directorio de salida, rewrites y cabeceras de caché.
- **`.vercelignore`** – Archivos/carpetas que no se envían al build (scripts locales, Docker, etc.).

## Dominio propio

En el dashboard del proyecto: **Settings → Domains** y añade tu dominio. Vercel te indicará los registros DNS si hace falta.

## Soporte

- [Documentación de Vercel](https://vercel.com/docs)
- [Vite en Vercel](https://vercel.com/docs/frameworks/vite)
