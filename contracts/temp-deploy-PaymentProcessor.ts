
import { Account, Contract, json, RpcProvider, constants } from "starknet";

const provider = new RpcProvider({ nodeUrl: "https://starknet-sepolia.public.blastapi.io" });
const account = new Account(provider, "tu_direccion_cuenta_aqui", "tu_clave_privada_aqui");

async function deployContract() {
    const compiledContract = json.parse(fs.readFileSync("./target/dev/starkpays_contracts_PaymentProcessor.contract_class.json").toString());
    const compiledCasm = json.parse(fs.readFileSync("./target/dev/starkpays_contracts_PaymentProcessor.compiled_contract_class.json").toString());
    
    console.log("Declarando contrato...");
    const declareResponse = await account.declare({ contract: compiledContract, casm: compiledCasm });
    await provider.waitForTransaction(declareResponse.transaction_hash);
    console.log("Class Hash:", declareResponse.class_hash);
    
    console.log("Desplegando contrato...");
    const deployResponse = await account.deploy({ 
        classHash: declareResponse.class_hash, 
        constructorCalldata: [tu_direccion_cuenta_aqui] 
    });
    await provider.waitForTransaction(deployResponse.transaction_hash);
    console.log("Contract Address:", deployResponse.contract_address);
    console.log("Transaction Hash:", deployResponse.transaction_hash);
}

deployContract().catch(console.error);
