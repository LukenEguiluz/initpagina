# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Soporte para PostgreSQL como base de datos principal
- Scripts automáticos de configuración
- Guía de contribución completa
- Documentación de despliegue

### Changed

- Migración de SQLite a PostgreSQL
- Mejoras en el diseño responsive
- Optimización de imágenes del equipo

### Fixed

- Problemas de configuración de Tailwind CSS
- Errores de PostCSS en Vite
- Problemas de CORS entre frontend y backend

## [1.0.0] - 2024-08-26

### Added

- 🎉 **Lanzamiento inicial del proyecto INIT**
- **Frontend React con Vite**

  - Páginas principales: Inicio, Equipo, Servicios, Contacto
  - Sistema de autenticación JWT
  - Diseño responsive con Tailwind CSS
  - Animaciones con Framer Motion
  - Iconografía con Material-UI Icons
  - Enrutamiento con React Router DOM

- **Backend Django con REST Framework**

  - API REST completa
  - Autenticación JWT con djangorestframework-simplejwt
  - App de usuarios (accounts)
  - App del equipo (team)
  - Gestión de imágenes con Pillow
  - CORS configurado para frontend

- **Base de Datos PostgreSQL**

  - Configuración robusta para producción
  - Scripts automáticos de configuración
  - Migraciones completas
  - Datos de ejemplo del equipo

- **Características del Equipo**

  - 5 miembros del equipo configurados
  - Fotos profesionales (192px para dueños, 160px para becarios)
  - Información completa: nombres, posiciones, bios, expertise
  - Enlaces a LinkedIn y email

- **Diseño y UX**

  - Paleta de colores profesional (slate, blue, purple)
  - Tipografía elegante (Playfair Display, Inter)
  - Efectos hover y transiciones suaves
  - Diseño mobile-first
  - Gradientes y sombras elegantes

- **Autenticación y Seguridad**

  - Registro de usuarios
  - Login con JWT
  - Protección de rutas
  - Gestión de tokens
  - Validación de formularios

- **Herramientas de Desarrollo**
  - Scripts de configuración automática
  - Variables de entorno centralizadas
  - Archivos .gitignore completos
  - Documentación detallada
  - Guías de instalación paso a paso

### Technical Details

- **Frontend**: React 18, Vite, Tailwind CSS, Material-UI Icons
- **Backend**: Django 5.2.5, Django REST Framework 3.16.1
- **Database**: PostgreSQL 15 con psycopg2-binary
- **Authentication**: JWT con djangorestframework-simplejwt
- **Styling**: Tailwind CSS con configuración personalizada
- **Animations**: Framer Motion
- **Icons**: Material-UI Icons
- **HTTP Client**: Axios con interceptors
- **State Management**: React Context API

### Team Members

- **Enrique Jiménez Guevara** - CEO & Fundador
- **Iñaki Guerrero Negrete** - CTO & Fundador
- **Luken Eguiluz del Angel** - COO & Fundador
- **Carolina Martínez Valades** - CEPA
- **Xoan Pablo** - Becario

---

## Convenciones de Versionado

- **MAJOR**: Cambios incompatibles con versiones anteriores
- **MINOR**: Nuevas funcionalidades compatibles hacia atrás
- **PATCH**: Correcciones de bugs compatibles hacia atrás

## Tipos de Cambios

- **Added**: Nuevas funcionalidades
- **Changed**: Cambios en funcionalidades existentes
- **Deprecated**: Funcionalidades que serán removidas
- **Removed**: Funcionalidades removidas
- **Fixed**: Correcciones de bugs
- **Security**: Mejoras de seguridad
