import { RpcProvider, Account } from "starknet";

// Configuración para Sepolia testnet
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const PRIVATE_KEY = "0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892";
const ACCOUNT_ADDRESS = "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769";

console.log("🎯 Verificando cuenta ArgentX en Sepolia...");
console.log(`💰 Cuenta: ${ACCOUNT_ADDRESS}`);
console.log(`🔑 Clave privada: ${PRIVATE_KEY.substring(0, 10)}...`);

const provider = new RpcProvider({ nodeUrl: RPC_URL });

async function checkArgentXAccount() {
  try {
    console.log("🔍 Verificando cuenta ArgentX...");
    
    const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);
    
    // Verificar si la cuenta existe
    try {
      const nonce = await account.getNonce();
      console.log(`✅ Cuenta ArgentX encontrada. Nonce: ${nonce}`);
      
      // Verificar balance
      try {
        const balance = await provider.getBalance(ACCOUNT_ADDRESS);
        console.log(`💰 Balance: ${balance} wei (${Number(balance) / 1e18} ETH)`);
        
        if (balance === 0n) {
          console.log("\n⚠️  Cuenta sin fondos. Necesitas obtener ETH de prueba:");
          console.log("🔗 Ve a: https://starknet-faucet.vercel.app/");
          console.log("📱 Conecta tu wallet ArgentX");
          console.log("💰 Solicita ETH de prueba");
          return false;
        } else {
          console.log("✅ Cuenta con fondos suficientes");
          return true;
        }
      } catch (balanceError) {
        console.log("⚠️  No se pudo verificar el balance, pero la cuenta existe");
        return true;
      }
      
    } catch (nonceError) {
      console.log("❌ La cuenta no existe en Sepolia");
      console.log("\n🔧 Soluciones:");
      console.log("1. 📱 Abre ArgentX y cambia a Sepolia testnet");
      console.log("2. 🔗 Ve a: https://starknet-faucet.vercel.app/");
      console.log("3. 💰 Obtén ETH de prueba");
      console.log("4. 🔄 Verifica que estés en Sepolia testnet");
      return false;
    }
    
  } catch (error) {
    console.error("❌ Error verificando cuenta:", error);
    return false;
  }
}

// Verificar cuenta ArgentX
checkArgentXAccount().catch(console.error);
