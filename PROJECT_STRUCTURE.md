# 📋 Estructura del Proyecto - Sistema de Evaluaciones Orales

## Visión General

Este proyecto es una aplicación web completa para la gestión de evaluaciones orales en la Facultad de Derecho, desarrollada con el stack PERN (PostgreSQL, Express, React, Node.js).

## 📂 Arquitectura del Proyecto

```
Proyecto ISW test/
│
├── 📄 README.md                    # Documentación principal
├── 📄 QUICKSTART.md                # Guía de inicio rápido
├── 📄 API_DOCUMENTATION.md         # Documentación de la API REST
├── 📄 CUSTOMIZATION.md             # Guía de personalización
├── 📄 PROJECT_STRUCTURE.md         # Este archivo
├── 📄 package.json                 # Scripts del proyecto raíz
├── 📄 .gitignore                   # Archivos ignorados por Git
├── 🔧 setup.ps1                    # Script de instalación automática
├── 🔧 start.ps1                    # Script para ejecutar el proyecto
│
├── 📁 backend/                     # Servidor Node.js + Express
│   ├── 📁 config/
│   │   └── database.js             # Configuración de PostgreSQL
│   │
│   ├── 📁 controllers/
│   │   └── authController.js       # Lógica de autenticación
│   │
│   ├── 📁 database/
│   │   └── init.sql                # Script de inicialización de BD
│   │
│   ├── 📁 middleware/
│   │   ├── authMiddleware.js       # Middleware de autenticación JWT
│   │   └── validators.js           # Validadores de datos
│   │
│   ├── 📁 routes/
│   │   └── authRoutes.js           # Rutas de autenticación
│   │
│   ├── 📄 server.js                # Punto de entrada del servidor
│   ├── 📄 package.json             # Dependencias del backend
│   ├── 📄 .env                     # Variables de entorno (no versionado)
│   ├── 📄 .env.example             # Ejemplo de variables de entorno
│   └── 📄 .gitignore               # Archivos ignorados
│
└── 📁 frontend/                    # Aplicación React
    ├── 📁 src/
    │   ├── 📁 components/
    │   │   ├── Login.jsx           # Componente de inicio de sesión
    │   │   ├── Login.css           # Estilos del login
    │   │   ├── Register.jsx        # Componente de registro
    │   │   ├── Register.css        # Estilos del registro
    │   │   ├── Dashboard.jsx       # Panel principal
    │   │   └── Dashboard.css       # Estilos del dashboard
    │   │
    │   ├── 📁 services/
    │   │   └── api.js              # Servicios de API y Axios
    │   │
    │   ├── App.jsx                 # Componente raíz
    │   ├── App.css                 # Estilos de la app
    │   ├── main.jsx                # Punto de entrada
    │   └── index.css               # Estilos globales
    │
    ├── 📄 index.html               # HTML principal
    ├── 📄 vite.config.js           # Configuración de Vite
    ├── 📄 package.json             # Dependencias del frontend
    └── 📄 .gitignore               # Archivos ignorados
```

## 🔍 Detalles de Cada Carpeta

### Backend (📁 backend/)

#### config/
Contiene las configuraciones del proyecto backend.

- **database.js**: Configuración y conexión a PostgreSQL usando pg Pool.

#### controllers/
Lógica de negocio de la aplicación.

- **authController.js**: Maneja toda la lógica de autenticación:
  - `register`: Registro de nuevos usuarios
  - `login`: Inicio de sesión
  - `getProfile`: Obtener información del usuario
  - `forgotPassword`: Solicitar recuperación de contraseña
  - `resetPassword`: Resetear contraseña con token

#### database/
Scripts y migraciones de base de datos.

- **init.sql**: Script de inicialización que crea:
  - Tabla `usuarios`
  - Tabla `password_reset_tokens`
  - Tabla `sesiones`
  - Índices para optimización
  - Usuarios de prueba

#### middleware/
Funciones intermedias para el procesamiento de peticiones.

- **authMiddleware.js**: 
  - `authMiddleware`: Verifica tokens JWT
  - `checkRole`: Verifica roles de usuario
  
- **validators.js**: Validaciones usando express-validator:
  - `registerValidation`: Valida datos de registro
  - `loginValidation`: Valida datos de login
  - `forgotPasswordValidation`: Valida email para recuperación
  - `resetPasswordValidation`: Valida datos para reset

#### routes/
Definición de endpoints de la API.

