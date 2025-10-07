"use client";

import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { PrivacyManager } from "./zero-knowledge";

interface PrivacyContextType {
  isInitialized: boolean;
  hasAnonymousIdentity: boolean;
  privacyLevel: 'high' | 'medium' | 'low';
  anonymousIdentity: AnonymousIdentity | null;
  createAnonymousIdentity: (userData: any) => Promise<void>;
  processPrivateTransaction: (amount: number, recipient: string) => Promise<any>;
}

interface AnonymousIdentity {
  commitment: string;
  nullifier: string;
  proof: {
    proof: string;
    publicInputs: string[];
    verificationKey: string;
  };
}

const PrivacyContext = createContext<PrivacyContextType>({
  isInitialized: false,
  hasAnonymousIdentity: false,
  privacyLevel: 'low',
  anonymousIdentity: null,
  createAnonymousIdentity: async () => {},
  processPrivateTransaction: async () => ({ success: false })
});

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasAnonymousIdentity, setHasAnonymousIdentity] = useState(false);
  const [privacyLevel, setPrivacyLevel] = useState<'high' | 'medium' | 'low'>('low');
  const [anonymousIdentity, setAnonymousIdentity] = useState<AnonymousIdentity | null>(null);
  const [privacyManager] = useState(() => new PrivacyManager());

  useEffect(() => {
    const initPrivacy = async () => {
      try {
        // Verificar si ya existe identidad anónima
        const storedIdentity = localStorage.getItem('starkpays_anonymous_identity');
        if (storedIdentity) {
          const identity = JSON.parse(storedIdentity);
          setAnonymousIdentity(identity);
          setHasAnonymousIdentity(true);
          setPrivacyLevel('high');
        }
        
        setIsInitialized(true);
        console.log("✅ Privacy Manager initialized");
      } catch (error) {
        console.error("❌ Privacy Manager init error:", error);
        setIsInitialized(true);
      }
    };

    initPrivacy();
  }, []);

  const createAnonymousIdentity = async (userData: {
    age: number;
    country: string;
    kycLevel: number;
  }) => {
    try {
      const identity = await privacyManager.createAnonymousIdentity(userData);
      setAnonymousIdentity(identity);
      setHasAnonymousIdentity(true);
      setPrivacyLevel('high');
      
      // Guardar en localStorage
      localStorage.setItem('starkpays_anonymous_identity', JSON.stringify(identity));
      
      console.log("✅ Anonymous identity created");
    } catch (error) {
      console.error("❌ Error creating anonymous identity:", error);
    }
  };

  const processPrivateTransaction = async (amount: number, recipient: string) => {
    if (!anonymousIdentity) {
      throw new Error("No anonymous identity available");
    }

    try {
      const result = await privacyManager.processPrivateTransaction(
        amount,
        recipient,
        anonymousIdentity
      );
      
      return result;
    } catch (error) {
      console.error("❌ Error processing private transaction:", error);
      return { success: false, privacyLevel: 'low' };
    }
  };

  return (
    <PrivacyContext.Provider
      value={{
        isInitialized,
        hasAnonymousIdentity,
        privacyLevel,
        anonymousIdentity,
        createAnonymousIdentity,
        processPrivateTransaction
      }}
    >
      {children}
    </PrivacyContext.Provider>
  );
}

export const usePrivacy = () => useContext(PrivacyContext);
