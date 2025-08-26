# Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto INIT! 🚀

## 📋 Tabla de Contenidos

- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Features](#solicitar-features)

## 🤝 Cómo Contribuir

### Tipos de Contribuciones

- 🐛 **Reportar bugs**
- 💡 **Solicitar nuevas features**
- 📝 **Mejorar documentación**
- 🔧 **Arreglar bugs**
- ✨ **Implementar nuevas features**
- 🎨 **Mejorar el diseño/UX**

## 🛠️ Configuración del Entorno

### Prerrequisitos

1. **Fork el repositorio**
2. **Clona tu fork localmente**
3. **Configura el entorno de desarrollo**

```bash
# Clonar tu fork
git clone https://github.com/tu-usuario/INIT.git
cd INIT

# Configurar upstream
git remote add upstream https://github.com/original-owner/INIT.git

# Seguir las instrucciones de instalación en README.md
```

### Configuración Rápida

```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
./setup_postgresql.sh
./create_env.sh
python manage.py migrate
python create_team_members.py

# Frontend
cd ../frontend
npm install
./create_env.sh
```

## 📝 Estándares de Código

### JavaScript/React

- **ESLint**: Usar configuración estándar
- **Prettier**: Formateo automático
- **Funciones**: Usar arrow functions
- **Hooks**: Usar hooks personalizados cuando sea necesario
- **Props**: Usar destructuring

```javascript
// ✅ Bueno
const MyComponent = ({ title, children }) => {
  const [state, setState] = useState(null);

  return (
    <div className="component">
      <h1>{title}</h1>
      {children}
    </div>
  );
};

// ❌ Evitar
function MyComponent(props) {
  return <div>{props.title}</div>;
}
```

### Python/Django

- **PEP 8**: Seguir estándares de Python
- **Black**: Formateo automático
- **Docstrings**: Documentar funciones y clases
- **Type hints**: Usar cuando sea posible

```python
# ✅ Bueno
from typing import List, Optional

def get_team_members(active_only: bool = True) -> List[TeamMember]:
    """
    Obtiene los miembros del equipo.

    Args:
        active_only: Si True, solo retorna miembros activos

    Returns:
        Lista de miembros del equipo
    """
    queryset = TeamMember.objects.all()
    if active_only:
        queryset = queryset.filter(is_active=True)
    return list(queryset)

# ❌ Evitar
def get_team_members(active_only=True):
    return TeamMember.objects.all()
```

### CSS/Tailwind

- **Tailwind CSS**: Usar clases de utilidad
- **Componentes**: Crear clases personalizadas cuando sea necesario
- **Responsive**: Diseño mobile-first
- **Accesibilidad**: Usar colores con contraste adecuado

```css
/* ✅ Bueno */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200;
}

/* ❌ Evitar */
.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 8px 16px;
}
```

## 🔄 Proceso de Pull Request

### 1. Preparar tu Branch

```bash
# Actualizar tu fork
git fetch upstream
git checkout main
git merge upstream/main

# Crear nueva rama
git checkout -b feature/nombre-de-la-feature
```

### 2. Hacer Cambios

- **Escribe código limpio y bien documentado**
- **Añade tests cuando sea apropiado**
- **Actualiza la documentación si es necesario**
- **Sigue los estándares de código**

### 3. Commit y Push

```bash
# Hacer commit con mensaje descriptivo
git add .
git commit -m "feat: añadir nueva funcionalidad de autenticación

- Implementar login con Google OAuth
- Añadir validación de formularios
- Mejorar UX del proceso de registro"

# Push a tu fork
git push origin feature/nombre-de-la-feature
```

### 4. Crear Pull Request

1. **Ve a tu fork en GitHub**
2. **Crea un nuevo Pull Request**
3. **Usa la plantilla de PR**
4. **Describe los cambios claramente**
5. **Menciona issues relacionados**

### Plantilla de Pull Request

```markdown
## 📝 Descripción

Breve descripción de los cambios realizados.

## 🎯 Tipo de Cambio

- [ ] Bug fix
- [ ] Nueva feature
- [ ] Mejora de documentación
- [ ] Refactoring
- [ ] Test

## 🧪 Testing

- [ ] Tests unitarios pasan
- [ ] Tests de integración pasan
- [ ] Manual testing completado

## 📸 Screenshots (si aplica)

Añadir screenshots de los cambios visuales.

## ✅ Checklist

- [ ] Código sigue los estándares del proyecto
- [ ] Documentación actualizada
- [ ] Tests añadidos/actualizados
- [ ] No hay warnings o errores
- [ ] Funciona en diferentes navegadores
- [ ] Responsive design verificado

## 🔗 Issues Relacionados

Closes #123
```

## 🐛 Reportar Bugs

### Antes de Reportar

1. **Buscar en issues existentes**
2. **Verificar que el bug no esté ya reportado**
3. **Probar en la última versión**

### Plantilla de Bug Report

```markdown
## 🐛 Descripción del Bug

Descripción clara y concisa del bug.

## 🔄 Pasos para Reproducir

1. Ir a '...'
2. Hacer clic en '...'
3. Scroll hasta '...'
4. Ver error

## ✅ Comportamiento Esperado

Descripción de lo que debería pasar.

## 📱 Información del Sistema

- **OS**: macOS 14.0
- **Browser**: Chrome 120.0
- **Versión**: 1.0.0

## 📸 Screenshots

Añadir screenshots si es posible.

## 📋 Información Adicional

Cualquier información adicional relevante.
```

## 💡 Solicitar Features

### Plantilla de Feature Request

```markdown
## 💡 Descripción de la Feature

Descripción clara de la nueva funcionalidad.

## 🎯 Problema que Resuelve

Explicar qué problema resuelve esta feature.

## 💭 Solución Propuesta

Descripción de la solución propuesta.

## 🔄 Alternativas Consideradas

Otras soluciones que se consideraron.

## 📋 Información Adicional

Cualquier información adicional relevante.
```

## 🏷️ Convenciones de Naming

### Branches

- `feature/nombre-de-feature`
- `bugfix/nombre-del-bug`
- `hotfix/descripcion-rapida`
- `docs/mejora-documentacion`

### Commits

- `feat: nueva funcionalidad`
- `fix: arreglar bug`
- `docs: actualizar documentación`
- `style: cambios de formato`
- `refactor: refactorizar código`
- `test: añadir tests`
- `chore: tareas de mantenimiento`

## 🎯 Áreas de Contribución

### Frontend (React)

- Componentes reutilizables
- Mejoras de UX/UI
- Optimización de performance
- Tests unitarios
- Accesibilidad

### Backend (Django)

- APIs REST
- Autenticación y autorización
- Optimización de base de datos
- Tests de integración
- Seguridad

### Documentación

- README.md
- Guías de instalación
- Documentación de API
- Ejemplos de uso

## 🏆 Reconocimiento

- **Contribuidores** serán mencionados en el README
- **Pull Requests** destacados serán destacados
- **Issues** útiles serán reconocidas

## 📞 Contacto

Si tienes preguntas sobre cómo contribuir:

- **Email**: dev@init.com
- **Discord**: [Servidor de la comunidad](https://discord.gg/init)
- **Issues**: [GitHub Issues](https://github.com/init/INIT/issues)

---

**¡Gracias por contribuir al proyecto INIT!** 🚀✨
