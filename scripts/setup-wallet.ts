#!/usr/bin/env tsx

/**
 * Script para configurar wallet y obtener fondos de testnet
 */

import fs from "fs";
import path from "path";

function createEnvFile() {
  const envPath = path.join(process.cwd(), ".env");
  
  if (!fs.existsSync(envPath)) {
    console.log("❌ Archivo .env no encontrado");
    console.log("💡 Ejecuta primero: npm run setup:prize");
    return false;
  }
  
  return true;
}

function showWalletSetup() {
  console.log("🔧 CONFIGURACIÓN DE WALLET PARA TESTNET\n");
  
  console.log("📋 PASOS PARA CONFIGURAR WALLET:");
  console.log("1. Instala Braavos o ArgentX wallet");
  console.log("2. Crea una nueva cuenta");
  console.log("3. Cambia a Starknet Sepolia testnet");
  console.log("4. Copia tu dirección de wallet");
  console.log("5. Copia tu private key (¡MANTÉNLO SEGURO!)\n");
  
  console.log("🌐 WALLETS RECOMENDADOS:");
  console.log("• Braavos: https://braavos.app/");
  console.log("• ArgentX: https://www.argent.xyz/");
  console.log("• OKX: https://www.okx.com/web3");
  
  console.log("\n🪙 OBTENER FONDOS DE TESTNET:");
  console.log("1. Ve a: https://faucet.quicknode.com/starknet-sepolia");
  console.log("2. Conecta tu wallet");
  console.log("3. Solicita 0.1 ETH");
  console.log("4. Espera 1-2 minutos");
  
  console.log("\n⚙️ CONFIGURAR EN .env:");
  console.log("DEPLOYER_ADDRESS=tu_direccion_aqui");
  console.log("DEPLOYER_PRIVATE_KEY=tu_clave_privada_aqui");
  console.log("FEE_COLLECTOR_ADDRESS=tu_direccion_aqui");
  
  console.log("\n✅ VERIFICAR CONFIGURACIÓN:");
  console.log("npm run check:funds");
  
  console.log("\n🚀 DESPLEGAR CONTRATOS:");
  console.log("npm run cairo:deploy");
}

function main() {
  console.log("🏆 Configuración de Wallet para Premio $1,000\n");
  
  if (!createEnvFile()) {
    return;
  }
  
  showWalletSetup();
  
  console.log("\n🎯 RESUMEN:");
  console.log("1. Configura tu wallet en .env");
  console.log("2. Obtén fondos de testnet");
  console.log("3. Verifica con: npm run check:funds");
  console.log("4. Despliega con: npm run cairo:deploy");
  console.log("\n¡Listo para ganar el premio! 🏆");
}

main();
