# Contratos Starkpays

Sistema de contratos inteligentes para pagos, remesas y tandas en Starknet.

## 🏗️ Arquitectura

### Contratos Principales

1. **PaymentProcessor** - Procesamiento de pagos con merchants
2. **RemesaVault** - Sistema de remesas con protección familiar y detección de fraude
3. **TandaSavings** - Sistema de tandas (círculos de ahorro)

## 🚀 Despliegue en Testnet

### Prerrequisitos

```bash
# Instalar Scarb
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

# Instalar Starknet Foundry
curl -L https://raw.githubusercontent.com/foundry-rs/starknet-foundry/master/scripts/install.sh | sh
```

### Configuración

1. Copia el archivo de ejemplo:
```bash
cp env.example .env
```

2. Configura tus variables de entorno:
```bash
# Edita .env con tus credenciales
STARKNET_PRIVATE_KEY=tu_clave_privada
STARKNET_ACCOUNT_ADDRESS=tu_direccion_cuenta
```

### Compilación y Pruebas

```bash
# Compilar contratos
scarb build

# Ejecutar pruebas
snforge test

# O usar el script automatizado
./scripts/build_and_test.sh
```

### Despliegue

```bash
# Instalar dependencias de Node.js
npm install

# Desplegar contratos
npm run deploy
```

## 📋 Funcionalidades

### PaymentProcessor
- ✅ Procesamiento de pagos con merchants
- ✅ Sistema de fees configurable
- ✅ Tracking de estadísticas
- ✅ Soporte para múltiples tokens ERC20
- ✅ Protección contra reentrancy

### RemesaVault
- ✅ Transferencias seguras con IA
- ✅ Protección familiar (códigos de emergencia)
- ✅ Detección de fraude con scoring
- ✅ Sistema de fees
- ✅ Tracking de transferencias

### TandaSavings
- ✅ Creación de tandas
- ✅ Sistema de contribuciones
- ✅ Distribución automática de pagos
- ✅ Gestión de miembros
- ✅ Tracking de rondas

## 🔒 Seguridad

- **OpenZeppelin**: Componentes de seguridad probados
- **ReentrancyGuard**: Protección contra ataques de reentrancy
- **Pausable**: Capacidad de pausar contratos en emergencias
- **Ownable**: Control de acceso administrativo
- **Validaciones**: Validaciones robustas en todas las funciones

## 🧪 Testing

```bash
# Ejecutar todas las pruebas
snforge test

# Ejecutar pruebas específicas
snforge test --package starkpays_contracts --test test_payment_processor

# Con cobertura
snforge test --coverage
```

## 📊 Gas Optimization

- Uso eficiente de storage
- Optimización de loops
- Minimización de operaciones costosas
- Uso de eventos para tracking

## 🌐 Redes Soportadas

- **Sepolia Testnet**: `https://starknet-sepolia.public.blastapi.io`
- **Mainnet**: Configuración disponible

## 📝 Eventos

Cada contrato emite eventos detallados para tracking:

- `PaymentProcessed`: Pagos procesados
- `TransferInitiated`: Transferencias iniciadas
- `TandaCreated`: Tandas creadas
- `FraudDetected`: Detección de fraude
- Y muchos más...

## 🔧 Administración

### Funciones de Admin
- `register_merchant()`: Registrar merchants
- `add_supported_token()`: Agregar tokens soportados
- `update_platform_fee()`: Actualizar fees
- `pause()`: Pausar contratos

### View Functions
- `get_stats()`: Estadísticas globales
- `get_payment()`: Detalles de pagos
- `is_merchant_supported()`: Verificar merchants
- Y más...

## 📞 Soporte

Para soporte técnico o preguntas sobre los contratos, contacta al equipo de desarrollo.
