import { RpcProvider, Account, ec } from "starknet";

const RPC_URL = "https://starknet-sepolia.public.blastapi.io";

async function createWallet() {
  console.log("🔑 Creando nueva wallet para Starknet...");
  
  // Generar clave privada y pública
  const privateKey = ec.starkCurve.utils.randomPrivateKey();
  const publicKey = ec.starkCurve.getStarkKey(privateKey);
  
  console.log("📋 Información de tu wallet:");
  console.log(`🔐 Clave Privada: 0x${privateKey.toString(16)}`);
  console.log(`🔑 Clave Pública: 0x${publicKey.toString(16)}`);
  
  // Calcular dirección de la cuenta
  const provider = new RpcProvider({ nodeUrl: RPC_URL });
  const account = new Account(provider, "0x0", privateKey);
  
  // Deploy de la cuenta
  console.log("\n🚀 Desplegando cuenta en testnet...");
  try {
    const deployResponse = await account.deploySelf({
      classHash: "0x057dde83c18c0efe712e3514c24a69bbf6144e527aed3641a405e78a1a7e1df", // OpenZeppelin Account
    });
    
    console.log("✅ Cuenta desplegada exitosamente!");
    console.log(`📍 Dirección de la cuenta: ${deployResponse.contract_address}`);
    console.log(`📋 Hash de transacción: ${deployResponse.transaction_hash}`);
    
    console.log("\n📝 Agrega estas variables a tu archivo .env:");
    console.log(`STARKNET_PRIVATE_KEY=0x${privateKey.toString(16)}`);
    console.log(`STARKNET_ACCOUNT_ADDRESS=${deployResponse.contract_address}`);
    
    console.log("\n💰 Para obtener ETH de prueba:");
    console.log("1. Ve a: https://starknet-faucet.vercel.app/");
    console.log(`2. Ingresa tu dirección: ${deployResponse.contract_address}`);
    console.log("3. Solicita ETH de prueba");
    
  } catch (error) {
    console.error("❌ Error desplegando cuenta:", error);
  }
}

createWallet().catch(console.error);
