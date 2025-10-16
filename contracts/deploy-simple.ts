import { RpcProvider, Account, CallData, cairo } from "starknet";
import fs from "fs";
import path from "path";

// Configuración
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const PRIVATE_KEY = "0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892";
const ACCOUNT_ADDRESS = "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769";

console.log("🎯 Desplegando contratos con API simple...");
console.log(`💰 Cuenta: ${ACCOUNT_ADDRESS}`);

const provider = new RpcProvider({ nodeUrl: RPC_URL });
const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);

async function deployContractSimple(contractName: string, constructorCalldata: any[]) {
  try {
    console.log(`\n🚀 Desplegando ${contractName} con API simple...`);
    
    // Leer archivos compilados
    const sierraPath = path.join(__dirname, `target/dev/starkpays_contracts_${contractName}.contract_class.json`);
    const casmPath = path.join(__dirname, `target/dev/starkpays_contracts_${contractName}.compiled_contract_class.json`);
    
    if (!fs.existsSync(sierraPath) || !fs.existsSync(casmPath)) {
      throw new Error(`Archivos no encontrados para ${contractName}`);
    }
    
    const sierraArtifact = JSON.parse(fs.readFileSync(sierraPath, "utf8"));
    const casmArtifact = JSON.parse(fs.readFileSync(casmPath, "utf8"));
    
    console.log(`📋 Declarando ${contractName}...`);
    
    // Declarar contrato sin especificar versión (usar defaults)
    const declareResponse = await account.declare({
      contract: sierraArtifact,
      casm: casmArtifact,
    });
    
    console.log(`✅ ${contractName} declarado. Class Hash: ${declareResponse.class_hash}`);
    
    // Deploy contrato sin especificar versión
    console.log(`🚀 Desplegando instancia de ${contractName}...`);
    const deployResponse = await account.deployContract({
      classHash: declareResponse.class_hash,
      constructorCalldata,
    });
    
    console.log(`✅ ${contractName} desplegado en: ${deployResponse.contract_address}`);
    console.log(`📋 Hash de transacción: ${deployResponse.transaction_hash}`);
    console.log(`🔗 Starkscan: https://sepolia.starkscan.co/contract/${deployResponse.contract_address}`);
    
    return {
      contractAddress: deployResponse.contract_address,
      transactionHash: deployResponse.transaction_hash,
      classHash: declareResponse.class_hash,
    };
  } catch (error) {
    console.error(`❌ Error desplegando ${contractName}:`, error);
    throw error;
  }
}

async function main() {
  try {
    console.log("🎯 Iniciando deployment con API simple...\n");
    
    const contracts = [];
    
    // 1. PaymentProcessor
    console.log("📦 Desplegando PaymentProcessor...");
    const paymentProcessor = await deployContractSimple("PaymentProcessor", [
      ACCOUNT_ADDRESS, // owner
    ]);
    contracts.push({ name: "PaymentProcessor", ...paymentProcessor });
    
    // 2. RemesaVault
    console.log("📦 Desplegando RemesaVault...");
    const remesaVault = await deployContractSimple("RemesaVault", [
      ACCOUNT_ADDRESS, // owner
      ACCOUNT_ADDRESS, // fee_collector
      50,              // platform_fee_bps
    ]);
    contracts.push({ name: "RemesaVault", ...remesaVault });
    
    // 3. TandaSavings
    console.log("📦 Desplegando TandaSavings...");
    const tandaSavings = await deployContractSimple("TandaSavings", [
      ACCOUNT_ADDRESS, // owner
    ]);
    contracts.push({ name: "TandaSavings", ...tandaSavings });
    
    // Guardar configuración
    const config = {
      network: "sepolia",
      rpcUrl: RPC_URL,
      account: {
        address: ACCOUNT_ADDRESS,
        privateKey: PRIVATE_KEY.substring(0, 10) + "...",
      },
      contracts: contracts.reduce((acc: Record<string, any>, contract) => {
        acc[contract.name] = {
          address: contract.contractAddress,
          transactionHash: contract.transactionHash,
          classHash: contract.classHash,
        };
        return acc;
      }, {}),
      deployment: {
        status: "completed",
        timestamp: new Date().toISOString(),
        method: "simple_api"
      },
    };
    
    fs.writeFileSync("contracts-deployed-simple.json", JSON.stringify(config, null, 2));
    
    console.log("\n🎉 ¡Deployment con API simple completado exitosamente!");
    console.log("\n📋 Resumen de contratos desplegados:");
    contracts.forEach(contract => {
      console.log(`\n💳 ${contract.name}:`);
      console.log(`   📍 Dirección: ${contract.contractAddress}`);
      console.log(`   🔗 Starkscan: https://sepolia.starkscan.co/contract/${contract.contractAddress}`);
    });
    
    console.log("\n🔧 Próximos pasos:");
    console.log("1. ✅ Contratos desplegados con API simple");
    console.log("2. 🔗 Verificar en Starkscan");
    console.log("3. 🔧 Integrar direcciones en el frontend");
    console.log("4. 🧪 Probar funcionalidades");
    
  } catch (error) {
    console.error("❌ Error durante el deployment con API simple:", error);
    console.log("\n🔧 Soluciones alternativas:");
    console.log("1. 🔄 Usar Remix IDE (recomendado)");
    console.log("2. 📱 Verificar que la cuenta esté activada");
    console.log("3. 💰 Verificar que tienes ETH suficiente");
    console.log("4. 📞 Contactar soporte de Starknet");
    console.log("5. 🔧 Usar Starkli CLI como alternativa");
    console.log("6. 🛠️ Usar Starknet Foundry (sncast)");
  }
}

main().catch(console.error);