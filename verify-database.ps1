# Script para verificar la base de datos
Write-Host "Verificando base de datos PostgreSQL..." -ForegroundColor Yellow
Write-Host ""

$dbName = "proyecto_isw_bd"
$username = "postgres"
$password = "Biblioteca11224"

# Buscar psql
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
        break
    }
}

if (-not $psqlPath) {
    Write-Host "No se encontro psql.exe. Verifica manualmente en pgAdmin:" -ForegroundColor Red
    Write-Host "1. Abre pgAdmin" -ForegroundColor Yellow
    Write-Host "2. Busca la base de datos 'proyecto_isw_bd'" -ForegroundColor Yellow
    Write-Host "3. Si no existe, creala y ejecuta el script init.sql" -ForegroundColor Yellow
    exit 1
}

# Configurar password
$env:PGPASSWORD = $password

Write-Host "Buscando base de datos '$dbName'..." -ForegroundColor Cyan

# Verificar si existe
$result = & $psqlPath -U $username -d postgres -t -c "SELECT datname FROM pg_database WHERE datname='$dbName';" 2>&1

if ($result -match $dbName) {
    Write-Host "Base de datos encontrada" -ForegroundColor Green
    Write-Host ""
    
    # Verificar tablas
    Write-Host "Verificando tablas..." -ForegroundColor Cyan
    $tables = & $psqlPath -U $username -d $dbName -t -c "SELECT tablename FROM pg_tables WHERE schemaname='public';" 2>&1
    
    if ($tables) {
        Write-Host "Tablas encontradas:" -ForegroundColor Green
        Write-Host $tables
    } else {
        Write-Host "No hay tablas. Ejecuta el script SQL:" -ForegroundColor Yellow
        Write-Host "psql -U postgres -d $dbName -f backend\database\init.sql" -ForegroundColor White
    }
} else {
    Write-Host "Base de datos NO encontrada" -ForegroundColor Red
    Write-Host ""
    Write-Host "Opciones:" -ForegroundColor Yellow
    Write-Host "1. Crear con pgAdmin y ejecutar backend\database\init.sql" -ForegroundColor White
    Write-Host "2. Ejecutar: .\create-database.ps1" -ForegroundColor White
}

$env:PGPASSWORD = $null
