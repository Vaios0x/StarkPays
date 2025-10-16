"use client";

import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";
import { sepolia, mainnet } from "@starknet-react/chains";
import { RpcProvider } from "starknet";
import { toast } from "sonner";

interface StarknetContextType {
  isConnected: boolean;
  address: string | null;
  chain: string;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchChain: (chainId: string) => Promise<void>;
}

const StarknetContext = createContext<StarknetContextType>({
  isConnected: false,
  address: null,
  chain: "sepolia",
  connect: async () => {},
  disconnect: () => {},
  switchChain: async () => {},
});

export function StarknetProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [chain, setChain] = useState("sepolia");

  useEffect(() => {
    // Verificar conexión existente
    const savedAddress = localStorage.getItem("starknet_address");
    const savedChain = localStorage.getItem("starknet_chain");
    
    if (savedAddress) {
      setAddress(savedAddress);
      setIsConnected(true);
    }
    
    if (savedChain) {
      setChain(savedChain);
    }
  }, []);

  const connect = async () => {
    try {
      // Simular conexión con wallet
      const mockAddress = "0x" + Math.random().toString(16).substr(2, 40);
      setAddress(mockAddress);
      setIsConnected(true);
      localStorage.setItem("starknet_address", mockAddress);
      localStorage.setItem("starknet_chain", chain);
      
      toast.success("✅ Conectado a Starknet", {
        description: `Dirección: ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
      });
    } catch (error: any) {
      toast.error("❌ Error conectando", {
        description: error.message,
      });
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    localStorage.removeItem("starknet_address");
    localStorage.removeItem("starknet_chain");
    toast.success("✅ Desconectado");
  };

  const switchChain = async (chainId: string) => {
    try {
      setChain(chainId);
      localStorage.setItem("starknet_chain", chainId);
      toast.success(`✅ Red cambiada a ${chainId}`);
    } catch (error: any) {
      toast.error("❌ Error cambiando red", {
        description: error.message,
      });
    }
  };

  const queryClient = new QueryClient();

  const connectors = [
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
  ];

  const provider = (chain: any) => new RpcProvider({
    nodeUrl: chain.id === sepolia.id
      ? "https://starknet-sepolia.public.blastapi.io"
      : "https://starknet-mainnet.public.blastapi.io"
  });

  const chains = [
    {
      ...sepolia,
      paymasterRpcUrls: {
        "0x1": {
          http: ["https://starknet-sepolia.public.blastapi.io"],
          webSocket: ["wss://starknet-sepolia.public.blastapi.io"]
        },
        "0x2": {
          http: ["https://starknet-sepolia.public.blastapi.io"],
          webSocket: ["wss://starknet-sepolia.public.blastapi.io"]
        }
      }
    },
    {
      ...mainnet,
      paymasterRpcUrls: {
        "0x1": {
          http: ["https://starknet-mainnet.public.blastapi.io"],
          webSocket: ["wss://starknet-mainnet.public.blastapi.io"]
        },
        "0x2": {
          http: ["https://starknet-mainnet.public.blastapi.io"],
          webSocket: ["wss://starknet-mainnet.public.blastapi.io"]
        }
      }
    }
  ];

  return (
    <StarknetContext.Provider 
      value={{ 
        isConnected, 
        address, 
        chain,
        connect, 
        disconnect, 
        switchChain 
      }}
    >
      <QueryClientProvider client={queryClient}>
        <StarknetConfig
          chains={chains}
          connectors={connectors}
          provider={provider}
          autoConnect
        >
          {children}
        </StarknetConfig>
      </QueryClientProvider>
    </StarknetContext.Provider>
  );
}

export const useStarknet = () => useContext(StarknetContext);
