import { RpcProvider, Account, CallData, cairo } from "starknet";

// Configuración para Sepolia testnet
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const PRIVATE_KEY = "0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892";

console.log("🎯 Creando cuenta en Sepolia...");
console.log(`🔑 Clave privada: ${PRIVATE_KEY.substring(0, 10)}...`);

const provider = new RpcProvider({ nodeUrl: RPC_URL });

async function createAccount() {
  try {
    console.log("📋 Creando cuenta OpenZeppelin...");
    
    // Usar la cuenta OpenZeppelin pre-compilada en Sepolia
    const accountClassHash = "0x058dde04025ccb7e3b4b6b3c8b3c8b3c8b3c8b3c8b3c8b3c8b3c8b3c8b3c8b3c";
    
    // Calcular la dirección de la cuenta
    const accountAddress = cairo.felt(PRIVATE_KEY);
    
    console.log(`📍 Dirección calculada: ${accountAddress}`);
    
    // Crear cuenta temporal para el despliegue
    const tempAccount = new Account(provider, "0x0", PRIVATE_KEY);
    
    // Desplegar la cuenta
    const deployResponse = await tempAccount.deployAccount({
      classHash: accountClassHash,
      constructorCalldata: CallData.compile({
        public_key: PRIVATE_KEY,
      }),
      addressSalt: PRIVATE_KEY,
    });
    
    console.log(`✅ Cuenta desplegada en: ${deployResponse.contract_address}`);
    console.log(`📋 Hash de transacción: ${deployResponse.transaction_hash}`);
    
    console.log("\n🎉 ¡Cuenta creada exitosamente!");
    console.log(`📍 Dirección: ${deployResponse.contract_address}`);
    console.log("🔧 Ahora puedes usar esta dirección para desplegar contratos");
    
    return deployResponse.contract_address;
    
  } catch (error) {
    console.error("❌ Error creando cuenta:", error);
    console.log("\n🔧 Alternativa más simple:");
    console.log("1. 📱 Instala ArgentX: https://www.argent.xyz/");
    console.log("2. 🔗 Ve a: https://starknet-faucet.vercel.app/");
    console.log("3. 💰 Obtén ETH de prueba");
    console.log("4. 📋 Copia la dirección de tu wallet");
    console.log("5. 🔄 Actualiza el script con la nueva dirección");
    
    return null;
  }
}

// Crear cuenta
createAccount().catch(console.error);
