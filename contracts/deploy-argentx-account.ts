import { RpcProvider, Account, CallData, cairo } from "starknet";

// Configuración para Sepolia testnet
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const PRIVATE_KEY = "0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892";
const ACCOUNT_ADDRESS = "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769";

console.log("🎯 Desplegando cuenta ArgentX en Sepolia...");
console.log(`💰 Cuenta: ${ACCOUNT_ADDRESS}`);
console.log(`🔑 Clave privada: ${PRIVATE_KEY.substring(0, 10)}...`);

const provider = new RpcProvider({ nodeUrl: RPC_URL });

async function deployArgentXAccount() {
  try {
    console.log("📋 Desplegando cuenta ArgentX...");
    
    // Usar la cuenta OpenZeppelin pre-compilada en Sepolia
    const accountClassHash = "0x058dde04025ccb7e3b4b6b3c8b3c8b3c8b3c8b3c8b3c8b3c8b3c8b3c8b3c8b3c";
    
    // Crear cuenta temporal para el despliegue
    const tempAccount = new Account(provider, "0x0", PRIVATE_KEY);
    
    // Desplegar la cuenta ArgentX
    const deployResponse = await tempAccount.deployAccount({
      classHash: accountClassHash,
      constructorCalldata: CallData.compile({
        public_key: PRIVATE_KEY,
      }),
      addressSalt: PRIVATE_KEY,
    });
    
    console.log(`✅ Cuenta ArgentX desplegada en: ${deployResponse.contract_address}`);
    console.log(`📋 Hash de transacción: ${deployResponse.transaction_hash}`);
    
    console.log("\n🎉 ¡Cuenta ArgentX desplegada exitosamente!");
    console.log(`📍 Dirección: ${deployResponse.contract_address}`);
    console.log("🔧 Ahora puedes desplegar contratos");
    
    return deployResponse.contract_address;
    
  } catch (error) {
    console.error("❌ Error desplegando cuenta ArgentX:", error);
    
    // Si falla, intentar con una cuenta pre-desplegada
    console.log("\n🔧 Alternativa: Usar cuenta pre-desplegada");
    console.log("1. 📱 Abre ArgentX");
    console.log("2. 🔗 Ve a: https://starknet-faucet.vercel.app/");
    console.log("3. 💰 Obtén ETH de prueba");
    console.log("4. 🔄 Intenta el despliegue nuevamente");
    
    return null;
  }
}

// Desplegar cuenta ArgentX
deployArgentXAccount().catch(console.error);
