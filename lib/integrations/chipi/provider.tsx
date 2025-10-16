"use client";

import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface ChipiContextType {
  isInitialized: boolean;
  isConnected: boolean;
  address: string | null;
  balance: number;
  createWallet: (method?: "social" | "email", provider?: string) => Promise<any>;
  sendTransaction: (params: SendTransactionParams) => Promise<any>;
  getBalance: (token?: string) => Promise<number>;
  connectSocial: (provider: string) => Promise<any>;
  disconnect: () => void;
}

interface SendTransactionParams {
  to: string;
  amount: number;
  token?: string;
  message?: string;
}

const ChipiContext = createContext<ChipiContextType>({
  isInitialized: false,
  isConnected: false,
  address: null,
  balance: 0,
  createWallet: async () => ({}),
  sendTransaction: async () => ({}),
  getBalance: async () => 0,
  connectSocial: async () => ({}),
  disconnect: () => {},
});

export function ChipiProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [chipiPay, setChipiPay] = useState<any>(null);

  useEffect(() => {
    const initChipi = async () => {
      if (typeof window === "undefined") return;

      try {
        // Inicializar Chipi Pay SDK
        if (window.chipiPay) {
          setChipiPay(window.chipiPay);
          setIsInitialized(true);
          console.log("✅ Chipi Pay initialized");
        } else {
          // Mock para desarrollo
          const mockChipi = {
            createWallet: async (params: any) => {
              const wallet = "0x" + Math.random().toString(16).substr(2, 40);
              return { success: true, wallet, address: wallet };
            },
            getWallet: async () => {
              return localStorage.getItem("chipi_wallet") ? {
                address: localStorage.getItem("chipi_wallet"),
                balance: Math.floor(Math.random() * 1000)
              } : null;
            },
            sendTransaction: async (params: any) => ({
              success: true,
              transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
              gasUsed: "0.02"
            }),
            getBalance: async (token: string = "USDC") => Math.floor(Math.random() * 1000),
            connectSocial: async (provider: string) => ({
              success: true,
              provider,
              address: "0x" + Math.random().toString(16).substr(2, 40)
            }),
            disconnect: () => {
              localStorage.removeItem("chipi_wallet");
            }
          };
          
          setChipiPay(mockChipi);
          setIsInitialized(true);
          console.log("✅ Chipi Pay mock initialized");
        }
      } catch (error) {
        console.error("❌ Chipi Pay init error:", error);
        toast.error("Error inicializando Chipi Pay");
      }
    };

    initChipi();
  }, []);

  const createWallet = async (method: "social" | "email" = "social", provider?: string) => {
    if (!chipiPay) throw new Error("Chipi Pay no inicializado");

    try {
      const result = await chipiPay.createWallet({
        method,
        provider: provider || "google",
        paymasterEnabled: true,
      });

      if (result.success) {
        setAddress(result.address);
        setIsConnected(true);
        localStorage.setItem("chipi_wallet", result.address);
        toast.success("✅ Wallet creado", {
          description: "Tu wallet está lista para usar",
        });
      }

      return result;
    } catch (error: any) {
      toast.error("❌ Error creando wallet", {
        description: error.message,
      });
      throw error;
    }
  };

  const sendTransaction = async (params: SendTransactionParams) => {
    if (!chipiPay) throw new Error("Chipi Pay no inicializado");

    try {
      const result = await chipiPay.sendTransaction({
        to: params.to,
        amount: params.amount,
        token: params.token || "USDC",
        usePaymaster: true, // Gasless transaction
        message: params.message,
      });

      if (result.success) {
        toast.success("✅ Transacción enviada", {
          description: `Hash: ${result.transactionHash?.slice(0, 10)}...`,
        });
      }

      return result;
    } catch (error: any) {
      toast.error("❌ Error enviando transacción", {
        description: error.message,
      });
      throw error;
    }
  };

  const getBalance = async (token: string = "USDC") => {
    if (!chipiPay) return 0;

    try {
      const balance = await chipiPay.getBalance(token);
      setBalance(balance);
      return balance;
    } catch (error) {
      console.error("Error getting balance:", error);
      return 0;
    }
  };

  const connectSocial = async (provider: string) => {
    if (!chipiPay) throw new Error("Chipi Pay no inicializado");

    try {
      const result = await chipiPay.connectSocial(provider);
      
      if (result.success) {
        setAddress(result.address);
        setIsConnected(true);
        localStorage.setItem("chipi_wallet", result.address);
        toast.success(`✅ Conectado con ${provider}`);
      }

      return result;
    } catch (error: any) {
      toast.error(`❌ Error conectando con ${provider}`, {
        description: error.message,
      });
      throw error;
    }
  };

  const disconnect = () => {
    if (chipiPay) {
      chipiPay.disconnect();
    }
    setAddress(null);
    setIsConnected(false);
    setBalance(0);
    localStorage.removeItem("chipi_wallet");
    toast.success("✅ Desconectado");
  };

  return (
    <ChipiContext.Provider 
      value={{ 
        isInitialized, 
        isConnected, 
        address, 
        balance,
        createWallet, 
        sendTransaction, 
        getBalance, 
        connectSocial, 
        disconnect 
      }}
    >
      {children}
    </ChipiContext.Provider>
  );
}

export const useChipiPay = () => useContext(ChipiContext);
