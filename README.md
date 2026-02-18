# INIT – Frontend

Sitio web de INIT: desarrollo de software, consultoría en digitalización y soluciones digitales. **Solo frontend** (React + Vite), desplegable en Vercel.

## Equipo

- **4 socios**, **1 trabajador senior** y **1 becario** (datos en `frontend/src/data/teamData.js`).

## Tecnologías

- React 18, Vite, Tailwind CSS, Material-UI Icons, Framer Motion, React Router, Axios

## Estructura

```
Init/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── services/
│   │   ├── config/
│   │   └── data/          # Datos estáticos (equipo)
│   ├── package.json
│   ├── vercel.json
│   └── README.md
└── README.md
```

## Desarrollo local

```bash
cd frontend
npm install
npm run dev
```

Abre http://localhost:3000 (o el puerto que indique Vite).

## Desplegar en Vercel

1. Conecta el repo en [vercel.com](https://vercel.com).
2. **Root Directory:** `frontend`
3. **Framework:** Vite → Build: `npm run build`, Output: `dist`
4. Deploy.

## Páginas

- **Inicio** – Presentación y servicios  
- **Equipo** – 4 socios, 1 senior, 1 becario  
- **Servicios** – Detalle de oferta  
- **Contacto** – Formulario (simulado, sin backend)

---

**INIT** – Desarrollado por el equipo de INIT