- **authRoutes.js**: Rutas de autenticación:
  - POST `/api/auth/register`
  - POST `/api/auth/login`
  - GET `/api/auth/profile`
  - POST `/api/auth/forgot-password`
  - POST `/api/auth/reset-password`
  - GET `/api/auth/admin` (ejemplo de ruta protegida)

#### server.js
Punto de entrada del servidor Express:
- Configuración de middlewares (CORS, JSON, etc.)
- Montaje de rutas
- Manejo de errores
- Inicio del servidor

---

### Frontend (📁 frontend/)

#### src/components/
Componentes React reutilizables.

- **Login.jsx/css**: 
  - Formulario de inicio de sesión
  - Recuperación de contraseña
  - Manejo de errores
  - Toggle para mostrar/ocultar contraseña

- **Register.jsx/css**:
  - Formulario de registro
  - Validación de contraseñas coincidentes
  - Selección de rol
  - Diseño responsivo

- **Dashboard.jsx/css**:
  - Panel principal del usuario
  - Información del usuario
  - Tarjetas de características
  - Botón de cerrar sesión

#### src/services/
Servicios para comunicación con el backend.

- **api.js**:
  - Instancia configurada de Axios
  - Interceptores para agregar tokens JWT
  - Funciones de autenticación (`authService`)
  - Manejo automático de errores 401

#### src/App.jsx
Componente raíz de la aplicación:
- Configuración de React Router
- Gestión del estado de autenticación
- Protección de rutas
- Navegación entre componentes

#### src/main.jsx
Punto de entrada de React:
- Renderiza el componente App
- Configuración de React StrictMode

#### src/index.css
Estilos globales de la aplicación:
- Reset CSS
- Estilos de fuentes
- Colores de fondo

---

## 🗃️ Base de Datos

### Tabla: usuarios

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | ID único del usuario |
| nombre | VARCHAR(100) | Nombre del usuario |
| apellido | VARCHAR(100) | Apellido del usuario |
| email | VARCHAR(255) | Correo electrónico (único) |
| password | VARCHAR(255) | Contraseña hasheada |
| rol | VARCHAR(50) | Rol: estudiante, profesor, admin |
| activo | BOOLEAN | Estado del usuario |
| fecha_creacion | TIMESTAMP | Fecha de creación |
| fecha_actualizacion | TIMESTAMP | Última actualización |

### Tabla: password_reset_tokens

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | ID único del token |
| usuario_id | INTEGER | FK a usuarios |
| token | VARCHAR(255) | Token de recuperación |
| expira_en | TIMESTAMP | Fecha de expiración |
| usado | BOOLEAN | Si ya fue usado |
| fecha_creacion | TIMESTAMP | Fecha de creación |

### Tabla: sesiones

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | SERIAL | ID único de la sesión |
| usuario_id | INTEGER | FK a usuarios |
| token | TEXT | JWT token |
| ip_address | VARCHAR(50) | IP del cliente |
| user_agent | TEXT | User agent del navegador |
| fecha_inicio | TIMESTAMP | Inicio de sesión |
| fecha_expiracion | TIMESTAMP | Expiración del token |
| activa | BOOLEAN | Estado de la sesión |

---

## 🔄 Flujo de Datos

### 1. Registro de Usuario

```
Frontend (Register.jsx)
    ↓ POST /api/auth/register
Backend (authRoutes.js)
    ↓ validators.js
authController.register()
    ↓ bcrypt.hash()
PostgreSQL (INSERT usuarios)
    ↓ jwt.sign()
Frontend ← token + user data
    ↓ localStorage
Dashboard
```

### 2. Inicio de Sesión

```
Frontend (Login.jsx)
    ↓ POST /api/auth/login
Backend (authRoutes.js)
    ↓ validators.js
authController.login()
    ↓ SELECT usuarios
    ↓ bcrypt.compare()
    ↓ jwt.sign()
Frontend ← token + user data
    ↓ localStorage
Dashboard
```

### 3. Petición Protegida

```
Frontend (cualquier componente)
    ↓ GET /api/auth/profile
    ↓ headers: { Authorization: Bearer token }
Backend (authMiddleware.js)
    ↓ jwt.verify()
    ↓ checkRole() (opcional)
authController.getProfile()
    ↓ SELECT usuarios
Frontend ← user data
```

---

## 🔐 Seguridad

### Autenticación
- **JWT**: Tokens con expiración de 7 días
- **Bcrypt**: Hash de contraseñas con 10 rounds
- **Headers**: Authorization Bearer token

### Validación
- **Frontend**: Validación básica en formularios
- **Backend**: express-validator para todas las entradas
- **Base de datos**: Constraints y tipos de datos

