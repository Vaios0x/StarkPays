"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface SendMoneyParams {
  to: string;
  amount: number;
  currency?: string;
  message?: string;
}

interface ChipiPayResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

export function useChipiPay() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chipiPay, setChipiPay] = useState<any>(null);

  useEffect(() => {
    const initializeChipi = async () => {
      try {
        if (typeof window !== "undefined" && window.chipiPay) {
          setChipiPay(window.chipiPay);
          setIsInitialized(true);
        } else {
          // Mock Chipi Pay para desarrollo
          const mockChipi = {
            createWallet: async (params: any) => ({ 
              success: true, 
              wallet: "mock-wallet-" + Math.random().toString(36).substr(2, 9) 
            }),
            getWallet: async () => {
              // Simular que no hay wallet inicialmente
              return null;
            },
            sendTransaction: async (params: any) => ({ 
              success: true, 
              transactionHash: "0x" + Math.random().toString(16).substr(2, 8) 
            }),
            getBalance: async (token: string) => Math.floor(Math.random() * 1000),
            getTransactionHistory: async () => [],
            connectSocial: async (provider: string) => ({ success: true, provider }),
            onrampFiat: async (params: any) => ({ success: true, amount: params.amount }),
          };
          
          setChipiPay(mockChipi);
          setIsInitialized(true);
        }
      } catch (error) {
        console.error("Error initializing Chipi Pay:", error);
        toast.error("Error inicializando Chipi Pay");
      }
    };

    initializeChipi();
  }, []);

  const createWallet = async (method: "social" | "email" = "social", provider?: string) => {
    if (!chipiPay) {
      throw new Error("Chipi Pay no inicializado");
    }

    setIsLoading(true);
    try {
      const result = await chipiPay.createWallet({
        method,
        provider: provider || "google",
        paymasterEnabled: true,
      });

      toast.success("✅ Wallet creado", {
        description: "Tu wallet está lista para usar",
      });

      return result;
    } catch (error: any) {
      toast.error("❌ Error creando wallet", {
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendMoney = async (params: SendMoneyParams): Promise<ChipiPayResult> => {
    if (!chipiPay) {
      throw new Error("Chipi Pay no inicializado");
    }

    setIsLoading(true);
    try {
      // 1. Verificar/crear wallet si no existe
      let wallet = await chipiPay.getWallet();
      if (!wallet) {
        wallet = await createWallet();
      }

      // 2. Convertir fiat a crypto si es necesario
      const onrampResult = await chipiPay.onrampFiat({
        amount: params.amount,
        currency: params.currency || "USD",
        targetToken: "USDC",
        usePaymaster: true, // Gasless
      });

      // 3. Enviar transacción
      const result = await chipiPay.sendTransaction({
        to: params.to,
        amount: params.amount,
        token: "USDC",
        usePaymaster: true, // Gasless transaction
        message: params.message,
      });

      return {
        success: true,
        transactionHash: result.transactionHash,
      };
    } catch (error: any) {
      console.error("Error sending money:", error);
      return {
        success: false,
        error: error.message || "Error desconocido",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const getBalance = async (token: string = "USDC") => {
    if (!chipiPay) return 0;

    try {
      const balance = await chipiPay.getBalance(token);
      return balance;
    } catch (error) {
      console.error("Error getting balance:", error);
      return 0;
    }
  };

  const getTransactionHistory = async () => {
    if (!chipiPay) return [];

    try {
      const history = await chipiPay.getTransactionHistory();
      return history;
    } catch (error) {
      console.error("Error getting transaction history:", error);
      return [];
    }
  };

  const connectSocial = async (provider: "google" | "discord" | "github") => {
    if (!chipiPay) {
      throw new Error("Chipi Pay no inicializado");
    }

    setIsLoading(true);
    try {
      const result = await chipiPay.connectSocial(provider);
      toast.success(`✅ Conectado con ${provider}`);
      return result;
    } catch (error: any) {
      toast.error(`❌ Error conectando con ${provider}`, {
        description: error.message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInitialized,
    isLoading,
    createWallet,
    sendMoney,
    getBalance,
    getTransactionHistory,
    connectSocial,
  };
}
