# 📡 Documentación de la API

## Base URL
```
http://localhost:5000/api
```

## Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación. Después de iniciar sesión, incluye el token en el header:

```
Authorization: Bearer <tu_token_jwt>
```

---

## Endpoints

### 1. Registro de Usuario

**POST** `/auth/register`

Registra un nuevo usuario en el sistema.

**Body:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@derecho.edu",
  "password": "password123",
  "rol": "estudiante"
}
```

**Roles disponibles:**
- `estudiante`
- `profesor`
- `admin`

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@derecho.edu",
    "rol": "estudiante"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores posibles:**
- `400`: Email ya registrado
- `400`: Datos de validación incorrectos
- `500`: Error del servidor

---

### 2. Inicio de Sesión

**POST** `/auth/login`

Autentica un usuario y devuelve un token JWT.

**Body:**
```json
{
  "email": "juan.perez@derecho.edu",
  "password": "password123"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Inicio de sesión exitoso",
  "user": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@derecho.edu",
    "rol": "estudiante"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores posibles:**
- `401`: Credenciales inválidas
- `400`: Datos de validación incorrectos
- `500`: Error del servidor

---

### 3. Obtener Perfil

**GET** `/auth/profile`

Obtiene la información del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "user": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@derecho.edu",
    "rol": "estudiante",
    "fecha_creacion": "2024-01-15T10:30:00.000Z"
  }
}
```

**Errores posibles:**
- `401`: Token no proporcionado o inválido
- `404`: Usuario no encontrado
- `500`: Error del servidor

---

### 4. Recuperar Contraseña

**POST** `/auth/forgot-password`

Solicita un token para recuperar la contraseña.

**Body:**
```json
{
  "email": "juan.perez@derecho.edu"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Si el correo existe, recibirás instrucciones para recuperar tu contraseña"
}
```

**Nota:** Por seguridad, siempre devuelve el mismo mensaje independientemente de si el email existe.

**Errores posibles:**
- `400`: Datos de validación incorrectos
- `500`: Error del servidor

---

### 5. Resetear Contraseña

**POST** `/auth/reset-password`

Resetea la contraseña usando un token válido.

**Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "newPassword": "nuevaPassword123"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Contraseña actualizada exitosamente"
}
```

**Errores posibles:**
- `400`: Token inválido o expirado
- `400`: Datos de validación incorrectos
- `500`: Error del servidor

---

### 6. Ruta de Prueba Admin

**GET** `/auth/admin`

Ruta protegida solo para administradores (ejemplo).

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "message": "Acceso autorizado como admin",
  "user": {
    "id": 1,
    "email": "admin@derecho.edu",
    "rol": "admin"
  }
}
```

**Errores posibles:**
- `401`: Token no proporcionado o inválido
- `403`: No tienes permisos (no eres admin)
- `500`: Error del servidor

---

## Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - No autenticado |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## Ejemplos de Uso

### Usando cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan.perez@derecho.edu",
    "password": "password123"
  }'
```

**Obtener Perfil:**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Usando Fetch (JavaScript)

**Login:**
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'juan.perez@derecho.edu',
    password: 'password123'
  })
});

const data = await response.json();
console.log(data.token);
```

**Obtener Perfil:**
```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:5000/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log(data.user);
```

### Usando Axios (JavaScript)

**Login:**
```javascript
import axios from 'axios';

const response = await axios.post('http://localhost:5000/api/auth/login', {
  email: 'juan.perez@derecho.edu',
  password: 'password123'
});

console.log(response.data.token);
```

**Obtener Perfil:**
```javascript
const token = localStorage.getItem('token');

const response = await axios.get('http://localhost:5000/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

console.log(response.data.user);
```

---

## Estructura de Errores

Todos los errores siguen el mismo formato:

```json
{
  "error": "Mensaje de error descriptivo"
}
```

Para errores de validación:

```json
{
  "errors": [
    {
      "field": "email",
      "message": "Debe ser un email válido"
    },
    {
      "field": "password",
      "message": "La contraseña debe tener al menos 6 caracteres"
    }
  ]
}
```

---

## Tokens JWT

### Estructura del Token

El token JWT contiene:

```javascript
{
  "id": 1,
  "email": "juan.perez@derecho.edu",
  "rol": "estudiante",
  "iat": 1640000000,  // Issued at
  "exp": 1640604800   // Expiration (7 días)
}
```

### Duración

- Los tokens tienen una duración de **7 días**
- Después de ese tiempo, el usuario debe iniciar sesión nuevamente

### Almacenamiento

En el frontend, el token se guarda en `localStorage`:

```javascript
localStorage.setItem('token', token);
```

---

## Validaciones

### Email
- Debe ser un formato de email válido
- Máximo 255 caracteres

### Contraseña
- Mínimo 6 caracteres
- Se hashea con bcrypt (10 rounds)

### Nombre y Apellido
- Mínimo 2 caracteres
- Máximo 100 caracteres

### Rol
- Debe ser uno de: `estudiante`, `profesor`, `admin`

---

## Seguridad

### Medidas Implementadas

1. **Contraseñas Hasheadas**: Bcrypt con 10 rounds
2. **JWT**: Tokens firmados con clave secreta
3. **CORS**: Configurado para solo permitir el frontend
4. **Validación**: Datos validados en frontend y backend
5. **SQL Injection**: Uso de queries parametrizadas
6. **Rate Limiting**: Recomendado implementar en producción

### Mejoras Recomendadas para Producción

- [ ] Implementar rate limiting
- [ ] Agregar HTTPS
- [ ] Implementar refresh tokens
- [ ] Agregar logs de auditoría
- [ ] Implementar 2FA
- [ ] Agregar captcha en login/registro
- [ ] Implementar política de contraseñas más estricta

---

## Testing

Puedes probar la API usando:

1. **Postman**: Importa la colección desde `postman_collection.json` (si existe)
2. **Thunder Client** (VS Code): Extension para testing de APIs
3. **cURL**: Desde la línea de comandos
4. **Navegador**: Para endpoints GET públicos

---

## Soporte

Para reportar problemas o sugerencias, crea un issue en el repositorio.
