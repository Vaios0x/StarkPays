import { RpcProvider, Account } from "starknet";

// Configuración para Sepolia testnet
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const PRIVATE_KEY = "0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892";
const ACCOUNT_ADDRESS = "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769";

console.log("🎯 Verificando balance ETH en Sepolia...");
console.log(`💰 Cuenta: ${ACCOUNT_ADDRESS}`);

const provider = new RpcProvider({ nodeUrl: RPC_URL });

async function checkETHBalance() {
  try {
    console.log("🔍 Verificando balance ETH...");
    
    const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);
    
    // Verificar si la cuenta existe
    try {
      const nonce = await account.getNonce();
      console.log(`✅ Cuenta encontrada. Nonce: ${nonce}`);
      
      // Verificar balance ETH
      const balance = await provider.getBalance(ACCOUNT_ADDRESS);
      const balanceETH = Number(balance) / 1e18;
      
      console.log(`💰 Balance ETH: ${balance} wei (${balanceETH} ETH)`);
      
      if (balance === 0n) {
        console.log("\n❌ PROBLEMA IDENTIFICADO:");
        console.log("🔍 Tienes 150 STRK pero NO tienes ETH");
        console.log("💡 En Starknet necesitas ETH para pagar gas fees");
        
        console.log("\n🚀 SOLUCIÓN:");
        console.log("1. 🔗 Ve a: https://starknet-faucet.vercel.app/");
        console.log("2. 📱 Conecta tu wallet ArgentX");
        console.log("3. 💰 Solicita ETH de prueba (no STRK)");
        console.log("4. ⏳ Espera a que lleguen los fondos");
        console.log("5. 🔄 Ejecuta el despliegue nuevamente");
        
        return false;
      } else {
        console.log("✅ Tienes ETH suficiente para desplegar contratos");
        return true;
      }
      
    } catch (error) {
      console.log("❌ La cuenta no existe en Sepolia");
      console.log("🔧 Necesitas obtener ETH de prueba primero");
      return false;
    }
    
  } catch (error) {
    console.error("❌ Error verificando balance:", error);
    return false;
  }
}

// Verificar balance ETH
checkETHBalance().catch(console.error);
