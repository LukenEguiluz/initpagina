# INIT - Empresa de Desarrollo de Software

Sitio web profesional para la empresa INIT, especializada en desarrollo de software, consultoría en digitalización y soluciones digitales.

## 🚀 Tecnologías Utilizadas

### Frontend

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **JavaScript ES6+** - Lenguaje de programación moderno
- **Vite** - Build tool rápido y moderno
- **Tailwind CSS** - Framework CSS utility-first
- **Material-UI Icons** - Iconografía profesional
- **Framer Motion** - Biblioteca de animaciones
- **React Router DOM** - Enrutamiento de la aplicación
- **Axios** - Cliente HTTP para llamadas a la API

### Backend

- **Django 5.2.5** - Framework web de Python
- **Django REST Framework 3.16.1** - API REST
- **Django CORS Headers 4.7.0** - Manejo de CORS
- **djangorestframework-simplejwt 5.5.1** - Autenticación JWT
- **python-decouple 3.8** - Gestión de variables de entorno
- **Pillow 11.3.0** - Procesamiento de imágenes
- **PostgreSQL** - Base de datos robusta y escalable
- **psycopg2-binary** - Driver de PostgreSQL para Python

## 📁 Estructura del Proyecto

```
INIT/
├── backend/                 # Backend Django
│   ├── init_backend/       # Configuración principal de Django
│   ├── accounts/           # App de autenticación
│   ├── team/              # App del equipo
│   ├── requirements.txt   # Dependencias de Python
│   ├── .env              # Variables de entorno
│   ├── create_env.sh     # Script para crear .env
│   ├── setup_postgresql.sh # Script para configurar PostgreSQL
│   ├── create_team_members.py # Script para crear equipo
│   └── media/            # Archivos de medios (fotos del equipo)
├── frontend/              # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/        # Páginas de la aplicación
│   │   ├── contexts/     # Contextos de React
│   │   ├── services/     # Servicios de API
│   │   ├── config/       # Configuración de la aplicación
│   │   └── index.css     # Estilos globales
│   ├── package.json      # Dependencias de Node.js
│   ├── vite.config.js    # Configuración de Vite
│   ├── create_env.sh     # Script para crear .env
│   └── .env             # Variables de entorno
├── start.sh              # Script para iniciar ambos servidores
├── .gitignore           # Archivos ignorados por Git
└── README.md            # Documentación
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+ y npm
- Python 3.8+
- PostgreSQL 12+
- Git

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd INIT
```

### 2. Instalar PostgreSQL

#### macOS (usando Homebrew)

```bash
# Instalar PostgreSQL
brew install postgresql@15

# Agregar al PATH
echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Iniciar servicio
brew services start postgresql@15
```

#### Ubuntu/Debian

```bash
# Actualizar repositorios
sudo apt update

# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Iniciar servicio
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Windows

1. Descargar PostgreSQL desde [postgresql.org](https://www.postgresql.org/download/windows/)
2. Instalar con el instalador oficial
3. El servicio se inicia automáticamente

### 3. Configurar PostgreSQL

```bash
# Ir al directorio backend
cd backend

# Hacer ejecutable el script de configuración
chmod +x setup_postgresql.sh

# Ejecutar configuración automática
./setup_postgresql.sh
```

**Este script creará:**

- Base de datos: `init_db`
- Usuario: `init_user`
- Contraseña: `init_password`
- Host: `localhost`
- Puerto: `5432`

### 4. Configurar el Backend

```bash
cd backend

# Crear entorno virtual
python3 -m venv venv

# Activar entorno virtual
# macOS/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Crear archivo .env
chmod +x create_env.sh
./create_env.sh

# Migrar base de datos
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Crear miembros del equipo
python create_team_members.py
```

### 5. Configurar el Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Crear archivo .env
chmod +x create_env.sh
./create_env.sh
```

### 6. Agregar fotos del equipo

1. **Crear directorio de medios:**

   ```bash
   cd backend
   mkdir -p media/team
   ```

