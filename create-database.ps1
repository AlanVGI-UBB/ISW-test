# Script para crear la base de datos PostgreSQL
# Sistema de Evaluaciones Orales

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  Creación de Base de Datos PostgreSQL" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

$dbName = "evaluaciones_orales"
$scriptPath = "d:\Proyectos\Proyecto ISW test\backend\database\init.sql"

# Buscar la instalación de PostgreSQL
$pgPaths = @(
    "C:\Program Files\PostgreSQL\16\bin\psql.exe",
    "C:\Program Files\PostgreSQL\15\bin\psql.exe",
    "C:\Program Files\PostgreSQL\14\bin\psql.exe",
    "C:\Program Files\PostgreSQL\13\bin\psql.exe",
    "C:\Program Files (x86)\PostgreSQL\16\bin\psql.exe",
    "C:\Program Files (x86)\PostgreSQL\15\bin\psql.exe"
)

$psqlPath = $null
foreach ($path in $pgPaths) {
    if (Test-Path $path) {
        $psqlPath = $path
        Write-Host "✓ PostgreSQL encontrado en: $path" -ForegroundColor Green
        break
    }
}

if (-not $psqlPath) {
    Write-Host "❌ No se encontró psql.exe automáticamente" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, usa una de estas opciones:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "OPCIÓN 1 - pgAdmin (Recomendado):" -ForegroundColor Cyan
    Write-Host "  1. Abre pgAdmin 4" -ForegroundColor White
    Write-Host "  2. Conecta a PostgreSQL" -ForegroundColor White
    Write-Host "  3. Click derecho en 'Databases' → Create → Database" -ForegroundColor White
    Write-Host "  4. Nombre: evaluaciones_orales" -ForegroundColor White
    Write-Host "  5. Click derecho en la BD → Query Tool" -ForegroundColor White
    Write-Host "  6. Abre el archivo: backend\database\init.sql" -ForegroundColor White
    Write-Host "  7. Ejecuta (F5)" -ForegroundColor White
    Write-Host ""
    Write-Host "OPCIÓN 2 - SQL Shell:" -ForegroundColor Cyan
    Write-Host "  1. Abre 'SQL Shell (psql)' desde el menú inicio" -ForegroundColor White
    Write-Host "  2. Presiona Enter hasta llegar a Password" -ForegroundColor White
    Write-Host "  3. Ingresa tu contraseña de PostgreSQL" -ForegroundColor White
    Write-Host "  4. Ejecuta: CREATE DATABASE evaluaciones_orales;" -ForegroundColor White
    Write-Host "  5. Ejecuta: \c evaluaciones_orales" -ForegroundColor White
    Write-Host "  6. Ejecuta: \i 'd:/Proyectos/Proyecto ISW test/backend/database/init.sql'" -ForegroundColor White
    Write-Host ""
    Write-Host "Consulta DATABASE_SETUP.md para instrucciones detalladas" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Ingresa tus credenciales de PostgreSQL:" -ForegroundColor Yellow
$username = Read-Host "Usuario (presiona Enter para 'postgres')"
if ([string]::IsNullOrWhiteSpace($username)) {
    $username = "postgres"
}

$password = Read-Host "Contraseña" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
)

Write-Host ""
Write-Host "[1/3] Verificando conexión a PostgreSQL..." -ForegroundColor Yellow

# Crear variable de entorno para la contraseña
$env:PGPASSWORD = $passwordPlain

# Verificar conexión
$testConnection = & $psqlPath -U $username -d postgres -c "SELECT 1;" 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al conectar a PostgreSQL" -ForegroundColor Red
    Write-Host "Verifica tu usuario y contraseña" -ForegroundColor Yellow
    $env:PGPASSWORD = $null
    exit 1
}

Write-Host "  ✓ Conexión exitosa" -ForegroundColor Green

Write-Host ""
Write-Host "[2/3] Creando base de datos '$dbName'..." -ForegroundColor Yellow

# Verificar si la base de datos ya existe
$dbExists = & $psqlPath -U $username -d postgres -t -c "SELECT 1 FROM pg_database WHERE datname='$dbName';" 2>&1

if ($dbExists -match "1") {
    Write-Host "  ⚠ La base de datos '$dbName' ya existe" -ForegroundColor Yellow
    $response = Read-Host "¿Deseas recrearla? Esto eliminará todos los datos (s/n)"
    
    if ($response -eq "s" -or $response -eq "S") {
        Write-Host "  Eliminando base de datos existente..." -ForegroundColor Yellow
        & $psqlPath -U $username -d postgres -c "DROP DATABASE $dbName;" 2>&1 | Out-Null
        
        Write-Host "  Creando nueva base de datos..." -ForegroundColor Yellow
        & $psqlPath -U $username -d postgres -c "CREATE DATABASE $dbName;" 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✓ Base de datos recreada" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Error al recrear la base de datos" -ForegroundColor Red
            $env:PGPASSWORD = $null
            exit 1
        }
    } else {
        Write-Host "  Usando base de datos existente" -ForegroundColor White
    }
} else {
    & $psqlPath -U $username -d postgres -c "CREATE DATABASE $dbName;" 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Base de datos '$dbName' creada" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Error al crear la base de datos" -ForegroundColor Red
        $env:PGPASSWORD = $null
        exit 1
    }
}

Write-Host ""
Write-Host "[3/3] Ejecutando script SQL..." -ForegroundColor Yellow

# Ejecutar el script de inicialización
& $psqlPath -U $username -d $dbName -f $scriptPath 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Script ejecutado exitosamente" -ForegroundColor Green
} else {
    Write-Host "  ❌ Error al ejecutar el script" -ForegroundColor Red
    $env:PGPASSWORD = $null
    exit 1
}

# Limpiar la contraseña de la variable de entorno
$env:PGPASSWORD = $null

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  ✓ Base de datos configurada exitosamente" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tablas creadas:" -ForegroundColor Yellow
Write-Host "  • usuarios" -ForegroundColor White
Write-Host "  • password_reset_tokens" -ForegroundColor White
Write-Host "  • sesiones" -ForegroundColor White
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Edita el archivo backend\.env con tu contraseña de PostgreSQL" -ForegroundColor White
Write-Host "2. Ejecuta: cd backend && npm install && npm run dev" -ForegroundColor White
Write-Host "3. Ejecuta en otra terminal: cd frontend && npm install && npm run dev" -ForegroundColor White
Write-Host ""
