# 🎨 Guía de Personalización

Esta guía te ayudará a personalizar el sistema según tus necesidades.

## 🎨 Personalización de Estilos

### Colores Principales

Los colores se definen en los archivos CSS de cada componente. Para cambiar el esquema de colores:

**Header (Azul institucional):**

Archivo: `frontend/src/components/Login.css` y `Dashboard.css`

```css
/* Cambiar el color del header */
.login-header {
  background: linear-gradient(90deg, #003366 0%, #004d99 100%);
}

/* Tus colores personalizados (ejemplo: verde) */
.login-header {
  background: linear-gradient(90deg, #1b5e20 0%, #2e7d32 100%);
}
```

**Botón principal:**

```css
/* Actual */
.login-button {
  background: linear-gradient(90deg, #003366 0%, #004d99 100%);
}

/* Personalizado (ejemplo: morado) */
.login-button {
  background: linear-gradient(90deg, #6a1b9a 0%, #8e24aa 100%);
}
```

### Logo Institucional

**Reemplazar el emoji en el header:**

Archivo: `frontend/src/components/Login.jsx` (línea ~86)

```jsx
// Actual
<div className="header-icon"></div>

// Con CSS (Login.css):
.header-icon::before {
  content: '⚖️';  // Cambiar por tu emoji o dejar vacío
}

// O usar una imagen:
.header-icon {
  background-image: url('/path/to/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
```

### Fuentes

Archivo: `frontend/src/index.css`

```css
/* Actual */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
}

/* Con Google Fonts (agregar en index.html primero) */
body {
  font-family: 'Roboto', sans-serif;
}
```

---

## 📝 Personalización de Textos

### Título de la Institución

**Frontend - Login:**

Archivo: `frontend/src/components/Login.jsx` (línea ~88)

```jsx
<h1>Facultad de Derecho - Sistema de Evaluaciones Orales</h1>

// Cambiar a:
<h1>Tu Institución - Tu Sistema</h1>
```

### Título del Navegador

Archivo: `frontend/index.html` (línea 8)

```html
<title>Sistema de Evaluaciones Orales - Facultad de Derecho</title>

<!-- Cambiar a: -->
<title>Tu Sistema - Tu Institución</title>
```

### Mensajes de Bienvenida

Archivo: `frontend/src/components/Login.jsx` (líneas ~95-99)

```jsx
<h2 className="login-title">Bienvenido</h2>
<p className="login-subtitle">
  Inicie sesión para acceder al sistema.
</p>
```

---

## 🗄️ Personalización de la Base de Datos

### Agregar Campos al Usuario

**1. Modificar la tabla:**

Archivo: `backend/database/init.sql`

```sql
ALTER TABLE usuarios 
ADD COLUMN telefono VARCHAR(20),
ADD COLUMN direccion TEXT,
ADD COLUMN fecha_nacimiento DATE;
```

**2. Actualizar el controlador:**

Archivo: `backend/controllers/authController.js`

```javascript
// En el método register, agregar los nuevos campos:
const { nombre, apellido, email, password, rol, telefono, direccion } = req.body;

const result = await pool.query(
  `INSERT INTO usuarios (nombre, apellido, email, password, rol, telefono, direccion) 
   VALUES ($1, $2, $3, $4, $5, $6, $7) 
   RETURNING *`,
  [nombre, apellido, email, hashedPassword, rol, telefono, direccion]
);
```

**3. Actualizar el formulario:**

Archivo: `frontend/src/components/Register.jsx`

```jsx
<div className="form-group">
  <label htmlFor="telefono">Teléfono</label>
  <input
    type="tel"
    id="telefono"
    name="telefono"
    value={formData.telefono}
    onChange={handleChange}
    placeholder="Número de teléfono"
  />
</div>
```

### Agregar Nuevas Tablas

Ejemplo: Tabla de evaluaciones

