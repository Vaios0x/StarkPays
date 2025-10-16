@echo off
echo 🎯 Desplegando contratos con Starkli...

echo 📋 Declarando PaymentProcessor...
starkli declare target/dev/starkpays_contracts_PaymentProcessor.contract_class.json --rpc https://starknet-sepolia.public.blastapi.io --account 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --private-key 0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892

echo 📋 Declarando RemesaVault...
starkli declare target/dev/starkpays_contracts_RemesaVault.contract_class.json --rpc https://starknet-sepolia.public.blastapi.io --account 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --private-key 0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892

echo 📋 Declarando TandaSavings...
starkli declare target/dev/starkpays_contracts_TandaSavings.contract_class.json --rpc https://starknet-sepolia.public.blastapi.io --account 0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769 --private-key 0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892

echo 🎉 ¡Declaración completada!
echo 🔧 Ahora puedes desplegar las instancias de los contratos

pause
