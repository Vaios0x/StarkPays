# 💰 Guía para Obtener ETH de Prueba en Sepolia

## 🔗 **Faucets Disponibles**

### **1. Starknet Faucet (Recomendado)**
- **URL**: https://starknet-faucet.vercel.app/
- **Red**: Sepolia
- **Tokens**: ETH, STRK
- **Frecuencia**: Cada 24 horas

### **2. Alchemy Faucet**
- **URL**: https://sepoliafaucet.com/
- **Red**: Sepolia
- **Tokens**: ETH
- **Frecuencia**: Cada 24 horas

### **3. Infura Faucet**
- **URL**: https://www.infura.io/faucet/sepolia
- **Red**: Sepolia
- **Tokens**: ETH
- **Frecuencia**: Cada 24 horas

## 📋 **Pasos para Obtener Fondos**

### **Paso 1: Conectar Wallet**
1. Abre [starknet-faucet.vercel.app](https://starknet-faucet.vercel.app/)
2. Conecta tu wallet (Braavos/ArgentX)
3. Asegúrate de estar en red "Sepolia"

### **Paso 2: Solicitar Fondos**
1. Haz clic en "Request ETH"
2. Espera la confirmación
3. Verifica en tu wallet

### **Paso 3: Verificar Balance**
- Deberías tener ~0.1 ETH
- Suficiente para deployment

## 🔧 **Configurar Variables**

Una vez que tengas fondos, configura tu `.env`:

```bash
# Copia tu clave privada y dirección
STARKNET_PRIVATE_KEY=tu_clave_privada_aqui
STARKNET_ACCOUNT_ADDRESS=tu_direccion_cuenta_aqui
```

## ⚠️ **Notas Importantes**

- **Nunca compartas** tu clave privada
- **Solo usa** en testnet
- **Los fondos** son para pruebas
- **No tienen valor** real
