@echo off
echo 🎯 Desplegando contratos completos con Starknet Foundry...

echo 📋 Paso 1: Declarando PaymentProcessor...
sncast declare --contract-name PaymentProcessor --network sepolia --account 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --private-key 0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892

echo.
echo 📋 Paso 2: Declarando RemesaVault...
sncast declare --contract-name RemesaVault --network sepolia --account 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --private-key 0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892

echo.
echo 📋 Paso 3: Declarando TandaSavings...
sncast declare --contract-name TandaSavings --network sepolia --account 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --private-key 0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892

echo.
echo 🚀 Paso 4: Desplegando instancias de contratos...
echo 💳 Desplegando PaymentProcessor...
sncast deploy --class-hash [CLASS_HASH_PAYMENT_PROCESSOR] --constructor-calldata 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --network sepolia --account 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --private-key 0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892

echo.
echo 🏦 Desplegando RemesaVault...
sncast deploy --class-hash [CLASS_HASH_REMESA_VAULT] --constructor-calldata 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 50 --network sepolia --account 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --private-key 0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892

echo.
echo 💰 Desplegando TandaSavings...
sncast deploy --class-hash [CLASS_HASH_TANDA_SAVINGS] --constructor-calldata 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --network sepolia --account 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --private-key 0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892

echo.
echo 🎉 ¡Deployment completado!
echo 🔧 Reemplaza [CLASS_HASH_*] con los hashes obtenidos de la declaración

pause
