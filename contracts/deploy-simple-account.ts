import { RpcProvider, Account } from "starknet";

// Configuración para Sepolia testnet
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const PRIVATE_KEY = "0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892";
const ACCOUNT_ADDRESS = "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769";

console.log("🎯 Verificando cuenta en Sepolia...");
console.log(`💰 Cuenta: ${ACCOUNT_ADDRESS}`);
console.log(`🔑 Clave privada: ${PRIVATE_KEY.substring(0, 10)}...`);

const provider = new RpcProvider({ nodeUrl: RPC_URL });

async function verifyAccount() {
  try {
    console.log("🔍 Verificando si la cuenta existe...");
    
    // Intentar obtener el nonce de la cuenta
    const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);
    const nonce = await account.getNonce();
    
    console.log(`✅ Cuenta verificada. Nonce: ${nonce}`);
    console.log("🎉 La cuenta está lista para usar");
    
    return true;
    
  } catch (error) {
    console.error("❌ Error verificando cuenta:", error);
    console.log("\n🔧 La cuenta no existe en Sepolia. Opciones:");
    console.log("1. 📱 Usar una wallet como ArgentX o Braavos");
    console.log("2. 🔗 Conectar a: https://starknet-faucet.vercel.app/");
    console.log("3. 💰 Obtener ETH de prueba");
    console.log("4. 🔄 Usar la dirección de tu wallet");
    
    return false;
  }
}

// Verificar cuenta
verifyAccount().catch(console.error);
