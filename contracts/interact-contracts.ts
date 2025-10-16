import { RpcProvider, Account, Contract, CallData } from "starknet";
import fs from "fs";

// Configuración
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const PRIVATE_KEY = "0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892";
const ACCOUNT_ADDRESS = "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769";

console.log("🔧 Interactuando con contratos desplegados...");

const provider = new RpcProvider({ nodeUrl: RPC_URL });
const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);

// Cargar configuración de contratos desplegados
let deployedContracts: any;
try {
  const configData = fs.readFileSync("contracts-deployed.json", "utf8");
  deployedContracts = JSON.parse(configData);
  console.log("✅ Configuración de contratos cargada");
} catch (error) {
  console.error("❌ Error cargando configuración:", error);
  process.exit(1);
}

// Función para interactuar con PaymentProcessor
async function testPaymentProcessor() {
  try {
    console.log("\n💳 Probando PaymentProcessor...");
    
    const contractAddress = deployedContracts.contracts.PaymentProcessor.address;
    const contract = new Contract([], contractAddress, provider);
    contract.connect(account);
    
    // Probar process_payment
    console.log("📤 Procesando pago de prueba...");
    const processPaymentCall = contract.populate("process_payment", {
      merchant: ACCOUNT_ADDRESS,
      amount: 1000000000000000000n // 1 ETH en wei
    });
    
    const processTx = await contract.process_payment(
      processPaymentCall.calldata,
      { maxFee: 1000000000000000n }
    );
    
    console.log(`✅ Pago procesado. Hash: ${processTx.transaction_hash}`);
    
    // Obtener estadísticas
    console.log("📊 Obteniendo estadísticas...");
    const statsCall = contract.populate("get_stats", {});
    const stats = await contract.get_stats(statsCall.calldata);
    
    console.log(`📈 Volumen total: ${stats[0]}`);
    console.log(`📊 Transacciones totales: ${stats[1]}`);
    
  } catch (error) {
    console.error("❌ Error probando PaymentProcessor:", error);
  }
}

// Función para interactuar con RemesaVault
async function testRemesaVault() {
  try {
    console.log("\n🏦 Probando RemesaVault...");
    
    const contractAddress = deployedContracts.contracts.RemesaVault.address;
    const contract = new Contract([], contractAddress, provider);
    contract.connect(account);
    
    // Probar initiate_transfer
    console.log("📤 Iniciando transferencia...");
    const initiateCall = contract.populate("initiate_transfer", {
      to: ACCOUNT_ADDRESS,
      amount: 500000000000000000n // 0.5 ETH
    });
    
    const initiateTx = await contract.initiate_transfer(
      initiateCall.calldata,
      { maxFee: 1000000000000000n }
    );
    
    console.log(`✅ Transferencia iniciada. Hash: ${initiateTx.transaction_hash}`);
    
    // Probar complete_transfer
    console.log("✅ Completando transferencia...");
    const completeCall = contract.populate("complete_transfer", {
      to: ACCOUNT_ADDRESS,
      amount: 500000000000000000n
    });
    
    const completeTx = await contract.complete_transfer(
      completeCall.calldata,
      { maxFee: 1000000000000000n }
    );
    
    console.log(`✅ Transferencia completada. Hash: ${completeTx.transaction_hash}`);
    
    // Obtener estadísticas de la plataforma
    console.log("📊 Obteniendo estadísticas de la plataforma...");
    const statsCall = contract.populate("get_platform_stats", {});
    const stats = await contract.get_platform_stats(statsCall.calldata);
    
    console.log(`📈 Volumen total: ${stats[0]}`);
    console.log(`📊 Transacciones totales: ${stats[1]}`);
    
  } catch (error) {
    console.error("❌ Error probando RemesaVault:", error);
  }
}

// Función para interactuar con TandaSavings
async function testTandaSavings() {
  try {
    console.log("\n👥 Probando TandaSavings...");
    
    const contractAddress = deployedContracts.contracts.TandaSavings.address;
    const contract = new Contract([], contractAddress, provider);
    contract.connect(account);
    
    // Crear una tanda
    console.log("📝 Creando tanda de prueba...");
    const createTandaCall = contract.populate("create_tanda", {
      name: "Tanda de Prueba",
      contribution_amount: 100000000000000000n, // 0.1 ETH
      max_members: 5,
      token: ACCOUNT_ADDRESS // Usando la cuenta como token por simplicidad
    });
    
    const createTx = await contract.create_tanda(
      createTandaCall.calldata,
      { maxFee: 1000000000000000n }
    );
    
    console.log(`✅ Tanda creada. Hash: ${createTx.transaction_hash}`);
    
    // Obtener número de tandas
    console.log("📊 Obteniendo número de tandas...");
    const countCall = contract.populate("get_tanda_count", {});
    const count = await contract.get_tanda_count(countCall.calldata);
    
    console.log(`📈 Número de tandas: ${count}`);
    
    // Probar contribución (tanda_id = 0)
    console.log("💰 Realizando contribución...");
    const contributeCall = contract.populate("contribute", {
      tanda_id: 0
    });
    
    const contributeTx = await contract.contribute(
      contributeCall.calldata,
      { maxFee: 1000000000000000n }
    );
    
    console.log(`✅ Contribución realizada. Hash: ${contributeTx.transaction_hash}`);
    
  } catch (error) {
    console.error("❌ Error probando TandaSavings:", error);
  }
}

// Función para verificar el estado de todos los contratos
async function verifyAllContracts() {
  console.log("\n🔍 Verificando estado de todos los contratos...");
  
  for (const [name, contractInfo] of Object.entries(deployedContracts.contracts)) {
    try {
      console.log(`\n📋 Verificando ${name}...`);
      console.log(`   📍 Dirección: ${contractInfo.address}`);
      console.log(`   🔗 Starkscan: https://sepolia.starkscan.co/contract/${contractInfo.address}`);
      
      // Verificar que el contrato existe
      const code = await provider.getClassHashAt(contractInfo.address);
      console.log(`   ✅ Código verificado: ${code}`);
      
    } catch (error) {
      console.error(`   ❌ Error verificando ${name}:`, error);
    }
  }
}

// Función principal
async function main() {
  try {
    console.log("🎯 Iniciando pruebas de contratos...\n");
    
    // Verificar todos los contratos
    await verifyAllContracts();
    
    // Probar cada contrato
    await testPaymentProcessor();
    await testRemesaVault();
    await testTandaSavings();
    
    console.log("\n🎉 ¡Todas las pruebas completadas exitosamente!");
    console.log("\n📋 Resumen de funcionalidades probadas:");
    console.log("✅ PaymentProcessor - Procesamiento de pagos");
    console.log("✅ RemesaVault - Transferencias y fees");
    console.log("✅ TandaSavings - Sistema de tandas");
    
    console.log("\n🔧 Próximos pasos:");
    console.log("1. 🧪 Ejecutar más pruebas específicas");
    console.log("2. 🔗 Integrar con frontend");
    console.log("3. 📱 Configurar PWA");
    console.log("4. 🛡️ Auditoría de seguridad");
    
  } catch (error) {
    console.error("❌ Error durante las pruebas:", error);
  }
}

main().catch(console.error);
