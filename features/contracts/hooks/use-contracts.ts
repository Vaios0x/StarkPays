"use client";

import { useAccount, useContract, useProvider } from "@starknet-react/core";
import { useMemo } from "react";
import { getContractAddresses, getSupportedTokens, getNetworkConfig } from "@/lib/starknet/contracts";

export function useStarkpaysContracts() {
  const { account } = useAccount();
  const { provider } = useProvider();
  
  const contractAddresses = getContractAddresses();
  const supportedTokens = getSupportedTokens();
  const networkConfig = getNetworkConfig();

  // PaymentProcessor contract
  const paymentProcessor = useContract({
    abi: [], // ABI será cargado dinámicamente
    address: contractAddresses.PaymentProcessor,
  });

  // RemesaVault contract
  const remesaVault = useContract({
    abi: [], // ABI será cargado dinámicamente
    address: contractAddresses.RemesaVault,
  });

  // TandaSavings contract
  const tandaSavings = useContract({
    abi: [], // ABI será cargado dinámicamente
    address: contractAddresses.TandaSavings,
  });

  const contracts = useMemo(() => ({
    paymentProcessor,
    remesaVault,
    tandaSavings,
    addresses: contractAddresses,
    tokens: supportedTokens,
    network: networkConfig,
  }), [paymentProcessor, remesaVault, tandaSavings, contractAddresses, supportedTokens, networkConfig]);

  return {
    contracts,
    account,
    provider,
    isConnected: !!account,
  };
}

// Hook específico para PaymentProcessor
export function usePaymentProcessor() {
  const { contracts, account, provider } = useStarkpaysContracts();
  
  const processPayment = async (
    merchant: string,
    amount: string,
    token: string
  ) => {
    if (!account || !contracts.paymentProcessor || !provider) {
      throw new Error("Account, contract or provider not available");
    }

    try {
      const result = await account.execute({
        contractAddress: contracts.addresses.PaymentProcessor,
        entrypoint: "process_payment",
        calldata: [merchant, amount, token],
      });
      
      return result;
    } catch (error) {
      console.error("Error processing payment:", error);
      throw error;
    }
  };

  const getStats = async () => {
    if (!contracts.paymentProcessor || !provider) {
      throw new Error("Contract or provider not available");
    }

    try {
      const result = await provider.callContract({
        contractAddress: contracts.addresses.PaymentProcessor,
        entrypoint: "get_stats",
        calldata: [],
      });
      return result;
    } catch (error) {
      console.error("Error getting stats:", error);
      throw error;
    }
  };

  return {
    processPayment,
    getStats,
    contract: contracts.paymentProcessor,
  };
}

// Hook específico para RemesaVault
export function useRemesaVault() {
  const { contracts, account, provider } = useStarkpaysContracts();
  
  const initiateTransfer = async (
    to: string,
    amount: string,
    token: string,
    aiScore: number
  ) => {
    if (!account || !contracts.remesaVault) {
      throw new Error("Account or contract not available");
    }

    try {
      const result = await account.execute({
        contractAddress: contracts.addresses.RemesaVault,
        entrypoint: "initiate_transfer",
        calldata: [to, amount, token, aiScore],
      });
      
      return result;
    } catch (error) {
      console.error("Error initiating transfer:", error);
      throw error;
    }
  };

  const completeTransfer = async (
    transferId: string,
    familyCode: string
  ) => {
    if (!account || !contracts.remesaVault) {
      throw new Error("Account or contract not available");
    }

    try {
      const result = await account.execute({
        contractAddress: contracts.addresses.RemesaVault,
        entrypoint: "complete_transfer",
        calldata: [transferId, familyCode],
      });
      
      return result;
    } catch (error) {
      console.error("Error completing transfer:", error);
      throw error;
    }
  };

  const addFamilyMember = async (member: string) => {
    if (!account || !contracts.remesaVault) {
      throw new Error("Account or contract not available");
    }

    try {
      const result = await account.execute({
        contractAddress: contracts.addresses.RemesaVault,
        entrypoint: "add_family_member",
        calldata: [member],
      });
      
      return result;
    } catch (error) {
      console.error("Error adding family member:", error);
      throw error;
    }
  };

  return {
    initiateTransfer,
    completeTransfer,
    addFamilyMember,
    contract: contracts.remesaVault,
  };
}

// Hook específico para TandaSavings
export function useTandaSavings() {
  const { contracts, account, provider } = useStarkpaysContracts();
  
  const createTanda = async (
    name: string,
    description: string,
    contributionAmount: string,
    frequencyDays: string,
    maxMembers: string,
    token: string
  ) => {
    if (!account || !contracts.tandaSavings) {
      throw new Error("Account or contract not available");
    }

    try {
      const result = await account.execute({
        contractAddress: contracts.addresses.TandaSavings,
        entrypoint: "create_tanda",
        calldata: [name, description, contributionAmount, frequencyDays, maxMembers, token],
      });
      
      return result;
    } catch (error) {
      console.error("Error creating tanda:", error);
      throw error;
    }
  };

  const joinTanda = async (tandaId: string) => {
    if (!account || !contracts.tandaSavings) {
      throw new Error("Account or contract not available");
    }

    try {
      const result = await account.execute({
        contractAddress: contracts.addresses.TandaSavings,
        entrypoint: "join_tanda",
        calldata: [tandaId],
      });
      
      return result;
    } catch (error) {
      console.error("Error joining tanda:", error);
      throw error;
    }
  };

  const contribute = async (tandaId: string) => {
    if (!account || !contracts.tandaSavings) {
      throw new Error("Account or contract not available");
    }

    try {
      const result = await account.execute({
        contractAddress: contracts.addresses.TandaSavings,
        entrypoint: "contribute",
        calldata: [tandaId],
      });
      
      return result;
    } catch (error) {
      console.error("Error contributing to tanda:", error);
      throw error;
    }
  };

  const executePayout = async (tandaId: string, round: string) => {
    if (!account || !contracts.tandaSavings) {
      throw new Error("Account or contract not available");
    }

    try {
      const result = await account.execute({
        contractAddress: contracts.addresses.TandaSavings,
        entrypoint: "execute_payout",
        calldata: [tandaId, round],
      });
      
      return result;
    } catch (error) {
      console.error("Error executing payout:", error);
      throw error;
    }
  };

  return {
    createTanda,
    joinTanda,
    contribute,
    executePayout,
    contract: contracts.tandaSavings,
  };
}
