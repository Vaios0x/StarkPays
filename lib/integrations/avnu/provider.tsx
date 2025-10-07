"use client";

import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface AVNUContextType {
  isInitialized: boolean;
  gasStrategy: GasStrategy;
  selectGasStrategy: (user: User) => Promise<GasStrategy>;
  executePayment: (strategy: GasStrategy, to: string, amount: string) => Promise<any>;
  getGasEstimate: (to: string, amount: string) => Promise<number>;
}

export type GasStrategy = "chipi-sponsored" | "avnu-sponsored" | "avnu-usdc";

export interface User {
  txCount: number;
  walletType: "chipi" | "external";
}

const AVNUContext = createContext<AVNUContextType>({
  isInitialized: false,
  gasStrategy: "chipi-sponsored",
  selectGasStrategy: async () => "chipi-sponsored",
  executePayment: async () => ({}),
  getGasEstimate: async () => 0,
});

export function AVNUProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [gasStrategy, setGasStrategy] = useState<GasStrategy>("chipi-sponsored");

  useEffect(() => {
    const initAVNU = async () => {
      try {
        // Inicializar AVNU SDK
        if (typeof window !== "undefined") {
          // Mock AVNU para desarrollo
          const mockAVNU = {
            selectGasStrategy: async (user: User): Promise<GasStrategy> => {
              // Primeras 10 txs: Chipi sponsorship
              if (user.walletType === "chipi" && user.txCount < 10) {
                return "chipi-sponsored";
              }
              
              // Después: AVNU con USDC
              return "avnu-usdc";
            },
            executePayment: async (strategy: GasStrategy, to: string, amount: string) => {
              if (strategy === "chipi-sponsored") {
                console.log("💸 Executing via Chipi Pay (gasless)");
                return {
                  success: true,
                  transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
                  gasUsed: "0",
                  strategy: "chipi-sponsored"
                };
              } else if (strategy === "avnu-usdc") {
                console.log("💰 Executing via AVNU (pay gas with USDC)");
                return {
                  success: true,
                  transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
                  gasUsed: "0.02",
                  strategy: "avnu-usdc"
                };
              }
            },
            getGasEstimate: async (to: string, amount: string) => {
              // Estimación de gas basada en la estrategia
              const baseGas = 0.02;
              const amountNum = parseFloat(amount);
              
              if (amountNum > 1000) return baseGas * 1.5;
              if (amountNum > 500) return baseGas * 1.2;
              return baseGas;
            }
          };
          
          // Simular inicialización
          await new Promise(resolve => setTimeout(resolve, 1000));
          setIsInitialized(true);
          console.log("✅ AVNU SDK initialized");
        }
      } catch (error) {
        console.error("❌ AVNU init error:", error);
        toast.error("Error inicializando AVNU");
      }
    };

    initAVNU();
  }, []);

  const selectGasStrategy = async (user: User): Promise<GasStrategy> => {
    try {
      // Lógica de selección de estrategia de gas
      if (user.walletType === "chipi" && user.txCount < 10) {
        setGasStrategy("chipi-sponsored");
        return "chipi-sponsored";
      }
      
      setGasStrategy("avnu-usdc");
      return "avnu-usdc";
    } catch (error) {
      console.error("Error selecting gas strategy:", error);
      return "chipi-sponsored";
    }
  };

  const executePayment = async (strategy: GasStrategy, to: string, amount: string) => {
    try {
      if (strategy === "chipi-sponsored") {
        // Usar Chipi Pay (gasless)
        console.log("💸 Executing via Chipi Pay (gasless)");
        toast.success("💸 Transacción gasless ejecutada", {
          description: "Patrocinada por Chipi Pay",
        });
        return {
          success: true,
          transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
          gasUsed: "0",
          strategy: "chipi-sponsored"
        };
      } else if (strategy === "avnu-usdc") {
        // Usar AVNU Paymaster (pagar con USDC)
        console.log("💰 Executing via AVNU (pay gas with USDC)");
        toast.success("💰 Transacción ejecutada", {
          description: "Gas pagado con USDC via AVNU",
        });
        return {
          success: true,
          transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
          gasUsed: "0.02",
          strategy: "avnu-usdc"
        };
      }
    } catch (error: any) {
      toast.error("❌ Error ejecutando pago", {
        description: error.message,
      });
      throw error;
    }
  };

  const getGasEstimate = async (to: string, amount: string): Promise<number> => {
    try {
      const amountNum = parseFloat(amount);
      const baseGas = 0.02;
      
      if (amountNum > 1000) return baseGas * 1.5;
      if (amountNum > 500) return baseGas * 1.2;
      return baseGas;
    } catch (error) {
      console.error("Error getting gas estimate:", error);
      return 0.02;
    }
  };

  return (
    <AVNUContext.Provider 
      value={{ 
        isInitialized, 
        gasStrategy,
        selectGasStrategy, 
        executePayment, 
        getGasEstimate 
      }}
    >
      {children}
    </AVNUContext.Provider>
  );
}

export const useAVNU = () => useContext(AVNUContext);
