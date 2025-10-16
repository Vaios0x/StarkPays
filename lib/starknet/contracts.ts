// Configuración de contratos desplegados
export interface ContractConfig {
  address: string;
  transactionHash: string;
}

export interface DeployedContracts {
  PaymentProcessor: ContractConfig;
  RemesaVault: ContractConfig;
  TandaSavings: ContractConfig;
}

// Direcciones de contratos en testnet (actualizar después del despliegue)
export const CONTRACT_ADDRESSES = {
  // Sepolia Testnet
  sepolia: {
    PaymentProcessor: "0x0000000000000000000000000000000000000000000000000000000000000000", // Actualizar
    RemesaVault: "0x0000000000000000000000000000000000000000000000000000000000000000", // Actualizar
    TandaSavings: "0x0000000000000000000000000000000000000000000000000000000000000000", // Actualizar
  },
  // Mainnet (cuando esté listo)
  mainnet: {
    PaymentProcessor: "0x0000000000000000000000000000000000000000000000000000000000000000",
    RemesaVault: "0x0000000000000000000000000000000000000000000000000000000000000000",
    TandaSavings: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
} as const;

// Tokens ERC20 soportados en testnet
export const SUPPORTED_TOKENS = {
  sepolia: {
    ETH: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c7b7f7c7b7f7c7b7f7c7b",
    USDC: "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
  },
  mainnet: {
    ETH: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c7b7f7c7b7f7c7b7f7c7b",
    USDC: "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
  },
} as const;

// Configuración de red
export const NETWORK_CONFIG = {
  sepolia: {
    rpcUrl: "https://starknet-sepolia.public.blastapi.io",
    chainId: "0x534e5f5345504f4c4941",
    name: "Starknet Sepolia",
  },
  mainnet: {
    rpcUrl: "https://starknet-mainnet.public.blastapi.io",
    chainId: "0x534e5f4d41494e",
    name: "Starknet Mainnet",
  },
} as const;

// ABI de los contratos (simplificado para el frontend)
export const CONTRACT_ABIS = {
  PaymentProcessor: {
    process_payment: {
      inputs: ["merchant", "amount", "token"],
      outputs: ["payment_id"],
    },
    get_stats: {
      inputs: [],
      outputs: ["total_volume", "total_transactions", "total_fees"],
    },
    register_merchant: {
      inputs: ["merchant"],
      outputs: [],
    },
  },
  RemesaVault: {
    initiate_transfer: {
      inputs: ["to", "amount", "token", "ai_score"],
      outputs: ["transfer_id"],
    },
    complete_transfer: {
      inputs: ["transfer_id", "family_code"],
      outputs: [],
    },
    add_family_member: {
      inputs: ["member"],
      outputs: [],
    },
  },
  TandaSavings: {
    create_tanda: {
      inputs: ["name", "description", "contribution_amount", "frequency_days", "max_members", "token"],
      outputs: ["tanda_id"],
    },
    join_tanda: {
      inputs: ["tanda_id"],
      outputs: [],
    },
    contribute: {
      inputs: ["tanda_id"],
      outputs: [],
    },
    execute_payout: {
      inputs: ["tanda_id", "round"],
      outputs: [],
    },
  },
} as const;

// Función para obtener la configuración de red actual
export function getCurrentNetworkConfig() {
  const isMainnet = process.env.NODE_ENV === "production";
  return isMainnet ? "mainnet" : "sepolia";
}

// Función para obtener las direcciones de contratos actuales
export function getContractAddresses() {
  const network = getCurrentNetworkConfig();
  return CONTRACT_ADDRESSES[network];
}

// Función para obtener tokens soportados
export function getSupportedTokens() {
  const network = getCurrentNetworkConfig();
  return SUPPORTED_TOKENS[network];
}

// Función para obtener configuración de red
export function getNetworkConfig() {
  const network = getCurrentNetworkConfig();
  return NETWORK_CONFIG[network];
}
