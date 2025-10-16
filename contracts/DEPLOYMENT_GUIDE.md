# 🚀 Guía de Deployment - Starkpays Contracts

## 📋 **Resumen de Contratos**

Tienes 3 contratos listos para deployment:
- **PaymentProcessor**: Procesamiento de pagos con comisiones
- **RemesaVault**: Transferencias familiares con IA
- **TandaSavings**: Sistema de tandas/roscas

## 🔧 **Opción 1: Deployment Local con Devnet (Recomendado para desarrollo)**

### Paso 1: Instalar Starknet Devnet
```bash
# En Windows con WSL2 o PowerShell
pip install starknet-devnet
```

### Paso 2: Iniciar Devnet
```bash
starknet-devnet --seed=0
```

### Paso 3: Compilar Contratos
```bash
cd contracts
scarb build
```

### Paso 4: Deploy con Script
```bash
npx tsx deploy-local.ts
```

## 🌐 **Opción 2: Deployment en Sepolia Testnet (Recomendado para pruebas)**

### Paso 1: Crear Cuenta en Sepolia

#### A. Usando Wallet (Braavos/ArgentX)
1. Instala [Braavos Wallet](https://braavos.app/) o [ArgentX](https://www.argent.xyz/)
2. Crea una nueva cuenta
3. Cambia a red "Sepolia"
4. Obtén ETH de prueba en: https://starknet-faucet.vercel.app/

#### B. Usando Script
```bash
cd contracts
npx tsx setup-wallet.ts
```

### Paso 2: Configurar Variables de Entorno
```bash
# Copia el archivo de ejemplo
cp env.sepolia.example .env

# Edita .env con tus datos
STARKNET_PRIVATE_KEY=tu_clave_privada
STARKNET_ACCOUNT_ADDRESS=tu_direccion_cuenta
```

### Paso 3: Compilar Contratos
```bash
scarb build
```

### Paso 4: Deploy Real
```bash
npx tsx deploy-real.ts
```

## 🎯 **Opción 3: Deployment con Remix IDE (Más Fácil)**

### Paso 1: Acceder a Remix
1. Ve a [remix.ethereum.org](https://remix.ethereum.org)
2. Activa el plugin "Starknet"
3. Selecciona "Starknet Sepolia"

### Paso 2: Subir Contratos
1. Crea archivos en Remix:
   - `PaymentProcessor.cairo`
   - `RemesaVault.cairo`
   - `TandaSavings.cairo`

2. Copia el contenido desde:
   - `contracts/src/payment_processor.cairo`
   - `contracts/src/remesa_vault.cairo`
   - `contracts/src/tanda_savings.cairo`

### Paso 3: Compilar y Deploy
1. Compila cada contrato
2. Conecta tu wallet
3. Deploy con parámetros:
   - **PaymentProcessor**: `owner_address`
   - **RemesaVault**: `owner_address, fee_collector_address, 50`
   - **TandaSavings**: `owner_address`

## 📋 **Parámetros de Deploy**

### **PaymentProcessor**
```cairo
constructor(owner: ContractAddress)
```

### **RemesaVault**
```cairo
constructor(
    owner: ContractAddress,
    fee_collector: ContractAddress,
    platform_fee_bps: u256
)
```

### **TandaSavings**
```cairo
constructor(owner: ContractAddress)
```

## 🔧 **Configuración Post-Deploy**

### 1. Agregar Tokens Soportados
```bash
# Para PaymentProcessor y RemesaVault
starknet invoke \
    --contract-address CONTRACT_ADDRESS \
    --function add_supported_token \
    --inputs TOKEN_ADDRESS
```

### 2. Verificar Deployment
- **Explorador**: [starkscan.io](https://starkscan.io)
- **Testnet**: Sepolia
- **Tokens**: ETH, USDC

## 📊 **Checklist de Deployment**

- [ ] Contratos compilados sin errores
- [ ] Wallet conectada con fondos
- [ ] Contratos desplegados
- [ ] Direcciones guardadas en configuración
- [ ] Tokens soportados configurados
- [ ] Funciones básicas probadas

## 🎯 **Próximos Pasos**

1. **Integrar con Frontend**: Usar las direcciones en tu app
2. **Configurar Variables**: Agregar direcciones a `.env`
3. **Probar Funciones**: Ejecutar transacciones de prueba
4. **Deploy a Mainnet**: Una vez probado

## 📞 **Soporte**

- **Documentación**: [docs.starknet.io](https://docs.starknet.io)
- **Comunidad**: [Starknet Discord](https://discord.gg/starknet)
- **Explorador**: [Starkscan.io](https://starkscan.io)
- **Faucet**: [starknet-faucet.vercel.app](https://starknet-faucet.vercel.app)

## 🚀 **Comandos Rápidos**

```bash
# Compilar
scarb build

# Deploy local
npx tsx deploy-local.ts

# Deploy real (necesita .env configurado)
npx tsx deploy-real.ts

# Setup wallet
npx tsx setup-wallet.ts
```
