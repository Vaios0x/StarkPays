import { RpcProvider, Account, CallData, cairo } from "starknet";
import fs from "fs";
import path from "path";

// Configuración de testnet
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const PRIVATE_KEY = process.env.STARKNET_PRIVATE_KEY;
const ACCOUNT_ADDRESS = process.env.STARKNET_ACCOUNT_ADDRESS;

if (!PRIVATE_KEY || !ACCOUNT_ADDRESS) {
  throw new Error("STARKNET_PRIVATE_KEY y STARKNET_ACCOUNT_ADDRESS deben estar configurados");
}

const provider = new RpcProvider({ nodeUrl: RPC_URL });
const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);

// Direcciones de tokens ERC20 en testnet (ejemplo con USDC)
const USDC_ADDRESS = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c7b7f7c7b7f7c7b7f7c7b"; // ETH en testnet
const FEE_COLLECTOR = ACCOUNT_ADDRESS; // Usar la cuenta como recolector de fees

async function deployContract(contractName: string, constructorCalldata: any[]) {
  try {
    console.log(`🚀 Desplegando ${contractName}...`);
    
    // Leer el archivo de artefacto compilado
    const artifactPath = path.join(__dirname, `../target/dev/starkpays_contracts_${contractName}.sierra.json`);
    const contractArtifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    
    const deployResponse = await account.deployContract({
      classHash: contractArtifact.class_hash,
      constructorCalldata,
    });
    
    console.log(`✅ ${contractName} desplegado en: ${deployResponse.contract_address}`);
    console.log(`📋 Hash de transacción: ${deployResponse.transaction_hash}`);
    
    return {
      contractAddress: deployResponse.contract_address,
      transactionHash: deployResponse.transaction_hash,
    };
  } catch (error) {
    console.error(`❌ Error desplegando ${contractName}:`, error);
    throw error;
  }
}

async function main() {
  console.log("🎯 Iniciando despliegue de contratos Starkpays en testnet...\n");
  
  try {
    // 1. Desplegar PaymentProcessor
    const paymentProcessor = await deployContract("PaymentProcessor", [
      ACCOUNT_ADDRESS, // owner
      FEE_COLLECTOR,   // fee_collector
      50,              // platform_fee_bps (0.5%)
    ]);
    
    // 2. Desplegar RemesaVault
    const remesaVault = await deployContract("RemesaVault", [
      ACCOUNT_ADDRESS, // owner
      FEE_COLLECTOR,   // fee_collector
      50,              // platform_fee_bps (0.5%)
    ]);
    
    // 3. Desplegar TandaSavings
    const tandaSavings = await deployContract("TandaSavings", [
      ACCOUNT_ADDRESS, // owner
    ]);
    
    // Configurar tokens soportados
    console.log("\n🔧 Configurando tokens soportados...");
    
    // Agregar USDC como token soportado en PaymentProcessor
    const addTokenCall = {
      contractAddress: paymentProcessor.contractAddress,
      entrypoint: "add_supported_token",
      calldata: [USDC_ADDRESS],
    };
    
    await account.execute(addTokenCall);
    console.log("✅ USDC agregado como token soportado en PaymentProcessor");
    
    // Agregar USDC como token soportado en RemesaVault
    const addTokenRemesaCall = {
      contractAddress: remesaVault.contractAddress,
      entrypoint: "add_supported_token",
      calldata: [USDC_ADDRESS],
    };
    
    await account.execute(addTokenRemesaCall);
    console.log("✅ USDC agregado como token soportado en RemesaVault");
    
    // Crear archivo de configuración
    const config = {
      network: "sepolia",
      contracts: {
        PaymentProcessor: {
          address: paymentProcessor.contractAddress,
          transactionHash: paymentProcessor.transactionHash,
        },
        RemesaVault: {
          address: remesaVault.contractAddress,
          transactionHash: remesaVault.transactionHash,
        },
        TandaSavings: {
          address: tandaSavings.contractAddress,
          transactionHash: tandaSavings.transactionHash,
        },
      },
      tokens: {
        USDC: USDC_ADDRESS,
      },
      feeCollector: FEE_COLLECTOR,
      platformFeeBps: 50,
    };
    
    fs.writeFileSync(
      path.join(__dirname, "../contracts-deployed.json"),
      JSON.stringify(config, null, 2)
    );
    
    console.log("\n🎉 ¡Despliegue completado exitosamente!");
    console.log("\n📋 Resumen de contratos desplegados:");
    console.log(`💳 PaymentProcessor: ${paymentProcessor.contractAddress}`);
    console.log(`🏦 RemesaVault: ${remesaVault.contractAddress}`);
    console.log(`💰 TandaSavings: ${tandaSavings.contractAddress}`);
    console.log("\n📄 Configuración guardada en: contracts-deployed.json");
    
  } catch (error) {
    console.error("❌ Error durante el despliegue:", error);
    process.exit(1);
  }
}

// Ejecutar despliegue
main().catch(console.error);
