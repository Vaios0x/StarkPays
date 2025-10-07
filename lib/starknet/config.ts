import { sepolia, mainnet } from "@starknet-react/chains";

export const STARKNET_CONFIG = {
  // Redes soportadas
  networks: {
    sepolia: {
      ...sepolia,
      name: "Starknet Sepolia",
      rpcUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7",
    },
    mainnet: {
      ...mainnet,
      name: "Starknet Mainnet",
      rpcUrl: "https://starknet-mainnet.public.blastapi.io/rpc/v0_7",
    },
  },
  
  // Configuración de contratos
  contracts: {
    sepolia: {
      remesaVault: "0x1234567890abcdef1234567890abcdef12345678", // Mock address
      usdc: "0x1234567890abcdef1234567890abcdef12345679", // Mock USDC
    },
    mainnet: {
      remesaVault: "0x1234567890abcdef1234567890abcdef12345678", // Mock address
      usdc: "0x1234567890abcdef1234567890abcdef12345679", // Mock USDC
    },
  },
  
  // Configuración de gas
  gas: {
    maxFee: "0x1000000000000", // 1 ETH
    maxPriorityFee: "0x100000000000", // 0.1 ETH
  },
  
  // Configuración de tokens soportados
  supportedTokens: {
    USDC: {
      address: "0x1234567890abcdef1234567890abcdef12345679",
      decimals: 6,
      symbol: "USDC",
      name: "USD Coin",
    },
    USDT: {
      address: "0x1234567890abcdef1234567890abcdef12345680",
      decimals: 6,
      symbol: "USDT",
      name: "Tether USD",
    },
  },
};

export const getNetworkConfig = (chainId: string) => {
  return STARKNET_CONFIG.networks[chainId as keyof typeof STARKNET_CONFIG.networks] || STARKNET_CONFIG.networks.sepolia;
};

export const getContractAddress = (chainId: string, contract: string) => {
  return STARKNET_CONFIG.contracts[chainId as keyof typeof STARKNET_CONFIG.contracts]?.[contract as keyof typeof STARKNET_CONFIG.contracts.sepolia] || "";
};