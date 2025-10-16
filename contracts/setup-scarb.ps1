# Script para configurar Scarb en Windows
Write-Host "🔧 Configurando Scarb para Starkpays..." -ForegroundColor Green

# Verificar si Scarb ya está en el PATH
$scarbPath = "C:\Starkpays\scarb\scarb-v2.12.2-x86_64-pc-windows-msvc\bin\scarb.exe"
$scarbDir = "C:\Starkpays\scarb\scarb-v2.12.2-x86_64-pc-windows-msvc\bin"

if (Test-Path $scarbPath) {
    Write-Host "✅ Scarb encontrado en: $scarbPath" -ForegroundColor Green
    
    # Agregar al PATH temporalmente
    $env:PATH += ";$scarbDir"
    Write-Host "📝 Scarb agregado al PATH de esta sesión" -ForegroundColor Yellow
    
    # Verificar versión
    Write-Host "🔍 Verificando versión de Scarb..." -ForegroundColor Blue
    & $scarbPath --version
    
    Write-Host "`n🚀 Intentando compilar contratos..." -ForegroundColor Blue
    Set-Location "C:\Starkpays\contracts"
    & $scarbPath build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ ¡Contratos compilados exitosamente!" -ForegroundColor Green
        Write-Host "`n🎯 Próximos pasos:" -ForegroundColor Cyan
        Write-Host "1. Ejecutar: npm run deploy" -ForegroundColor White
        Write-Host "2. Configurar variables de entorno" -ForegroundColor White
        Write-Host "3. Desplegar en Sepolia testnet" -ForegroundColor White
    } else {
        Write-Host "❌ Error al compilar contratos" -ForegroundColor Red
        Write-Host "`n🔧 Soluciones posibles:" -ForegroundColor Yellow
        Write-Host "1. Actualizar Scarb a la versión más reciente" -ForegroundColor White
        Write-Host "2. Verificar sintaxis de Cairo" -ForegroundColor White
        Write-Host "3. Revisar dependencias" -ForegroundColor White
    }
} else {
    Write-Host "❌ Scarb no encontrado en: $scarbPath" -ForegroundColor Red
    Write-Host "`n🔧 Soluciones:" -ForegroundColor Yellow
    Write-Host "1. Descargar Scarb desde: https://github.com/software-mansion/scarb" -ForegroundColor White
    Write-Host "2. Instalar usando: cargo install --locked scarb" -ForegroundColor White
    Write-Host "3. O usar el instalador de Windows" -ForegroundColor White
}

Write-Host "`n📚 Recursos útiles:" -ForegroundColor Cyan
Write-Host "- Documentación Cairo: https://book.cairo-lang.org/" -ForegroundColor White
Write-Host "- Starknet Docs: https://docs.starknet.io/" -ForegroundColor White
Write-Host "- OpenZeppelin Cairo: https://github.com/OpenZeppelin/cairo-contracts" -ForegroundColor White
