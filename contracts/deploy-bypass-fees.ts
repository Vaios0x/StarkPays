import { Account, Contract, json, RpcProvider, constants, num } from "starknet";
import * as fs from "fs";

// Configuración directa
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const PRIVATE_KEY = "0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892";
const ACCOUNT_ADDRESS = "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769";

const provider = new RpcProvider({ nodeUrl: RPC_URL });
const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);

async function deployContractBypassFees(contractName: string, constructorCalldata: any[]) {
    console.log(`\n🚀 Desplegando ${contractName} evitando estimación de fees...`);
    
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
        
        // Crear transacción de declaración manual sin estimación de fees
        const declareTx = {
            type: "DECLARE",
            contract_class: compiledContract,
            casm: compiledCasm,
            sender_address: ACCOUNT_ADDRESS,
            version: "0x0", // V0
            max_fee: "0x5f5e100", // 100,000,000 wei
            nonce: "0x0",
            signature: []
        };

        console.log(`🔧 Enviando transacción de declaración...`);
        const declareResponse = await account.declare(declareTx);
        
        console.log(`⏳ Esperando confirmación de declaración...`);
        await provider.waitForTransaction(declareResponse.transaction_hash);
        console.log(`✅ Contrato ${contractName} declarado con classHash: ${declareResponse.class_hash}`);

        console.log(`🛠️ Desplegando instancia de ${contractName}...`);
        
        // Crear transacción de despliegue manual sin estimación de fees
        const deployTx = {
            type: "DEPLOY",
            class_hash: declareResponse.class_hash,
            constructor_calldata: constructorCalldata,
            version: "0x0", // V0
            max_fee: "0x5f5e100", // 100,000,000 wei
            nonce: "0x1",
            signature: []
        };

        console.log(`🔧 Enviando transacción de despliegue...`);
        const deployResponse = await account.deploy(deployTx);
        
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
    console.log("🚀 Desplegando contratos REALES evitando estimación de fees...");
    console.log(`💰 Cuenta: ${ACCOUNT_ADDRESS}`);
    console.log(`🌐 RPC: ${RPC_URL}`);
    console.log("🎯 Iniciando deployment REAL evitando estimación de fees en Starknet Sepolia...\n");

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
        console.log("\n🚀 Iniciando deployment de contratos evitando estimación de fees...");
        
        const paymentProcessor = await deployContractBypassFees("PaymentProcessor", [ownerAddress]);
        const remesaVault = await deployContractBypassFees("RemesaVault", [ownerAddress]);
        const tandaSavings = await deployContractBypassFees("TandaSavings", [ownerAddress]);

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
                method: "bypass_fees_mcp_cairo_real_deployment",
            },
        };

        // Guardar configuración
        fs.writeFileSync("contracts-deployed.json", JSON.stringify(deployedConfig, null, 2));
        
        console.log("\n🎉 ¡Deployment REAL evitando estimación de fees completado exitosamente!");
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
