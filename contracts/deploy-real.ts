import { RpcProvider, Account, CallData, cairo } from "starknet";
import fs from "fs";
import path from "path";

// Configuración para Sepolia testnet
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";

// Variables de entorno (necesitas configurarlas)
const PRIVATE_KEY = process.env.STARKNET_PRIVATE_KEY;
const ACCOUNT_ADDRESS = process.env.STARKNET_ACCOUNT_ADDRESS;

if (!PRIVATE_KEY || !ACCOUNT_ADDRESS) {
  console.log("❌ Variables de entorno no configuradas");
  console.log("📝 Configura las siguientes variables:");
  console.log("   STARKNET_PRIVATE_KEY=tu_clave_privada");
  console.log("   STARKNET_ACCOUNT_ADDRESS=tu_direccion_cuenta");
  console.log("\n🔧 Para crear una cuenta:");
  console.log("   1. Ve a: https://starknet-faucet.vercel.app/");
  console.log("   2. Conecta tu wallet (Braavos, ArgentX)");
  console.log("   3. Obtén ETH de prueba");
  console.log("   4. Copia tu clave privada y dirección");
  process.exit(1);
}

const provider = new RpcProvider({ nodeUrl: RPC_URL });
const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);

// Direcciones de tokens en Sepolia testnet
const ETH_ADDRESS = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c7b7f7c7b7f7c7b7f7c7b";
const FEE_COLLECTOR = ACCOUNT_ADDRESS;

async function deployContract(contractName: string, constructorCalldata: any[]) {
  try {
    console.log(`\n🚀 Desplegando ${contractName}...`);
    
    // Leer el archivo de artefacto compilado
    const artifactPath = path.join(__dirname, `../target/dev/starkpays_contracts_${contractName}.sierra.json`);
    
    if (!fs.existsSync(artifactPath)) {
      console.log(`⚠️  Archivo de artefacto no encontrado: ${artifactPath}`);
      console.log("🔧 Ejecuta 'scarb build' primero para compilar los contratos");
      return null;
    }
    
    const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    
    // Declarar el contrato
    console.log(`📋 Declarando ${contractName}...`);
    const declareResponse = await account.declare({
      contract: contractArtifact,
    });
    
    console.log(`✅ ${contractName} declarado. Class Hash: ${declareResponse.class_hash}`);
    
    // Deploy del contrato
    console.log(`🚀 Desplegando instancia de ${contractName}...`);
    const deployResponse = await account.deployContract({
      classHash: declareResponse.class_hash,
      constructorCalldata,
    });
    
    console.log(`✅ ${contractName} desplegado en: ${deployResponse.contract_address}`);
    console.log(`📋 Hash de transacción: ${deployResponse.transaction_hash}`);
    
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
  console.log("🎯 Iniciando deployment real de contratos Starkpays en Sepolia...\n");
  
  try {
    // Verificar balance de la cuenta
    const balance = await provider.getBalance(ACCOUNT_ADDRESS);
    console.log(`💰 Balance de la cuenta: ${balance} wei`);
    
    if (balance === 0n) {
      console.log("⚠️  Cuenta sin fondos. Obtén ETH de prueba en:");
      console.log("   https://starknet-faucet.vercel.app/");
      return;
    }
    
    // 1. Desplegar PaymentProcessor
    const paymentProcessor = await deployContract("PaymentProcessor", [
      ACCOUNT_ADDRESS, // owner
    ]);
    
    if (paymentProcessor) {
      // 2. Desplegar RemesaVault
      const remesaVault = await deployContract("RemesaVault", [
        ACCOUNT_ADDRESS, // owner
        FEE_COLLECTOR,   // fee_collector
        50,              // platform_fee_bps (0.5%)
      ]);
      
      if (remesaVault) {
        // 3. Desplegar TandaSavings
        const tandaSavings = await deployContract("TandaSavings", [
          ACCOUNT_ADDRESS, // owner
        ]);
        
        if (tandaSavings) {
          // Crear archivo de configuración
          const config = {
            network: "sepolia",
            rpcUrl: RPC_URL,
            account: {
              address: ACCOUNT_ADDRESS,
              privateKey: PRIVATE_KEY.substring(0, 10) + "...",
            },
            contracts: {
              PaymentProcessor: {
                address: paymentProcessor.contractAddress,
                transactionHash: paymentProcessor.transactionHash,
                classHash: paymentProcessor.classHash,
              },
              RemesaVault: {
                address: remesaVault.contractAddress,
                transactionHash: remesaVault.transactionHash,
                classHash: remesaVault.classHash,
              },
              TandaSavings: {
                address: tandaSavings.contractAddress,
                transactionHash: tandaSavings.transactionHash,
                classHash: tandaSavings.classHash,
              },
            },
            tokens: {
              ETH: ETH_ADDRESS,
            },
            feeCollector: FEE_COLLECTOR,
            platformFeeBps: 50,
          };
          
          fs.writeFileSync(
            path.join(__dirname, "contracts-deployed-real.json"),
            JSON.stringify(config, null, 2)
          );
          
          console.log("\n🎉 ¡Deployment real completado exitosamente!");
          console.log("\n📋 Resumen de contratos desplegados:");
          console.log(`💳 PaymentProcessor: ${paymentProcessor.contractAddress}`);
          console.log(`🏦 RemesaVault: ${remesaVault.contractAddress}`);
          console.log(`💰 TandaSavings: ${tandaSavings.contractAddress}`);
          console.log("\n📄 Configuración guardada en: contracts-deployed-real.json");
          
          console.log("\n🔗 Explorar en Starkscan:");
          console.log(`   PaymentProcessor: https://sepolia.starkscan.co/contract/${paymentProcessor.contractAddress}`);
          console.log(`   RemesaVault: https://sepolia.starkscan.co/contract/${remesaVault.contractAddress}`);
          console.log(`   TandaSavings: https://sepolia.starkscan.co/contract/${tandaSavings.contractAddress}`);
        }
      }
    }
    
  } catch (error) {
    console.error("❌ Error durante el deployment:", error);
    process.exit(1);
  }
}

// Ejecutar deployment
main().catch(console.error);