```sql
CREATE TABLE evaluaciones (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    profesor_id INTEGER REFERENCES usuarios(id),
    estudiante_id INTEGER REFERENCES usuarios(id),
    calificacion DECIMAL(5,2),
    comentarios TEXT,
    estado VARCHAR(50) DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Configuración de Seguridad

### Cambiar Duración del Token JWT

Archivo: `backend/controllers/authController.js`

```javascript
// Actual (7 días)
const token = jwt.sign(
  { id: user.id, email: user.email, rol: user.rol },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Cambiar a 1 día:
{ expiresIn: '1d' }

// O 8 horas:
{ expiresIn: '8h' }
```

### Requisitos de Contraseña

Archivo: `backend/middleware/validators.js`

```javascript
// Actual (mínimo 6 caracteres)
body('password')
  .notEmpty().withMessage('La contraseña es requerida')
  .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

// Más estricto:
body('password')
  .notEmpty().withMessage('La contraseña es requerida')
  .isLength({ min: 8 }).withMessage('Mínimo 8 caracteres')
  .matches(/\d/).withMessage('Debe contener al menos un número')
  .matches(/[A-Z]/).withMessage('Debe contener al menos una mayúscula')
  .matches(/[!@#$%^&*]/).withMessage('Debe contener al menos un carácter especial'),
```

### Configurar CORS

Archivo: `backend/server.js`

```javascript
// Actual (solo localhost)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Para producción:
app.use(cors({
  origin: 'https://tu-dominio.com',
  credentials: true
}));

// Múltiples orígenes:
app.use(cors({
  origin: ['http://localhost:5173', 'https://tu-dominio.com'],
  credentials: true
}));
```

---

## 📧 Configurar Email

### Configurar Nodemailer

Archivo: `backend/controllers/authController.js`

Agregar en el método `forgotPassword`:

```javascript
import nodemailer from 'nodemailer';

// Configurar transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Enviar email
const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: 'Recuperación de Contraseña',
  html: `
    <h2>Recuperación de Contraseña</h2>
    <p>Has solicitado recuperar tu contraseña.</p>
    <p>Haz clic en el siguiente enlace para resetear tu contraseña:</p>
    <a href="${resetUrl}">Resetear Contraseña</a>
    <p>Este enlace expira en 1 hora.</p>
    <p>Si no solicitaste esto, ignora este email.</p>
  `,
});
```

### Configurar Gmail

Archivo: `backend/.env`

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_app_password  # No tu contraseña normal, genera una App Password
```

Para generar App Password en Gmail:
1. Ve a tu cuenta de Google
2. Seguridad → Verificación en 2 pasos
3. Contraseñas de aplicaciones
4. Genera una nueva contraseña

---

## 🌐 Configuración para Producción

### Variables de Entorno

Archivo: `backend/.env` (producción)

```env
NODE_ENV=production
DB_HOST=tu-servidor-postgresql.com
DB_PORT=5432
DB_USER=usuario_produccion
DB_PASSWORD=contraseña_segura
DB_NAME=evaluaciones_orales
PORT=5000
JWT_SECRET=una_clave_muy_segura_y_aleatoria
```

### Build del Frontend

```bash
cd frontend
npm run build

# Esto generará la carpeta 'dist' que puedes servir con un servidor web
```

### Servidor con Node.js (Producción)

```bash
cd backend
npm install pm2 -g
pm2 start server.js --name "evaluaciones-backend"
pm2 save
pm2 startup
```

---

## 🔧 Agregar Nuevas Funcionalidades

### Ejemplo: Agregar Perfil de Usuario

**1. Crear el componente:**

`frontend/src/components/Profile.jsx`

```jsx
import { useState, useEffect } from 'react';
import { authService } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setUser(data.user);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Mi Perfil</h2>
      {user && (
        <div>
          <p>Nombre: {user.nombre} {user.apellido}</p>
          <p>Email: {user.email}</p>
          <p>Rol: {user.rol}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
```

**2. Agregar la ruta:**

`frontend/src/App.jsx`

```jsx
import Profile from './components/Profile';

// En las rutas:
<Route
  path="/profile"
  element={
    user ? <Profile /> : <Navigate to="/" replace />
  }
/>
```

---

## 📊 Agregar Analytics

### Google Analytics

Archivo: `frontend/index.html`

```html
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=TU-ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'TU-ID');
  </script>
</head>
```

---

## 🐛 Debugging

### Habilitar Logs Detallados

**Backend:**

```javascript
// En server.js, agregar middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});
```

**Frontend:**

```javascript
// En services/api.js
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method.toUpperCase(), config.url, config.data);
    return config;
  }
);
```

---

## 📚 Recursos Adicionales

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

¿Necesitas ayuda adicional? Consulta los otros archivos de documentación:
- `README.md` - Guía completa de instalación
- `QUICKSTART.md` - Inicio rápido
- `API_DOCUMENTATION.md` - Documentación de la API
