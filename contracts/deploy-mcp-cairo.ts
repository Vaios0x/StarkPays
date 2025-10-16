import { execSync } from "child_process";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const ACCOUNT_ADDRESS = process.env.STARKNET_ACCOUNT_ADDRESS || "";
const PRIVATE_KEY = process.env.STARKNET_PRIVATE_KEY || "";
const RPC_URL = process.env.STARKNET_RPC_URL || "https://starknet-sepolia.public.blastapi.io";

// Función para ejecutar comandos de manera segura
function runCommand(command: string): string {
    console.log(`🔧 Ejecutando: ${command}`);
    try {
        return execSync(command, { encoding: "utf8", stdio: "pipe" });
    } catch (error: any) {
        console.error(`❌ Error ejecutando comando: ${error.message}`);
        throw error;
    }
}

// Función para desplegar usando el MCP de Cairo
async function deployWithMCP(contractName: string, constructorCalldata: string[]): Promise<{ address: string, classHash: string, transactionHash: string }> {
    console.log(`\n🚀 Desplegando ${contractName} con MCP de Cairo...`);

    try {
        // 1. Declarar el contrato usando scarb y starknet.js
        console.log(`📋 Declarando ${contractName}...`);
        
        // Usar scarb para compilar y obtener el class hash
        const buildOutput = runCommand("scarb build");
        console.log("✅ Contrato compilado");

        // Leer el archivo sierra compilado
        const sierraPath = `./target/dev/starkpays_contracts_${contractName}.contract_class.json`;
        const casmPath = `./target/dev/starkpays_contracts_${contractName}.compiled_contract_class.json`;
        
        if (!fs.existsSync(sierraPath) || !fs.existsSync(casmPath)) {
            throw new Error(`Archivos compilados no encontrados para ${contractName}`);
        }

        // Usar starknet.js para declarar y desplegar
        const declareScript = `
import { Account, Contract, json, RpcProvider, constants } from "starknet";

const provider = new RpcProvider({ nodeUrl: "${RPC_URL}" });
const account = new Account(provider, "${ACCOUNT_ADDRESS}", "${PRIVATE_KEY}");

async function deployContract() {
    const compiledContract = json.parse(fs.readFileSync("${sierraPath}").toString());
    const compiledCasm = json.parse(fs.readFileSync("${casmPath}").toString());
    
    console.log("Declarando contrato...");
    const declareResponse = await account.declare({ contract: compiledContract, casm: compiledCasm });
    await provider.waitForTransaction(declareResponse.transaction_hash);
    console.log("Class Hash:", declareResponse.class_hash);
    
    console.log("Desplegando contrato...");
    const deployResponse = await account.deploy({ 
        classHash: declareResponse.class_hash, 
        constructorCalldata: [${constructorCalldata.join(", ")}] 
    });
    await provider.waitForTransaction(deployResponse.transaction_hash);
    console.log("Contract Address:", deployResponse.contract_address);
    console.log("Transaction Hash:", deployResponse.transaction_hash);
}

deployContract().catch(console.error);
`;

        // Escribir script temporal
        const tempScriptPath = `temp-deploy-${contractName}.ts`;
        fs.writeFileSync(tempScriptPath, declareScript);

        // Ejecutar el script
        const deployOutput = runCommand(`npx tsx ${tempScriptPath}`);
        
        // Limpiar archivo temporal
        fs.unlinkSync(tempScriptPath);

        // Parsear resultados
        const classHashMatch = deployOutput.match(/Class Hash:\s*(0x[0-9a-fA-F]+)/);
        const contractAddressMatch = deployOutput.match(/Contract Address:\s*(0x[0-9a-fA-F]+)/);
        const transactionHashMatch = deployOutput.match(/Transaction Hash:\s*(0x[0-9a-fA-F]+)/);

        if (!classHashMatch || !contractAddressMatch || !transactionHashMatch) {
            throw new Error(`No se pudieron parsear los resultados para ${contractName}`);
        }

        const classHash = classHashMatch[1];
        const contractAddress = contractAddressMatch[1];
        const transactionHash = transactionHashMatch[1];

        console.log(`✅ Contrato ${contractName} desplegado exitosamente:`);
        console.log(`   📍 Dirección: ${contractAddress}`);
        console.log(`   🔑 Class Hash: ${classHash}`);
        console.log(`   📝 Transaction Hash: ${transactionHash}`);

        return {
            address: contractAddress,
            classHash: classHash,
            transactionHash: transactionHash,
        };

    } catch (error: any) {
        console.error(`❌ Error desplegando ${contractName}:`, error.message);
        throw error;
    }
}

async function main() {
    console.log("🚀 Desplegando contratos REALES con MCP de Cairo...");
    console.log(`💰 Cuenta: ${ACCOUNT_ADDRESS}`);
    console.log(`🌐 RPC: ${RPC_URL}`);
    console.log("🎯 Iniciando deployment REAL con MCP de Cairo en Starknet Sepolia...\n");

    try {
        // Verificar que los contratos estén compilados
        console.log("📦 Verificando compilación de contratos...");
        if (!fs.existsSync("./target/dev/starkpays_contracts_PaymentProcessor.sierra.json")) {
            console.log("📦 Compilando contratos...");
            runCommand("scarb build");
        }
        console.log("✅ Contratos compilados correctamente");

        const ownerAddress = ACCOUNT_ADDRESS;

        // Desplegar cada contrato
        console.log("\n🚀 Iniciando deployment de contratos...");
        
        const paymentProcessor = await deployWithMCP("PaymentProcessor", [ownerAddress]);
        const remesaVault = await deployWithMCP("RemesaVault", [ownerAddress]);
        const tandaSavings = await deployWithMCP("TandaSavings", [ownerAddress]);

        // Crear configuración de deployment
        const deployedConfig = {
            network: "sepolia",
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
                method: "mcp_cairo_deployment",
            },
        };

        // Guardar configuración
        fs.writeFileSync("contracts-deployed.json", JSON.stringify(deployedConfig, null, 2));
        
        console.log("\n🎉 ¡Deployment REAL con MCP de Cairo completado exitosamente!");
        console.log("📋 Configuración guardada en contracts-deployed.json");
        
        console.log("\n📊 Resumen de contratos desplegados:");
        console.log(`   💳 PaymentProcessor: ${paymentProcessor.address}`);
        console.log(`   🏦 RemesaVault: ${remesaVault.address}`);
        console.log(`   💰 TandaSavings: ${tandaSavings.address}`);

    } catch (error: any) {
        console.error("❌ Error durante el deployment REAL:", error);
        console.log("\n🔧 Soluciones:");
        console.log("1. 🔄 Verificar que Argent X esté conectado");
        console.log("2. 💰 Verificar balance de ETH suficiente");
        console.log("3. 🔧 Verificar configuración de red");
        console.log("4. 📞 Revisar logs de error específicos");
        console.log("5. 🛠️ Verificar que los contratos estén compilados correctamente");
    }
}

main();
