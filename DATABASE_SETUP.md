# 🗄️ Guía para Crear la Base de Datos con pgAdmin

## Opción 1: Usando pgAdmin (Recomendado - Interfaz Gráfica)

### Paso 1: Abrir pgAdmin
1. Busca **pgAdmin 4** en el menú inicio de Windows
2. Ábrelo (puede tardar unos segundos en cargar)
3. Te pedirá una contraseña maestra (si es la primera vez, créala)

### Paso 2: Conectar al Servidor PostgreSQL
1. En el panel izquierdo, expande **Servers**
2. Haz clic en **PostgreSQL** (puede pedir la contraseña que configuraste al instalar PostgreSQL)
3. Ingresa tu contraseña de PostgreSQL

### Paso 3: Crear la Base de Datos
1. **Click derecho** en **Databases** → **Create** → **Database...**
2. En el campo **Database**, escribe: `evaluaciones_orales`
3. Deja los demás campos por defecto
4. Haz clic en **Save**

### Paso 4: Ejecutar el Script SQL
1. **Click derecho** en la base de datos `evaluaciones_orales` que acabas de crear
2. Selecciona **Query Tool** (se abrirá una ventana de consultas)
3. Haz clic en el icono de **carpeta** (Open File) en la barra superior
4. Navega a: `d:\Proyectos\Proyecto ISW test\backend\database\init.sql`
5. Selecciona el archivo y haz clic en **Abrir**
6. Haz clic en el botón **▶ Execute/Refresh** (o presiona F5)
7. Deberías ver mensajes de éxito en el panel inferior

### ✅ Verificar que todo funcionó
1. En el panel izquierdo, expande:
   - `evaluaciones_orales` → `Schemas` → `public` → `Tables`
2. Deberías ver 3 tablas:
   - `usuarios`
   - `password_reset_tokens`
   - `sesiones`

---

## Opción 2: Usando SQL Shell (psql) - Línea de Comandos

Si prefieres la línea de comandos:

### Paso 1: Abrir SQL Shell (psql)
1. Busca **SQL Shell (psql)** en el menú inicio
2. Ábrelo
3. Presiona Enter para aceptar los valores por defecto hasta llegar a Password
4. Ingresa la contraseña de PostgreSQL

### Paso 2: Crear la Base de Datos
```sql
CREATE DATABASE evaluaciones_orales;
```

### Paso 3: Conectarse a la Base de Datos
```sql
\c evaluaciones_orales
```

### Paso 4: Ejecutar el Script
```sql
\i 'd:/Proyectos/Proyecto ISW test/backend/database/init.sql'
```

### Paso 5: Verificar
```sql
\dt
```
Deberías ver las 3 tablas listadas.

---

## Opción 3: Script PowerShell Automático

He creado un script que puede intentar crear la base de datos automáticamente.

### Ejecutar:
```powershell
.\create-database.ps1
```

**Nota**: Te pedirá la contraseña de PostgreSQL.

---

## ⚠️ Problemas Comunes

### "psql no se reconoce como comando"
- **Solución**: Usa pgAdmin (Opción 1) o SQL Shell (Opción 2)
- O agrega PostgreSQL al PATH de Windows

### "Contraseña incorrecta"
- Asegúrate de usar la contraseña que configuraste al instalar PostgreSQL
- Por defecto el usuario es `postgres`

### "Base de datos ya existe"
Si la base de datos ya existe y quieres empezar de cero:
```sql
DROP DATABASE evaluaciones_orales;
CREATE DATABASE evaluaciones_orales;
```

---

## 📝 Después de Crear la Base de Datos

1. **Edita** el archivo `backend\.env`:
   ```env
   DB_PASSWORD=tu_contraseña_de_postgresql
   ```

2. **Verifica** que las credenciales sean correctas:
   - `DB_HOST=localhost`
   - `DB_PORT=5432`
   - `DB_USER=postgres`
   - `DB_NAME=evaluaciones_orales`

3. **Continúa** con la instalación del proyecto según el README.md

---

## ✅ ¿Funcionó?

Si ves las 3 tablas en pgAdmin, ¡todo está listo! 🎉

Ahora puedes continuar con:
```powershell
cd backend
npm install
npm run dev
```