### CORS
- Configurado para permitir solo el frontend específico
- Credentials habilitados para cookies/auth

### Variables de Entorno
- Credenciales sensibles en `.env`
- `.env` excluido de Git
- `.env.example` para referencia

---

## 📦 Dependencias

### Backend

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| express | ^4.18.2 | Framework web |
| pg | ^8.11.3 | Cliente PostgreSQL |
| dotenv | ^16.3.1 | Variables de entorno |
| cors | ^2.8.5 | Manejo de CORS |
| bcryptjs | ^2.4.3 | Hash de contraseñas |
| jsonwebtoken | ^9.0.2 | Tokens JWT |
| express-validator | ^7.0.1 | Validación de datos |
| nodemailer | ^6.9.7 | Envío de emails |
| nodemon | ^3.0.1 | Auto-reload (dev) |

### Frontend

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| react | ^18.2.0 | Biblioteca UI |
| react-dom | ^18.2.0 | React DOM |
| react-router-dom | ^6.20.0 | Enrutamiento |
| axios | ^1.6.2 | Cliente HTTP |
| vite | ^5.0.8 | Build tool |
| @vitejs/plugin-react | ^4.2.1 | Plugin React para Vite |

---

## 🚀 Scripts Disponibles

### Raíz del Proyecto

```bash
npm run setup          # Ejecutar setup.ps1
npm run start          # Ejecutar start.ps1
npm run install:all    # Instalar todas las dependencias
```

### Backend

```bash
npm start              # Iniciar servidor (producción)
npm run dev            # Iniciar con nodemon (desarrollo)
```

### Frontend

```bash
npm run dev            # Iniciar servidor de desarrollo
npm run build          # Build para producción
npm run preview        # Preview del build
```

---

## 🎨 Diseño y Estilos

### Paleta de Colores

```css
/* Azul Institucional */
--primary: #003366
--primary-light: #004d99
--primary-dark: #002244

/* Neutrales */
--background: #f0f2f5
--card-background: #ffffff
--text-primary: #1a1a1a
--text-secondary: #666666

/* Estados */
--error: #c33
--error-bg: #fee
```

### Breakpoints Responsivos

```css
/* Mobile First */
@media (max-width: 768px) {
  /* Tablet y móviles */
}

@media (max-width: 480px) {
  /* Solo móviles */
}
```

---

## 🔮 Funcionalidades Futuras

### Próximamente
- [ ] Gestión completa de evaluaciones
- [ ] Sistema de calificaciones
- [ ] Calendario de evaluaciones
- [ ] Notificaciones push
- [ ] Chat en tiempo real
- [ ] Exportación de reportes PDF
- [ ] Dashboard con gráficas
- [ ] Sistema de comentarios
- [ ] Historial de cambios
- [ ] Modo oscuro

### En Consideración
- [ ] Integración con Google Calendar
- [ ] Autenticación con OAuth (Google, Microsoft)
- [ ] Aplicación móvil (React Native)
- [ ] API pública para integraciones
- [ ] Sistema de roles más granular
- [ ] Auditoría completa de acciones

---

## 📊 Métricas del Proyecto

- **Líneas de código**: ~2,500
- **Archivos**: 30+
- **Componentes React**: 3
- **Endpoints API**: 6
- **Tablas BD**: 3
- **Tiempo de desarrollo**: ~4-6 horas

---

## 🤝 Contribución

### Cómo Agregar Nuevas Funcionalidades

1. **Backend**:
   - Crear controlador en `controllers/`
   - Definir rutas en `routes/`
   - Agregar validaciones en `middleware/validators.js`
   - Actualizar base de datos si es necesario

2. **Frontend**:
   - Crear componente en `components/`
   - Agregar ruta en `App.jsx`
   - Crear servicio en `services/` si es necesario
   - Agregar estilos CSS

3. **Testing**:
   - Probar en desarrollo
   - Verificar validaciones
   - Probar responsividad
   - Verificar manejo de errores

---

## 📚 Recursos de Aprendizaje

### Documentación Oficial
- [React](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Node.js](https://nodejs.org/docs/)

### Tutoriales Recomendados
- PERN Stack Tutorial
- JWT Authentication Guide
- React Router Documentation
- Axios Documentation

---

## 📞 Soporte y Contacto

Para preguntas, sugerencias o reportar problemas:

1. Revisa la documentación completa
2. Consulta la sección de troubleshooting
3. Verifica los logs de consola
4. Crea un issue en el repositorio

---

**Desarrollado con ❤️ usando el Stack PERN**

*PostgreSQL • Express • React • Node.js*
