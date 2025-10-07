"use client";

import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { BitcoinManager } from "./xverse";

interface BitcoinContextType {
  isConnected: boolean;
  isInitialized: boolean;
  address: string | null;
  balance: {
    total: number;
    confirmed: number;
    unconfirmed: number;
  };
  connect: () => Promise<{ success: boolean; address?: string; error?: string }>;
  sendBitcoin: (to: string, amount: number) => Promise<any>;
  processRemittance: (amount: number, recipient: string) => Promise<any>;
  createBitcoinTanda: (contribution: number, maxMembers: number, frequency: number) => Promise<any>;
}

const BitcoinContext = createContext<BitcoinContextType>({
  isConnected: false,
  isInitialized: false,
  address: null,
  balance: { total: 0, confirmed: 0, unconfirmed: 0 },
  connect: async () => ({ success: false }),
  sendBitcoin: async () => ({}),
  processRemittance: async () => ({}),
  createBitcoinTanda: async () => ({})
});

export function BitcoinProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState({ total: 0, confirmed: 0, unconfirmed: 0 });
  const [bitcoinManager] = useState(() => new BitcoinManager());

  useEffect(() => {
    const initBitcoin = async () => {
      try {
        // Verificar si ya está conectado
        const storedAddress = localStorage.getItem('starkpays_bitcoin_address');
        if (storedAddress) {
          setAddress(storedAddress);
          setIsConnected(true);
          
          // Obtener balance
          const balanceData = await bitcoinManager.getBalance();
          setBalance(balanceData);
        }
        
        setIsInitialized(true);
        console.log("✅ Bitcoin Manager initialized");
      } catch (error) {
        console.error("❌ Bitcoin Manager init error:", error);
        setIsInitialized(true);
      }
    };

    initBitcoin();
  }, [bitcoinManager]);

  const connect = async () => {
    try {
      const result = await bitcoinManager.connect();
      
      if (result.success && result.address) {
        setAddress(result.address);
        setIsConnected(true);
        
        // Guardar en localStorage
        localStorage.setItem('starkpays_bitcoin_address', result.address);
        
        // Obtener balance
        const balanceData = await bitcoinManager.getBalance();
        setBalance(balanceData);
      }
      
      return result;
    } catch (error) {
      console.error("❌ Error connecting Bitcoin:", error);
      return { success: false, error: "Failed to connect" };
    }
  };

  const sendBitcoin = async (to: string, amount: number) => {
    try {
      const result = await bitcoinManager.sendBitcoin(to, amount);
      
      // Actualizar balance
      const newBalance = await bitcoinManager.getBalance();
      setBalance(newBalance);
      
      return result;
    } catch (error) {
      console.error("❌ Error sending Bitcoin:", error);
      throw error;
    }
  };

  const processRemittance = async (amount: number, recipient: string) => {
    try {
      const result = await bitcoinManager.processBitcoinRemittance(amount, recipient);
      return result;
    } catch (error) {
      console.error("❌ Error processing Bitcoin remittance:", error);
      throw error;
    }
  };

  const createBitcoinTanda = async (contribution: number, maxMembers: number, frequency: number) => {
    try {
      const result = await bitcoinManager.createBitcoinTanda(contribution, maxMembers, frequency);
      return result;
    } catch (error) {
      console.error("❌ Error creating Bitcoin tanda:", error);
      throw error;
    }
  };

  return (
    <BitcoinContext.Provider
      value={{
        isConnected,
        isInitialized,
        address,
        balance,
        connect,
        sendBitcoin,
        processRemittance,
        createBitcoinTanda
      }}
    >
      {children}
    </BitcoinContext.Provider>
  );
}

export const useBitcoin = () => useContext(BitcoinContext);
