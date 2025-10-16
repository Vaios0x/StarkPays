#!/usr/bin/env tsx

/**
 * Script para verificar fondos de testnet y configurar wallet
 */

import { RpcProvider, Account, CallData, cairo } from "starknet";

const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const provider = new RpcProvider({ nodeUrl: RPC_URL });

// Dirección del token ETH en testnet
const ETH_ADDRESS = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c7b7f7c7b7f7c7b7f7c7b";

async function checkBalance(address: string) {
  try {
    console.log(`🔍 Verificando balance para: ${address}`);
    
    // Crear contrato ETH para verificar balance
    const ethContract = new Account(provider, ETH_ADDRESS, "");
    
    // Llamar a balanceOf del token ETH
    const balanceCall = {
      contractAddress: ETH_ADDRESS,
      entrypoint: "balanceOf",
      calldata: CallData.compile([address]),
    };
    
    const result = await provider.callContract(balanceCall);
    const balance = BigInt(result[0]);
    const balanceEth = Number(balance) / 1e18;
    
    console.log(`💰 Balance actual: ${balanceEth.toFixed(4)} ETH`);
    
    if (balanceEth < 0.01) {
      console.log("⚠️  Balance bajo. Necesitas obtener fondos de testnet:");
      console.log("🌐 Ve a: https://faucet.quicknode.com/starknet-sepolia");
      console.log("🔗 Conecta tu wallet y solicita 0.1 ETH");
      return false;
    } else {
      console.log("✅ Balance suficiente para desplegar contratos");
      return true;
    }
  } catch (error) {
    console.error("❌ Error verificando balance:", error);
    console.log("💡 Asegúrate de que la dirección sea válida y esté en testnet");
    return false;
  }
}

async function main() {
  const address = process.env.DEPLOYER_ADDRESS;
  
  if (!address) {
    console.log("❌ DEPLOYER_ADDRESS no configurado en .env");
    console.log("💡 Configura tu dirección de wallet en .env");
    return;
  }
  
  console.log("🚀 Verificando fondos de testnet...\n");
  
  const hasFunds = await checkBalance(address);
  
  if (!hasFunds) {
    console.log("\n📋 Pasos para obtener fondos:");
    console.log("1. Ve a: https://faucet.quicknode.com/starknet-sepolia");
    console.log("2. Conecta tu wallet (Braavos/ArgentX)");
    console.log("3. Solicita 0.1 ETH");
    console.log("4. Espera 1-2 minutos");
    console.log("5. Ejecuta este script nuevamente");
  } else {
    console.log("\n🎉 ¡Listo para desplegar contratos!");
    console.log("💡 Ejecuta: npm run cairo:deploy");
  }
}

main().catch(console.error);
