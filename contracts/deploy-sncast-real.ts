import { execSync } from "child_process";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const ACCOUNT_ADDRESS = process.env.STARKNET_ACCOUNT_ADDRESS || "";
const PRIVATE_KEY = process.env.STARKNET_PRIVATE_KEY || "";
const RPC_URL = process.env.STARKNET_RPC_URL || "https://starknet-sepolia.public.blastapi.io";
const NETWORK = "sepolia";

function runSncastCommand(command: string): string {
    console.log(`🔧 Ejecutando: ${command}`);
    try {
        return execSync(command, { encoding: "utf8", stdio: "pipe" });
    } catch (error: any) {
        console.error(`❌ Error ejecutando comando: ${error.message}`);
        throw error;
    }
}

function checkSncastInstallation() {
    try {
        runSncastCommand("sncast --version");
        console.log("✅ sncast está instalado.");
    } catch (error) {
        console.log("❌ sncast no está instalado. Intentando instalar...");
        try {
            // Intentar instalar desde GitHub releases
            runSncastCommand("cargo install --git https://github.com/foundry-rs/starknet-foundry sncast");
            console.log("✅ sncast instalado correctamente.");
        } catch (installError: any) {
            console.error("❌ Error instalando sncast:", installError.message);
            throw new Error(`Error instalando sncast: ${installError.message}`);
        }
    }
}

async function deployWithSncast(contractName: string, constructorCalldata: string[]): Promise<{ address: string, classHash: string, transactionHash: string }> {
    console.log(`\n🚀 Desplegando ${contractName} con sncast...`);

    // Declare the contract
    const declareCommand = `sncast --url ${RPC_URL} --network ${NETWORK} --account ${ACCOUNT_ADDRESS} --private-key ${PRIVATE_KEY} declare --contract-name ${contractName}`;
    const declareOutput = runSncastCommand(declareCommand);
    
    // Parse class hash and transaction hash from output
    const classHashMatch = declareOutput.match(/class_hash:\s*(0x[0-9a-fA-F]+)/);
    const declareTxHashMatch = declareOutput.match(/transaction_hash:\s*(0x[0-9a-fA-F]+)/);

    if (!classHashMatch || !declareTxHashMatch) {
        throw new Error(`No se pudo obtener class_hash o transaction_hash para ${contractName} durante la declaración.`);
    }
    
    const classHash = classHashMatch[1];
    const declareTransactionHash = declareTxHashMatch[1];
    console.log(`✅ Contrato ${contractName} declarado con classHash: ${classHash}, Tx Hash: ${declareTransactionHash}`);

    // Deploy the contract
    const deployCommand = `sncast --url ${RPC_URL} --network ${NETWORK} --account ${ACCOUNT_ADDRESS} --private-key ${PRIVATE_KEY} deploy --class-hash ${classHash} --constructor-calldata ${constructorCalldata.join(" ")}`;
    const deployOutput = runSncastCommand(deployCommand);
    
    // Parse contract address and transaction hash from output
    const contractAddressMatch = deployOutput.match(/contract_address:\s*(0x[0-9a-fA-F]+)/);
    const deployTxHashMatch = deployOutput.match(/transaction_hash:\s*(0x[0-9a-fA-F]+)/);

    if (!contractAddressMatch || !deployTxHashMatch) {
        throw new Error(`No se pudo obtener contract_address o transaction_hash para ${contractName} durante el despliegue.`);
    }
    
    const contractAddress = contractAddressMatch[1];
    const deployTransactionHash = deployTxHashMatch[1];
    console.log(`✅ Contrato ${contractName} desplegado en la dirección: ${contractAddress}, Tx Hash: ${deployTransactionHash}`);

    return {
        address: contractAddress,
        classHash: classHash,
        transactionHash: deployTransactionHash,
    };
}

async function main() {
    console.log("🚀 Desplegando contratos REALES con sncast...");
    console.log(`💰 Cuenta: ${ACCOUNT_ADDRESS}`);
    console.log("🎯 Iniciando deployment REAL con sncast en Starknet Sepolia...\n");

    try {
        // Verificar instalación de sncast
        checkSncastInstallation();

        // Verificar que los contratos estén compilados
        if (!fs.existsSync("./target/dev/starkpays_contracts_PaymentProcessor.sierra.json")) {
            console.log("📦 Compilando contratos...");
            runSncastCommand("scarb build");
        }

        const ownerAddress = ACCOUNT_ADDRESS;

        // Desplegar contratos
        const paymentProcessor = await deployWithSncast("PaymentProcessor", [ownerAddress]);
        const remesaVault = await deployWithSncast("RemesaVault", [ownerAddress]);
        const tandaSavings = await deployWithSncast("TandaSavings", [ownerAddress]);

        // Guardar configuración
        const deployedConfig = {
            network: NETWORK,
            rpcUrl: RPC_URL,
            account: {
                address: ACCOUNT_ADDRESS,
                privateKey: PRIVATE_KEY,
            },
            contracts: {
                PaymentProcessor: paymentProcessor,
                RemesaVault: remesaVault,
                TandaSavings: tandaSavings,
            },
            deployment: {
                status: "completed",
                timestamp: new Date().toISOString(),
                method: "sncast_deployment",
            },
        };

        fs.writeFileSync("contracts-deployed.json", JSON.stringify(deployedConfig, null, 2));
        console.log("\n🎉 ¡Deployment REAL con sncast completado y configuración guardada en contracts-deployed.json!");

    } catch (error: any) {
        console.error("❌ Error durante el deployment REAL:", error);
        console.log("\n🔧 Soluciones:");
        console.log("1. 🔄 Verificar que Argent X esté conectado");
        console.log("2. 💰 Verificar balance de ETH suficiente");
        console.log("3. 🔧 Verificar configuración de red");
        console.log("4. 📞 Revisar logs de error específicos");
        console.log("5. 🛠️ Instalar Visual Studio Build Tools para compilar sncast");
    }
}

main();
