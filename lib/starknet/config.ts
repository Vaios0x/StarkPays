import { sepolia, mainnet } from "@starknet-react/chains";

export const STARKNET_CONFIG = {
  chains: [mainnet, sepolia],
  contracts: {
    remesaVault: {
      address: "0x0", // Will be set after deployment
      abi: require("@/contracts/target/dev/remesa_vault_RemesaVault.contract_class.json").abi,
    },
  },
  tokens: {
    USDC: {
      address: "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
      decimals: 6,
      symbol: "USDC",
    },
    STRK: {
      address: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
      decimals: 18,
      symbol: "STRK",
    },
  },
};

export const REOWN_PROJECT_ID = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!;
export const CHIPI_API_KEY = process.env.NEXT_PUBLIC_CHIPI_API_KEY!;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
