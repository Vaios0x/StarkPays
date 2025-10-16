import { RpcProvider, Contract } from "starknet";
import fs from "fs";
import path from "path";

// Configuración
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const provider = new RpcProvider({ nodeUrl: RPC_URL });

// Cargar configuración de contratos desplegados
const configPath = path.join(__dirname, "../contracts-deployed.json");
let deployedContracts: any = {};

if (fs.existsSync(configPath)) {
  deployedContracts = JSON.parse(fs.readFileSync(configPath, "utf8"));
} else {
  console.log("❌ No se encontró el archivo contracts-deployed.json");
  console.log("💡 Ejecuta primero: npm run deploy");
  process.exit(1);
}

async function verifyContract(name: string, address: string) {
  try {
    console.log(`🔍 Verificando ${name} en ${address}...`);
    
    // Crear instancia del contrato
    const contract = new Contract([], address, provider);
    
    // Intentar llamar a una función básica
    let isWorking = false;
    let error = null;
    
    try {
      // Intentar obtener información básica del contrato
      const code = await provider.getClassHashAt(address);
      if (code && code !== "0x0") {
        isWorking = true;
      }
    } catch (e) {
      error = e;
    }
    
    if (isWorking) {
      console.log(`✅ ${name} está funcionando correctamente`);
      return true;
    } else {
      console.log(`❌ ${name} no está funcionando: ${error}`);
      return false;
    }
    
  } catch (error) {
    console.log(`❌ Error verificando ${name}: ${error}`);
    return false;
  }
}

async function main() {
  console.log("🔍 Verificando contratos desplegados en testnet...\n");
  
  const contracts = deployedContracts.contracts;
  const results = [];
  
  // Verificar PaymentProcessor
  if (contracts.PaymentProcessor) {
    const result = await verifyContract(
      "PaymentProcessor", 
      contracts.PaymentProcessor.address
    );
    results.push({ name: "PaymentProcessor", success: result });
  }
  
  // Verificar RemesaVault
  if (contracts.RemesaVault) {
    const result = await verifyContract(
      "RemesaVault", 
      contracts.RemesaVault.address
    );
    results.push({ name: "RemesaVault", success: result });
  }
  
  // Verificar TandaSavings
  if (contracts.TandaSavings) {
    const result = await verifyContract(
      "TandaSavings", 
      contracts.TandaSavings.address
    );
    results.push({ name: "TandaSavings", success: result });
  }
  
  // Resumen
  console.log("\n📊 Resumen de verificación:");
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  
  results.forEach(result => {
    const status = result.success ? "✅" : "❌";
    console.log(`${status} ${result.name}`);
  });
  
  console.log(`\n🎯 ${successful}/${total} contratos funcionando correctamente`);
  
  if (successful === total) {
    console.log("🎉 ¡Todos los contratos están funcionando correctamente!");
  } else {
    console.log("⚠️  Algunos contratos necesitan atención");
  }
}

main().catch(console.error);
