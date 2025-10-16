# 🚀 Guía de Deployment - Starkpays Contracts

## Opción 1: Remix IDE (Recomendado)

### Paso 1: Acceder a Remix
1. Ve a [remix.ethereum.org](https://remix.ethereum.org)
2. Activa el plugin "Starknet" en el plugin manager
3. Selecciona "Starknet Sepolia" como red

### Paso 2: Subir Contratos
1. Crea archivos en Remix:
   - `PaymentProcessor.cairo`
   - `RemesaVault.cairo` 
   - `TandaSavings.cairo`

2. Copia el contenido de cada contrato desde:
   - `contracts/src/payment_processor.cairo`
   - `contracts/src/remesa_vault.cairo`
   - `contracts/src/tanda_savings.cairo`

### Paso 3: Compilar
1. Selecciona cada contrato
2. Haz clic en "Compile"
3. Verifica que no hay errores

### Paso 4: Deploy
1. Ve a la pestaña "Deploy & Run"
2. Conecta tu wallet (Braavos, ArgentX)
3. Obtén ETH de prueba desde: https://starknet-faucet.vercel.app/
4. Deploy cada contrato con los parámetros:
   - **PaymentProcessor**: `owner_address, fee_collector_address, 50`
   - **RemesaVault**: `owner_address, fee_collector_address, 50`
   - **TandaSavings**: `owner_address`

## Opción 2: Starknet Playground

### Paso 1: Acceder
1. Ve a [playground.starknet.io](https://playground.starknet.io)
2. Conecta tu wallet

### Paso 2: Compilar y Deploy
1. Pega el código de cada contrato
2. Compila
3. Deploy a testnet

## Opción 3: Usando Starknet CLI

### Instalación
```bash
# Instalar Python 3.8+
# Crear entorno virtual
python3.8 -m venv ~/cairo_venv
source ~/cairo_venv/bin/activate
pip3 install cairo-lang
```

### Configuración
```bash
export STARKNET_NETWORK=sepolia
export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount
```

### Compilar
```bash
starknet-compile payment_processor.cairo --output payment_processor.json --abi payment_processor_abi.json
starknet-compile remesa_vault.cairo --output remesa_vault.json --abi remesa_vault_abi.json
starknet-compile tanda_savings.cairo --output tanda_savings.json --abi tanda_savings_abi.json
```

### Deploy
```bash
starknet deploy --contract payment_processor.json
starknet deploy --contract remesa_vault.json
starknet deploy --contract tanda_savings.json
```

## 🔧 Configuración Post-Deploy

### 1. Agregar Tokens Soportados
```bash
# Para PaymentProcessor y RemesaVault
starknet invoke --contract CONTRACT_ADDRESS --function add_supported_token --inputs TOKEN_ADDRESS
```

### 2. Verificar Deployment
- **Explorador**: [starkscan.io](https://starkscan.io)
- **Testnet**: Sepolia
- **Tokens de prueba**: ETH, USDC

## 📋 Checklist de Deployment

- [ ] Contratos compilados sin errores
- [ ] Wallet conectada con fondos de prueba
- [ ] Contratos desplegados en testnet
- [ ] Direcciones guardadas en configuración
- [ ] Tokens soportados configurados
- [ ] Funciones básicas probadas

## 🎯 Próximos Pasos

1. **Integrar con Frontend**: Usar las direcciones de los contratos en tu app
2. **Configurar Variables**: Agregar las direcciones a tu `.env`
3. **Probar Funciones**: Ejecutar transacciones de prueba
4. **Deploy a Mainnet**: Una vez probado en testnet

## 📞 Soporte

- **Documentación**: [docs.starknet.io](https://docs.starknet.io)
- **Comunidad**: [Starknet Discord](https://discord.gg/starknet)
- **Explorador**: [Starkscan.io](https://starkscan.io)
