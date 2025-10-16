import { RpcProvider, Account, CallData, cairo } from "starknet";
import fs from "fs";
import path from "path";

// Configuración para Sepolia testnet
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const PRIVATE_KEY = "0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892";

console.log("🎯 Desplegando cuenta en Sepolia...");
console.log(`🔑 Clave privada: ${PRIVATE_KEY.substring(0, 10)}...`);

const provider = new RpcProvider({ nodeUrl: RPC_URL });

async function deployAccount() {
  try {
    console.log("📋 Desplegando cuenta OpenZeppelin...");
    
    // Usar la cuenta OpenZeppelin pre-compilada
    const accountClassHash = "0x058dde04025ccb7e3b4b6b3c8b3c8b3c8b3c8b3c8b3c8b3c8b3c8b3c8b3c8b3c";
    
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
    
    // Guardar configuración
    const config = {
      network: "sepolia",
      rpcUrl: RPC_URL,
      account: {
        address: deployResponse.contract_address,
        privateKey: PRIVATE_KEY.substring(0, 10) + "...",
        classHash: accountClassHash,
      },
      deployment: {
        status: "account_deployed",
        timestamp: new Date().toISOString(),
      },
    };
    
    fs.writeFileSync(
      path.join(__dirname, "account-deployed.json"),
      JSON.stringify(config, null, 2)
    );
    
    console.log("\n🎉 ¡Cuenta desplegada exitosamente!");
    console.log(`📍 Dirección de cuenta: ${deployResponse.contract_address}`);
    console.log("📄 Configuración guardada en: account-deployed.json");
    
    console.log("\n🔧 Próximos pasos:");
    console.log("1. ✅ Cuenta desplegada");
    console.log("2. 🔧 Actualizar deploy-optimized.ts con la nueva dirección");
    console.log("3. 🚀 Desplegar contratos");
    
    return deployResponse.contract_address;
    
  } catch (error) {
    console.error("❌ Error desplegando cuenta:", error);
    
    // Si falla, usar una cuenta pre-desplegada
    console.log("\n🔧 Alternativa: Usar cuenta pre-desplegada");
    console.log("1. Ve a: https://starknet-faucet.vercel.app/");
    console.log("2. Conecta tu wallet");
    console.log("3. Obtén ETH de prueba");
    console.log("4. Usa la dirección de tu wallet");
    
    return null;
  }
}

// Ejecutar despliegue de cuenta
deployAccount().catch(console.error);
