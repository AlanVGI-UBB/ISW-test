# Script para ejecutar backend y frontend simultaneamente
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Iniciando Sistema de Evaluaciones Orales" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = "d:\Proyectos\Proyecto ISW test"

Write-Host "Iniciando Backend..." -ForegroundColor Yellow
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\backend'; Write-Host 'Backend Server' -ForegroundColor Green; npm run dev" -PassThru

Start-Sleep -Seconds 3

Write-Host "Iniciando Frontend..." -ForegroundColor Yellow
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\frontend'; Write-Host 'Frontend Server' -ForegroundColor Blue; npm run dev" -PassThru

Write-Host ""
Write-Host "Servidores iniciados correctamente" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "Presiona Ctrl+C para detener este script" -ForegroundColor Gray
Write-Host "Para detener los servidores, cierra las ventanas de PowerShell abiertas" -ForegroundColor Gray
Write-Host ""

# Mantener el script corriendo
while ($true) {
    Start-Sleep -Seconds 1
}
