import { Account, Contract, json, RpcProvider, stark } from "starknet";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function deploy() {
  // Configuración de red
  const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_STARKNET_RPC_URL || "https://starknet-mainnet.public.blastapi.io",
  });

  // Cuenta del deployer
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY!;
  const accountAddress = process.env.DEPLOYER_ADDRESS!;

  const account = new Account(provider, accountAddress, privateKey);

  console.log("🚀 Deploying Remesa Vault...");
  console.log("📍 Deployer:", accountAddress);

  // Leer compiled contract
  const compiledContract = json.parse(
    fs.readFileSync("./contracts/target/dev/remesa_vault_RemesaVault.contract_class.json").toString("ascii")
  );

  const compiledCasm = json.parse(
    fs.readFileSync("./contracts/target/dev/remesa_vault_RemesaVault.compiled_contract_class.json").toString("ascii")
  );

  // Deploy
  const deployResponse = await account.declareAndDeploy({
    contract: compiledContract,
    casm: compiledCasm,
    constructorCalldata: [
      accountAddress, // owner
      process.env.FEE_COLLECTOR_ADDRESS!, // fee_collector
      50, // platform_fee_bps (0.5%)
    ],
  });

  console.log("✅ Contract declared!");
  console.log("📝 Class Hash:", deployResponse.declare.class_hash);
  
  await provider.waitForTransaction(deployResponse.deploy.transaction_hash);

  console.log("✅ Contract deployed!");
  console.log("📍 Contract Address:", deployResponse.deploy.contract_address);
  console.log("🔗 Transaction:", deployResponse.deploy.transaction_hash);

  // Guardar addresses
  const addresses = {
    contractAddress: deployResponse.deploy.contract_address,
    classHash: deployResponse.declare.class_hash,
    deployedAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    "./lib/starknet/addresses.json",
    JSON.stringify(addresses, null, 2)
  );

  console.log("💾 Addresses saved to lib/starknet/addresses.json");

  // Agregar tokens soportados
  const contract = new Contract(
    compiledContract.abi,
    deployResponse.deploy.contract_address,
    account
  );

  // USDC en Starknet
  const usdcAddress = "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8";
  
  const addTokenTx = await contract.add_supported_token(usdcAddress);
  await provider.waitForTransaction(addTokenTx.transaction_hash);

  console.log("✅ USDC added as supported token");
  console.log("\n🎉 Deployment complete!");
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
