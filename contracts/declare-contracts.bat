@echo off
echo 🎯 Declarando contratos con Starknet Foundry...

echo 📋 Declarando PaymentProcessor...
sncast declare --contract-name PaymentProcessor --network sepolia --account 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --private-key 0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892

echo.
echo 📋 Declarando RemesaVault...
sncast declare --contract-name RemesaVault --network sepolia --account 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --private-key 0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892

echo.
echo 📋 Declarando TandaSavings...
sncast declare --contract-name TandaSavings --network sepolia --account 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --private-key 0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892

echo.
echo 🎉 ¡Declaración completada!
echo 📝 Anota los Class Hashes para el despliegue

pause
