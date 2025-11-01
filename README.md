# Sistema de Evaluaciones Orales - Facultad de Derecho

Sistema web completo para la gestión de evaluaciones orales desarrollado con el stack PERN (PostgreSQL, Express, React, Node.js).

## 🚀 Características

- ✅ Autenticación de usuarios (Login/Registro)
- ✅ Recuperación de contraseña
- ✅ Sistema de roles (Estudiante, Profesor, Admin)
- ✅ Dashboard personalizado por rol
- ✅ Gestión de Evaluaciones
  - Vista diferenciada por rol (Estudiante vs Profesor/Admin)
  - Crear, editar y eliminar evaluaciones (Profesor/Admin)
  - Filtros por fecha, estado y modalidad
  - Listado de evaluaciones con tabla
- ✅ Pantalla de Configuración
  - Tabs: Usuario y Aplicación
  - Información de contacto
  - Gestión de sesión (Logout)
- ✅ Header fijo con botón de configuración
- ✅ Navegación inferior con 3 opciones principales
- ✅ Protección contra pérdida de datos al salir de formularios
- ✅ Interfaz moderna y responsiva con diseño sobrio
- ✅ Validación de datos en frontend y backend
- ✅ Tokens JWT para sesiones seguras
- ✅ Contraseñas encriptadas con bcrypt
- ✅ Modo desarrollo con selector de roles

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v16 o superior) - [Descargar](https://nodejs.org/)
- **PostgreSQL** (v12 o superior) - [Descargar](https://www.postgresql.org/download/)
- **npm** o **yarn** (viene con Node.js)

## 🛠️ Instalación

### 1. Clonar o descargar el proyecto

```bash
cd "d:\Proyectos\Proyecto ISW test"
```

### 2. Configurar la Base de Datos

El proyecto está configurado para usar la base de datos `proyecto_isw_db`.

#### Opción A: Usando Scripts PowerShell (Recomendado - Windows)

```powershell
# Desde la raíz del proyecto
.\scripts\create-database.ps1
```

Este script creará automáticamente la base de datos y las tablas necesarias.

#### Opción B: Usando pgAdmin o herramienta GUI

1. Abre pgAdmin o tu cliente PostgreSQL preferido
2. Crea una nueva base de datos llamada `proyecto_isw_db`
3. Ejecuta el script SQL ubicado en `backend/database/init.sql`

#### Opción C: Usando línea de comandos

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE proyecto_isw_db;

# Conectarse a la base de datos
\c proyecto_isw_db

# Ejecutar el script (desde el directorio backend)
\i database/init.sql

# Salir
\q
```

### 3. Configurar el Backend

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Edita el archivo .env con tus credenciales de PostgreSQL
# Ya existe un archivo .env configurado

# El archivo .env debe contener:
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=tu_password
# DB_NAME=proyecto_isw_db
# PORT=5000
# JWT_SECRET=tu_clave_secreta
```

### 4. Configurar el Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install
```

## 🚀 Ejecución

### Opción 1: Script PowerShell (Recomendado - Windows)

```powershell
# Desde la raíz del proyecto
.\scripts\start.ps1
```

Este script iniciará automáticamente el backend y el frontend en terminales separadas.

### Opción 2: Ejecutar Backend y Frontend por separado

#### Terminal 1 - Backend:
```bash
cd backend
npm run dev
# El servidor estará corriendo en http://localhost:5000
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
# La aplicación estará disponible en http://localhost:5173
```

## 📱 Uso de la Aplicación

### Acceder a la aplicación

1. Abre tu navegador en `http://localhost:5173`
2. Verás la pantalla de inicio de sesión

### Modo Desarrollo

El sistema cuenta con un **modo desarrollo** que permite:
- Iniciar sesión sin credenciales (dejar campos vacíos)
- Seleccionar el rol directamente desde un dropdown
- Probar la aplicación con diferentes roles sin necesidad de registrarse

### Roles y Permisos

#### Estudiante
- Ver dashboard con simulaciones disponibles
- Ver listado de evaluaciones (solo lectura)
- Acceder a configuración personal
- Sin permisos de creación o edición

#### Profesor
- Ver dashboard con opciones de gestión
- Crear nuevas evaluaciones
- Editar y eliminar evaluaciones existentes
- Acceso completo a gestión de evaluaciones
- Configuración personal

#### Administrador
- Acceso completo al sistema
- Panel de administración
- Gestión de usuarios y evaluaciones
- Configuración avanzada

## 🗂️ Estructura del Proyecto

```
Proyecto ISW test/
│
├── backend/
│   ├── config/
│   │   └── database.js          # Configuración de PostgreSQL
│   ├── controllers/
│   │   └── authController.js    # Lógica de autenticación
│   ├── database/
│   │   └── init.sql             # Script de inicialización DB
│   ├── middleware/
│   │   ├── authMiddleware.js    # Middleware JWT
│   │   └── validators.js        # Validadores de datos
│   ├── routes/
│   │   └── authRoutes.js        # Rutas de autenticación
│   ├── .env                     # Variables de entorno
│   ├── server.js                # Servidor Express
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx        # Componente de Login
│   │   │   ├── Login.css
│   │   │   ├── Register.jsx     # Componente de Registro
│   │   │   ├── Register.css
│   │   │   ├── Dashboard.jsx    # Dashboard por rol
│   │   │   ├── Dashboard.css
│   │   │   ├── Header.jsx       # Header compartido
│   │   │   ├── Header.css
│   │   │   ├── Settings.jsx     # Configuración
│   │   │   ├── Settings.css
│   │   │   ├── EvaluationManagement.jsx  # Gestión de evaluaciones
│   │   │   ├── EvaluationManagement.css
│   │   │   ├── CreateEvaluation.jsx      # Crear evaluación
│   │   │   └── CreateEvaluation.css
│   │   ├── services/
│   │   │   └── api.js           # Servicios API y axios
│   │   ├── App.jsx              # Componente principal
│   │   ├── App.css
│   │   ├── main.jsx             # Punto de entrada
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── scripts/
│   ├── start.ps1                # Script para iniciar servidores
│   ├── create-database.ps1      # Script para crear BD
│   ├── setup.ps1                # Script de configuración inicial
│   └── verify-database.ps1      # Verificar conexión BD
│
└── README.md
```

## 🔐 Seguridad

- Las contraseñas se hashean con bcrypt (10 rounds)
- Autenticación basada en JWT con expiración de 7 días
- Validación de datos en frontend y backend
- Protección CORS configurada
- Variables sensibles en archivo .env (no versionado)
- Protección contra pérdida de datos en formularios
- Headers fijos para mejor UX y seguridad visual

## 🧪 Endpoints de la API

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (requiere autenticación)
- `POST /api/auth/forgot-password` - Solicitar recuperación de contraseña
- `POST /api/auth/reset-password` - Resetear contraseña

### Ejemplo de petición

```javascript
// Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "usuario@derecho.edu",
  "password": "password123"
}
```

## 🐛 Solución de Problemas

### Error de conexión a PostgreSQL

1. Verifica que PostgreSQL esté corriendo
2. Confirma las credenciales en el archivo `.env`
3. Asegúrate de que la base de datos `evaluaciones_orales` exista

```bash
# Verificar servicio PostgreSQL en Windows
Get-Service -Name postgresql*

# Si no está corriendo, iniciarlo desde pgAdmin o servicios de Windows
```

### Error de CORS

Si ves errores de CORS, verifica:
- El backend esté corriendo en el puerto 5000
- El frontend esté corriendo en el puerto 5173
- La configuración CORS en `backend/server.js`

### Puerto en uso

Si el puerto ya está en uso:

```bash
# Windows PowerShell - Encontrar proceso usando puerto 5000
netstat -ano | findstr :5000

# Matar proceso por PID
taskkill /PID <PID> /F
```

## 📚 Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución JavaScript
- **Express** - Framework web minimalista
- **PostgreSQL** - Base de datos relacional
- **pg** - Cliente PostgreSQL para Node.js
- **bcryptjs** - Encriptación de contraseñas
- **jsonwebtoken** - Autenticación JWT
- **express-validator** - Validación de datos
- **dotenv** - Gestión de variables de entorno
- **cors** - Manejo de CORS

### Frontend
- **React** - Biblioteca UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **CSS3** - Estilos personalizados

## 🚧 Próximas Funcionalidades

- [ ] Sistema completo de simulación de evaluaciones
- [ ] Sistema de calificaciones con rúbricas
- [ ] Calendario interactivo de evaluaciones
- [ ] Notificaciones por email y en tiempo real
- [ ] Panel de estadísticas y reportes
- [ ] Exportación de reportes en PDF/Excel
- [ ] Sistema de comentarios y retroalimentación
- [ ] Historial completo de evaluaciones
- [ ] Integración con sistema de videollamadas
- [ ] Grabación y almacenamiento de evaluaciones

## 📝 Notas de Desarrollo

- El proyecto usa módulos ES6 (type: "module" en package.json)
- Las validaciones están implementadas tanto en frontend como backend
- Los tokens JWT tienen una expiración de 7 días
- Las contraseñas requieren mínimo 6 caracteres
- Los emails deben tener formato válido
- Sistema de roles implementado con permisos diferenciados
- Headers fijos en todas las pantallas para mejor navegación
- Modal de confirmación al salir de formularios con datos
- Diseño responsivo y sobrio (colores sólidos, sin gradientes)
- Navegación inferior simplificada con 3 opciones principales

## 👥 Contribución

Este es un proyecto educativo. Si deseas contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

## 📞 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la sección de solución de problemas
2. Verifica que todos los requisitos estén instalados
3. Asegúrate de seguir todos los pasos de instalación

---

Desarrollado con ❤️ usando el stack PERN
