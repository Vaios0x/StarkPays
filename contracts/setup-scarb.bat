@echo off
echo 🔧 Configurando Scarb para Starkpays...

set SCARB_PATH=C:\Starkpays\scarb\scarb-v2.12.2-x86_64-pc-windows-msvc\bin\scarb.exe
set SCARB_DIR=C:\Starkpays\scarb\scarb-v2.12.2-x86_64-pc-windows-msvc\bin

if exist "%SCARB_PATH%" (
    echo ✅ Scarb encontrado en: %SCARB_PATH%
    
    echo 🔍 Verificando version de Scarb...
    "%SCARB_PATH%" --version
    
    echo.
    echo 🚀 Intentando compilar contratos...
    cd /d C:\Starkpays\contracts
    "%SCARB_PATH%" build
    
    if %ERRORLEVEL% EQU 0 (
        echo ✅ ¡Contratos compilados exitosamente!
        echo.
        echo 🎯 Proximos pasos:
        echo 1. Ejecutar: npm run deploy
        echo 2. Configurar variables de entorno
        echo 3. Desplegar en Sepolia testnet
    ) else (
        echo ❌ Error al compilar contratos
        echo.
        echo 🔧 Soluciones posibles:
        echo 1. Actualizar Scarb a la version mas reciente
        echo 2. Verificar sintaxis de Cairo
        echo 3. Revisar dependencias
    )
) else (
    echo ❌ Scarb no encontrado en: %SCARB_PATH%
    echo.
    echo 🔧 Soluciones:
    echo 1. Descargar Scarb desde: https://github.com/software-mansion/scarb
    echo 2. Instalar usando: cargo install --locked scarb
    echo 3. O usar el instalador de Windows
)

echo.
echo 📚 Recursos utiles:
echo - Documentacion Cairo: https://book.cairo-lang.org/
echo - Starknet Docs: https://docs.starknet.io/
echo - OpenZeppelin Cairo: https://github.com/OpenZeppelin/cairo-contracts

pause
