import * as fs from "fs";

// Configuración directa
const RPC_URL = "https://starknet-sepolia.public.blastapi.io";
const PRIVATE_KEY = "0x07d04a25d64c2f31722427d424a4e5b514e970fcbb2152ebacdfc391ffcaa892";
const ACCOUNT_ADDRESS = "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769";

async function deployContractWithDirectRPC(contractName: string, constructorCalldata: any[]) {
    console.log(`\n🚀 Desplegando ${contractName} con RPC directo...`);
    
    try {
        // Leer archivos compilados
        const sierraPath = `./target/dev/starkpays_contracts_${contractName}.contract_class.json`;
        const casmPath = `./target/dev/starkpays_contracts_${contractName}.compiled_contract_class.json`;
        
        if (!fs.existsSync(sierraPath) || !fs.existsSync(casmPath)) {
            throw new Error(`Archivos compilados no encontrados para ${contractName}`);
        }

        const compiledContract = JSON.parse(fs.readFileSync(sierraPath).toString());
        const compiledCasm = JSON.parse(fs.readFileSync(casmPath).toString());

        console.log(`📋 Declarando ${contractName} con RPC directo...`);
        
        // Crear transacción de declaración manual
        const declarePayload = {
            jsonrpc: "2.0",
            method: "starknet_addDeclareTransaction",
            params: {
                declare_transaction: {
                    type: "DECLARE",
                    contract_class: compiledContract,
                    casm: compiledCasm,
                    sender_address: ACCOUNT_ADDRESS,
                    version: "0x1",
                    max_fee: "0x5f5e100",
                    nonce: "0x0",
                    signature: []
                }
            },
            id: 1
        };

        console.log(`🔧 Enviando transacción de declaración...`);
        const declareResponse = await fetch(RPC_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(declarePayload)
        });

        const declareResult = await declareResponse.json();
        
        if (declareResult.error) {
            throw new Error(`Error en declaración: ${JSON.stringify(declareResult.error)}`);
        }

        const classHash = declareResult.result.class_hash;
        const declareTxHash = declareResult.result.transaction_hash;
        
        console.log(`✅ Contrato ${contractName} declarado con classHash: ${classHash}`);
        console.log(`📝 Transaction Hash: ${declareTxHash}`);

        console.log(`🛠️ Desplegando instancia de ${contractName}...`);
        
        // Crear transacción de despliegue manual
        const deployPayload = {
            jsonrpc: "2.0",
            method: "starknet_addDeployTransaction",
            params: {
                deploy_transaction: {
                    type: "DEPLOY",
                    class_hash: classHash,
                    constructor_calldata: constructorCalldata,
                    version: "0x1",
                    max_fee: "0x5f5e100",
                    nonce: "0x1",
                    signature: []
                }
            },
            id: 2
        };

        console.log(`🔧 Enviando transacción de despliegue...`);
        const deployResponse = await fetch(RPC_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deployPayload)
        });

        const deployResult = await deployResponse.json();
        
        if (deployResult.error) {
            throw new Error(`Error en despliegue: ${JSON.stringify(deployResult.error)}`);
        }

        const contractAddress = deployResult.result.contract_address;
        const deployTxHash = deployResult.result.transaction_hash;
        
        console.log(`✅ Contrato ${contractName} desplegado en la dirección: ${contractAddress}`);
        console.log(`📝 Transaction Hash: ${deployTxHash}`);

        return {
            address: contractAddress,
            classHash: classHash,
            transactionHash: deployTxHash,
        };

    } catch (error: any) {
        console.error(`❌ Error desplegando ${contractName}:`, error.message);
        throw error;
    }
}

async function main() {
    console.log("🚀 Desplegando contratos REALES con RPC directo...");
    console.log(`💰 Cuenta: ${ACCOUNT_ADDRESS}`);
    console.log(`🌐 RPC: ${RPC_URL}`);
    console.log("🎯 Iniciando deployment REAL con RPC directo en Starknet Sepolia...\n");

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
        console.log("\n🚀 Iniciando deployment de contratos con RPC directo...");
        
        const paymentProcessor = await deployContractWithDirectRPC("PaymentProcessor", [ownerAddress]);
        const remesaVault = await deployContractWithDirectRPC("RemesaVault", [ownerAddress]);
        const tandaSavings = await deployContractWithDirectRPC("TandaSavings", [ownerAddress]);

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
                method: "direct_rpc_mcp_cairo_real_deployment",
            },
        };

        // Guardar configuración
        fs.writeFileSync("contracts-deployed.json", JSON.stringify(deployedConfig, null, 2));
        
        console.log("\n🎉 ¡Deployment REAL con RPC directo completado exitosamente!");
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
