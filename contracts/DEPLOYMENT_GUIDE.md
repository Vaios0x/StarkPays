# 🚀 Guía de Despliegue de Contratos Starkpays

## ✅ Estado Actual
- **Cuenta activa**: ✅ Nonce 0x1
- **ETH disponible**: ✅ 0.036 ETH
- **Red**: ✅ Sepolia
- **Contratos compilados**: ✅ Listos

## 🎯 Opciones de Despliegue

### **Opción 1: Remix IDE (Recomendado)**
1. **Ve a**: https://remix.ethereum.org/
2. **Conecta tu wallet ArgentX**
3. **Cambia a red Sepolia**
4. **Sube los archivos compilados**:
   - `target/dev/starkpays_contracts_PaymentProcessor.contract_class.json`
   - `target/dev/starkpays_contracts_RemesaVault.contract_class.json`
   - `target/dev/starkpays_contracts_TandaSavings.contract_class.json`
5. **Despliega desde la interfaz**

### **Opción 2: Starkscan**
1. **Ve a**: https://sepolia.starkscan.co/
2. **Conecta tu wallet ArgentX**
3. **Usa la herramienta de deploy**
4. **Sube los archivos compilados**

### **Opción 3: Starkli (Si tienes Visual Studio)**
```bash
# Instalar Visual Studio Build Tools primero
# Luego:
cargo install --git https://github.com/foundry-rs/starknet-foundry sncast
```

## 📋 Contratos a Desplegar

### **1. PaymentProcessor**
- **Constructor**: `owner` (tu dirección)
- **Función**: Procesar pagos

### **2. RemesaVault**
- **Constructor**: `owner`, `fee_collector`, `platform_fee_bps`
- **Valores**: Tu dirección, tu dirección, 50 (0.5%)

### **3. TandaSavings**
- **Constructor**: `owner` (tu dirección)
- **Función**: Sistema de tandas

## 🔧 Configuración de Constructor

```javascript
// PaymentProcessor
owner: "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769"

// RemesaVault
owner: "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769"
fee_collector: "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769"
platform_fee_bps: 50

// TandaSavings
owner: "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769"
```

## 🎉 Próximos Pasos

1. **Desplegar contratos** usando Remix IDE
2. **Anotar direcciones** de los contratos desplegados
3. **Verificar en Starkscan**
4. **Integrar en el frontend**

## 🔗 Enlaces Útiles

- **Remix IDE**: https://remix.ethereum.org/
- **Starkscan**: https://sepolia.starkscan.co/
- **Tu cuenta**: https://sepolia.starkscan.co/account/0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769