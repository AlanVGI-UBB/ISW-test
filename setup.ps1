# Script de inicialización del proyecto
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Sistema de Evaluaciones Orales - Setup" -ForegroundColor Cyan
Write-Host "  Stack: PostgreSQL + Express + React + Node" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = "d:\Proyectos\Proyecto ISW test"

# Función para verificar si un comando existe
function Test-Command($command) {
    try {
        if (Get-Command $command -ErrorAction Stop) {
            return $true
        }
    }
    catch {
        return $false
    }
}

# Verificar Node.js
Write-Host "[1/5] Verificando Node.js..." -ForegroundColor Yellow
if (Test-Command "node") {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js instalado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "  ✗ Node.js no encontrado. Por favor instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verificar npm
if (Test-Command "npm") {
    $npmVersion = npm --version
    Write-Host "  ✓ npm instalado: v$npmVersion" -ForegroundColor Green
} else {
    Write-Host "  ✗ npm no encontrado" -ForegroundColor Red
    exit 1
}

# Verificar PostgreSQL
Write-Host ""
Write-Host "[2/5] Verificando PostgreSQL..." -ForegroundColor Yellow
if (Test-Command "psql") {
    $pgVersion = psql --version
    Write-Host "  ✓ PostgreSQL instalado: $pgVersion" -ForegroundColor Green
} else {
    Write-Host "  ⚠ psql no encontrado en PATH" -ForegroundColor Yellow
    Write-Host "  Asegúrate de que PostgreSQL esté instalado y configurado" -ForegroundColor Yellow
}

# Instalar dependencias del backend
Write-Host ""
Write-Host "[3/5] Instalando dependencias del backend..." -ForegroundColor Yellow
Set-Location "$projectRoot\backend"
if (Test-Path "package.json") {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Dependencias del backend instaladas" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Error al instalar dependencias del backend" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "  ✗ No se encontró package.json en backend" -ForegroundColor Red
    exit 1
}

# Instalar dependencias del frontend
Write-Host ""
Write-Host "[4/5] Instalando dependencias del frontend..." -ForegroundColor Yellow
Set-Location "$projectRoot\frontend"
if (Test-Path "package.json") {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Dependencias del frontend instaladas" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Error al instalar dependencias del frontend" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "  ✗ No se encontró package.json en frontend" -ForegroundColor Red
    exit 1
}

# Verificar archivo .env
Write-Host ""
Write-Host "[5/5] Verificando configuración..." -ForegroundColor Yellow
Set-Location "$projectRoot\backend"
if (Test-Path ".env") {
    Write-Host "  ✓ Archivo .env encontrado" -ForegroundColor Green
    Write-Host "  ⚠ Recuerda configurar tus credenciales de PostgreSQL en .env" -ForegroundColor Yellow
} else {
    Write-Host "  ⚠ No se encontró archivo .env" -ForegroundColor Yellow
    Write-Host "  Copiando desde .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "  ✓ Archivo .env creado. Por favor edítalo con tus credenciales" -ForegroundColor Green
    }
}

# Resumen
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  ✓ Instalación completada" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Crear la base de datos PostgreSQL:" -ForegroundColor White
Write-Host "   - Abre pgAdmin" -ForegroundColor Gray
Write-Host "   - Crea una base de datos llamada 'evaluaciones_orales'" -ForegroundColor Gray
Write-Host "   - Ejecuta el script: backend\database\init.sql" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Configurar credenciales:" -ForegroundColor White
Write-Host "   - Edita el archivo: backend\.env" -ForegroundColor Gray
Write-Host "   - Ajusta DB_PASSWORD con tu contraseña de PostgreSQL" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Ejecutar el proyecto:" -ForegroundColor White
Write-Host "   - Terminal 1: cd backend && npm run dev" -ForegroundColor Gray
Write-Host "   - Terminal 2: cd frontend && npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Abrir en el navegador:" -ForegroundColor White
Write-Host "   - http://localhost:5173" -ForegroundColor Gray
Write-Host ""
Write-Host "Para más información, consulta README.md o QUICKSTART.md" -ForegroundColor Cyan
Write-Host ""

Set-Location $projectRoot
