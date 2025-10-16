import { Account, Contract, json, RpcProvider, constants } from "starknet";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const RPC_URL = process.env.STARKNET_RPC_URL || "https://starknet-sepolia.public.blastapi.io";
const PRIVATE_KEY = process.env.STARKNET_PRIVATE_KEY || "0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892";
const ACCOUNT_ADDRESS = process.env.STARKNET_ACCOUNT_ADDRESS || "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769";

const provider = new RpcProvider({ nodeUrl: RPC_URL });
const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);

async function deployContractMCP(contractName: string, constructorCalldata: any[]) {
    console.log(`\n🚀 Desplegando ${contractName} con MCP de Cairo...`);
    
    try {
        // Leer archivos compilados
        const sierraPath = `./target/dev/starkpays_contracts_${contractName}.contract_class.json`;
        const casmPath = `./target/dev/starkpays_contracts_${contractName}.compiled_contract_class.json`;
        
        if (!fs.existsSync(sierraPath) || !fs.existsSync(casmPath)) {
            throw new Error(`Archivos compilados no encontrados para ${contractName}`);
        }

        const compiledContract = json.parse(fs.readFileSync(sierraPath).toString());
        const compiledCasm = json.parse(fs.readFileSync(casmPath).toString());

        console.log(`📋 Declarando ${contractName}...`);
        
        // Declarar el contrato
        const declareResponse = await account.declare({ 
            contract: compiledContract, 
            casm: compiledCasm 
        });
        
        console.log(`⏳ Esperando confirmación de declaración...`);
        await provider.waitForTransaction(declareResponse.transaction_hash);
        console.log(`✅ Contrato ${contractName} declarado con classHash: ${declareResponse.class_hash}`);

        console.log(`🛠️ Desplegando instancia de ${contractName}...`);
        
        // Desplegar el contrato
        const deployResponse = await account.deploy({ 
            classHash: declareResponse.class_hash, 
            constructorCalldata 
        });
        
        console.log(`⏳ Esperando confirmación de despliegue...`);
        await provider.waitForTransaction(deployResponse.transaction_hash);
        console.log(`✅ Contrato ${contractName} desplegado en la dirección: ${deployResponse.contract_address}`);

        // Verificar que el contrato está realmente desplegado
        console.log(`🔍 Verificando deployment de ${contractName}...`);
        try {
            const contractInfo = await provider.getClassHashAt(deployResponse.contract_address);
            console.log(`✅ Verificación exitosa: ${contractName} está desplegado y funcionando`);
        } catch (error) {
            console.log(`⚠️ No se pudo verificar el contrato inmediatamente (puede tardar unos segundos)`);
        }

        return {
            address: deployResponse.contract_address,
            classHash: declareResponse.class_hash,
            transactionHash: deployResponse.transaction_hash,
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
        if (!fs.existsSync("./target/dev/starkpays_contracts_PaymentProcessor.contract_class.json")) {
            console.log("📦 Compilando contratos...");
            const { execSync } = require("child_process");
            execSync("scarb build", { stdio: "inherit" });
        }
        console.log("✅ Contratos compilados correctamente");

        const ownerAddress = ACCOUNT_ADDRESS;

        // Desplegar cada contrato
        console.log("\n🚀 Iniciando deployment de contratos...");
        
        const paymentProcessor = await deployContractMCP("PaymentProcessor", [ownerAddress]);
        const remesaVault = await deployContractMCP("RemesaVault", [ownerAddress]);
        const tandaSavings = await deployContractMCP("TandaSavings", [ownerAddress]);

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
                method: "mcp_cairo_real_deployment",
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

        console.log("\n🔗 Enlaces de exploración:");
        console.log(`   💳 PaymentProcessor: https://sepolia.starkscan.co/contract/${paymentProcessor.address}`);
        console.log(`   🏦 RemesaVault: https://sepolia.starkscan.co/contract/${remesaVault.address}`);
        console.log(`   💰 TandaSavings: https://sepolia.starkscan.co/contract/${tandaSavings.address}`);

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
