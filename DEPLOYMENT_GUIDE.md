# 🚀 Guía de Despliegue - Starkpays

Guía completa para desplegar los contratos de Starkpays en testnet y conectarlos con el frontend.

## 📋 Prerrequisitos

### 1. Herramientas de Desarrollo
```bash
# Instalar Scarb (compilador de Cairo)
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

# Instalar Starknet Foundry
curl -L https://raw.githubusercontent.com/foundry-rs/starknet-foundry/master/scripts/install.sh | sh

# Verificar instalaciones
scarb --version
snforge --version
```

### 2. Configuración de Wallet
```bash
# Crear cuenta en testnet
# Usar Braavos, ArgentX, o cualquier wallet compatible
# Obtener private key y account address
```

## 🔧 Configuración

### 1. Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp contracts/env.example contracts/.env

# Editar con tus credenciales
STARKNET_PRIVATE_KEY=tu_clave_privada_aqui
STARKNET_ACCOUNT_ADDRESS=tu_direccion_cuenta_aqui
```

### 2. Instalar Dependencias
```bash
# Instalar dependencias de contratos
cd contracts
npm install

# Instalar dependencias del proyecto principal
cd ..
npm install
```

## 🏗️ Compilación y Pruebas

### 1. Compilar Contratos
```bash
# Compilar todos los contratos
npm run cairo:build

# O manualmente
cd contracts
scarb build
```

### 2. Ejecutar Pruebas
```bash
# Ejecutar todas las pruebas
npm run cairo:test

# O manualmente
cd contracts
snforge test
```

## 🚀 Despliegue

### 1. Desplegar en Testnet
```bash
# Desplegar todos los contratos
npm run cairo:deploy

# O manualmente
cd contracts
npm run deploy
```

### 2. Verificar Despliegue
```bash
# Verificar que los contratos funcionan
npm run cairo:verify
```

## 🔗 Integración con Frontend

### 1. Actualizar Direcciones de Contratos
Después del despliegue, actualiza el archivo `lib/starknet/contracts.ts`:

```typescript
export const CONTRACT_ADDRESSES = {
  sepolia: {
    PaymentProcessor: "0xTU_DIRECCION_AQUI",
    RemesaVault: "0xTU_DIRECCION_AQUI", 
    TandaSavings: "0xTU_DIRECCION_AQUI",
  },
};
```

### 2. Configurar Red en Frontend
El frontend ya está configurado para usar testnet por defecto. Para cambiar a mainnet:

```typescript
// En lib/starknet/contracts.ts
export function getCurrentNetworkConfig() {
  return "mainnet"; // Cambiar de "sepolia" a "mainnet"
}
```

## 📊 Funcionalidades Disponibles

### PaymentProcessor
- ✅ Procesamiento de pagos con merchants
- ✅ Sistema de fees (0.5% por defecto)
- ✅ Soporte para tokens ERC20
- ✅ Tracking de estadísticas

### RemesaVault  
- ✅ Transferencias seguras con IA
- ✅ Protección familiar
- ✅ Detección de fraude
- ✅ Códigos de emergencia

### TandaSavings
- ✅ Creación de tandas
- ✅ Sistema de contribuciones
- ✅ Distribución automática
- ✅ Gestión de miembros

## 🧪 Testing del Sistema Completo

### 1. Probar PaymentProcessor
```typescript
import { usePaymentProcessor } from "@/features/contracts/hooks/use-contracts";

const { processPayment } = usePaymentProcessor();

// Procesar pago
await processPayment(
  "0xmerchant_address",
  "1000000000000000000", // 1 ETH en wei
  "0xtoken_address"
);
```

### 2. Probar RemesaVault
```typescript
import { useRemesaVault } from "@/features/contracts/hooks/use-contracts";

const { initiateTransfer } = useRemesaVault();

// Iniciar transferencia
await initiateTransfer(
  "0xrecipient_address",
  "1000000000000000000",
  "0xtoken_address", 
  25 // AI score (0-100)
);
```

### 3. Probar TandaSavings
```typescript
import { useTandaSavings } from "@/features/contracts/hooks/use-contracts";

const { createTanda } = useTandaSavings();

// Crear tanda
await createTanda(
  "Mi Tanda",
  "Tanda familiar",
  "1000000000000000000", // 1 ETH
  "7", // 7 días
  "5", // 5 miembros
  "0xtoken_address"
);
```

## 🔒 Seguridad

### Validaciones Implementadas
- ✅ Protección contra reentrancy
- ✅ Validación de montos
- ✅ Verificación de tokens soportados
- ✅ Control de acceso (Ownable)
- ✅ Capacidad de pausa (Pausable)

### Mejores Prácticas
- ✅ Uso de OpenZeppelin
- ✅ Eventos para tracking
- ✅ Optimización de gas
- ✅ Manejo de errores robusto

## 📈 Monitoreo

### Eventos Importantes
- `PaymentProcessed`: Pagos exitosos
- `TransferInitiated`: Transferencias iniciadas
- `TandaCreated`: Tandas creadas
- `FraudDetected`: Detección de fraude

### Métricas Disponibles
- Volumen total procesado
- Número de transacciones
- Fees recaudados
- Estadísticas por merchant

## 🆘 Solución de Problemas

### Error: "Contract not found"
```bash
# Verificar que el contrato esté desplegado
npm run cairo:verify

# Re-desplegar si es necesario
npm run cairo:deploy
```

### Error: "Insufficient funds"
```bash
# Verificar balance en testnet
# Obtener ETH de testnet faucet
```

### Error: "Token not supported"
```bash
# Agregar token soportado
# Usar función add_supported_token en el contrato
```

## 🎯 Próximos Pasos

1. **Desplegar en Mainnet**: Cuando esté listo para producción
2. **Optimizar Gas**: Ajustar parámetros para reducir costos
3. **Auditoría**: Realizar auditoría de seguridad
4. **Monitoreo**: Implementar sistema de monitoreo en producción

## 📞 Soporte

Para soporte técnico o preguntas sobre el despliegue, contacta al equipo de desarrollo.

---

¡Tu sistema Starkpays está listo para funcionar en testnet! 🎉
