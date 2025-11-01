# 🚀 Guía Rápida de Instalación

## Pasos para ejecutar el proyecto

### 1️⃣ Instalar PostgreSQL
- Descargar: https://www.postgresql.org/download/
- Durante la instalación, anota tu contraseña de usuario `postgres`

### 2️⃣ Crear la Base de Datos

Opción A - Usando pgAdmin (Recomendado para Windows):
1. Abre pgAdmin
2. Click derecho en "Databases" → "Create" → "Database"
3. Nombre: `evaluaciones_orales`
4. Click "Save"
5. Click derecho en la nueva base de datos → "Query Tool"
6. Abre y ejecuta el archivo: `backend/database/init.sql`

Opción B - Línea de comandos:
```powershell
# Abrir PowerShell y ejecutar:
psql -U postgres
# Ingresar contraseña cuando se solicite

# Dentro de psql:
CREATE DATABASE evaluaciones_orales;
\c evaluaciones_orales
\i 'D:/Proyectos/Proyecto ISW test/backend/database/init.sql'
\q
```

### 3️⃣ Configurar Backend

```powershell
# Navegar al directorio backend
cd "d:\Proyectos\Proyecto ISW test\backend"

# Instalar dependencias
npm install

# Editar archivo .env con tus credenciales de PostgreSQL
# Usar notepad o tu editor preferido
notepad .env

# Asegúrate de que contenga:
# DB_PASSWORD=tu_password_de_postgres
```

### 4️⃣ Configurar Frontend

```powershell
# Abrir NUEVA terminal PowerShell
cd "d:\Proyectos\Proyecto ISW test\frontend"

# Instalar dependencias
npm install
```

### 5️⃣ Ejecutar el Proyecto

#### Terminal 1 - Backend:
```powershell
cd "d:\Proyectos\Proyecto ISW test\backend"
npm run dev
```
✅ Deberías ver: "🚀 Servidor corriendo en http://localhost:5000"

#### Terminal 2 - Frontend (nueva terminal):
```powershell
cd "d:\Proyectos\Proyecto ISW test\frontend"
npm run dev
```
✅ Deberías ver: "Local: http://localhost:5173"

### 6️⃣ Abrir la Aplicación

Abre tu navegador en: **http://localhost:5173**

### 👤 Usuarios de Prueba

**Correo**: admin@derecho.edu  
**Contraseña**: admin123

(Nota: Los hashes en el SQL son de ejemplo, tendrás que crear usuarios desde el registro)

---

## ❌ Solución de Problemas Comunes

### Error: "Cannot find module"
```powershell
# Reinstalar dependencias
npm install
```

### Error: "Port already in use"
```powershell
# Encontrar el proceso
netstat -ano | findstr :5000
# Matar el proceso (reemplaza PID)
taskkill /PID <PID> /F
```

### Error de conexión a PostgreSQL
1. Verifica que PostgreSQL esté corriendo (Servicios de Windows)
2. Confirma la contraseña en `backend/.env`
3. Verifica que la base de datos `evaluaciones_orales` exista

### La página no carga
1. Asegúrate de que ambos servidores estén corriendo
2. Backend en puerto 5000
3. Frontend en puerto 5173

---

## 📝 Comandos Útiles

```powershell
# Ver procesos de Node.js
Get-Process node

# Detener todos los procesos de Node.js (cuidado)
Stop-Process -Name node

# Ver puertos en uso
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Reiniciar PostgreSQL
Restart-Service postgresql-x64-*
```

---

¡Listo! 🎉 Tu aplicación debería estar funcionando.
