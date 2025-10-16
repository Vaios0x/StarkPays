#!/bin/bash

echo "🔨 Compilando contratos Starkpays..."

# Limpiar compilaciones anteriores
echo "🧹 Limpiando compilaciones anteriores..."
scarb clean

# Compilar contratos
echo "📦 Compilando contratos..."
scarb build

if [ $? -eq 0 ]; then
    echo "✅ Compilación exitosa"
else
    echo "❌ Error en la compilación"
    exit 1
fi

# Ejecutar pruebas
echo "🧪 Ejecutando pruebas..."
snforge test

if [ $? -eq 0 ]; then
    echo "✅ Todas las pruebas pasaron"
else
    echo "❌ Algunas pruebas fallaron"
    exit 1
fi

echo "🎉 Build y pruebas completados exitosamente"