2. **Agregar fotos del equipo** en `backend/media/team/`:

   - `enrique.jpg`
   - `inaki.jpg`
   - `luken.jpg`
   - `carolina.jpg`
   - `xoan.jpg`

3. **Asignar fotos a los miembros** (ya hecho automáticamente con el script)

## 🚀 Ejecutar el Proyecto

### Opción 1: Script automático (Recomendado)

```bash
# Desde el directorio raíz
chmod +x start.sh
./start.sh
```

### Opción 2: Manual

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### URLs de acceso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Admin Django**: http://localhost:8000/admin

## 🔐 Autenticación

- Registro de usuarios
- Inicio de sesión con JWT
- Protección de rutas
- Gestión de perfiles

## 🏠 Páginas Principales

- **Inicio**: Presentación de la empresa y servicios
- **Equipo**: Perfiles de los 5 miembros del equipo
- **Servicios**: Detalles de servicios ofrecidos
- **Contacto**: Formulario de contacto e información

## 🎨 Diseño y UX

- Diseño responsive y moderno
- Animaciones fluidas con Framer Motion
- Paleta de colores profesional (slate, blue, purple)
- Tipografía elegante (Playfair Display, Inter)
- Efectos hover y transiciones suaves

## 👥 Equipo

- **Enrique Jiménez Guevara** - CEO & Fundador
- **Iñaki Guerrero Negrete** - CTO & Fundador
- **Luken Eguiluz del Angel** - COO & Fundador
- **Carolina Martínez Valades** - CEPA
- **Xoan Pablo** - Becario

## 🛠️ Servicios

- Desarrollo de Software
- Consultoría en Digitalización
- Soluciones Digitales
- Transformación Digital

## 🗄️ Base de Datos

### PostgreSQL Configuration

```env
DB_NAME=init_db
DB_USER=init_user
DB_PASSWORD=init_password
DB_HOST=localhost
DB_PORT=5432
```

### Ventajas de PostgreSQL

- ✅ **Robustez**: Base de datos empresarial
- ✅ **Rendimiento**: Optimizado para aplicaciones web
- ✅ **Escalabilidad**: Soporte para grandes volúmenes de datos
- ✅ **Integridad**: Transacciones ACID
- ✅ **Funciones avanzadas**: JSON, arrays, tipos personalizados

## 🛠️ Comandos Útiles

### Backend

```bash
python manage.py makemigrations  # Crear migraciones
python manage.py migrate         # Aplicar migraciones
python manage.py createsuperuser # Crear superusuario
python manage.py collectstatic   # Recolectar archivos estáticos
python manage.py shell           # Shell de Django
```

### Frontend

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Vista previa de producción
npm run lint     # Linting del código
```

### Base de Datos

```bash
# Conectar a PostgreSQL
psql -U init_user -d init_db -h localhost

# Verificar estado del servicio
brew services list | grep postgresql  # macOS
sudo systemctl status postgresql      # Linux
```

## 📱 Responsive Design

El sitio web está completamente optimizado para:

- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Pantallas grandes (1440px+)

## 🔧 Variables de Entorno

### Backend (.env)

```env
SECRET_KEY=tu-clave-secreta
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=init_db
DB_USER=init_user
DB_PASSWORD=init_password
DB_HOST=localhost
DB_PORT=5432
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=INIT
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=true
```

## 🚀 Despliegue

### Backend (Django)

- **Heroku**: Configurar PostgreSQL add-on
- **DigitalOcean**: Usar App Platform con PostgreSQL
- **AWS**: RDS para PostgreSQL + EC2/Elastic Beanstalk

### Frontend (React)

- **Vercel**: Despliegue automático desde GitHub
- **Netlify**: Drag & drop del build
- **AWS S3**: Alojamiento estático

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Email**: info@init.com
- **LinkedIn**: [INIT Company](https://linkedin.com/company/init)
- **Website**: [init.com](https://init.com)

---

**Desarrollado con ❤️ por el equipo de INIT**
