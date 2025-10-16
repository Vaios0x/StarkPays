import { useState, useEffect } from "react";
import { getStarknet } from "@starknet-io/get-starknet-core";

export function useWalletWithAuth() {
  const [encryptKey, setEncryptKey] = useState<string>("");
  const [wallet, setWallet] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [needsWallet, setNeedsWallet] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Verificar si ya hay una wallet conectada al cargar
  useEffect(() => {
    checkExistingConnection();
    
    // Escuchar cambios en la wallet
    const handleWalletChange = () => {
      checkExistingConnection();
    };
    
    // Agregar listener para cambios de wallet
    window.addEventListener('starknet:accountsChanged', handleWalletChange);
    window.addEventListener('starknet:chainChanged', handleWalletChange);
    
    return () => {
      window.removeEventListener('starknet:accountsChanged', handleWalletChange);
      window.removeEventListener('starknet:chainChanged', handleWalletChange);
    };
  }, []);

  const checkExistingConnection = async () => {
    try {
      const starknet = getStarknet();
      if (starknet) {
        // Verificar si hay una cuenta conectada
        try {
          // Verificar si la wallet está autorizada
          const isAuthorized = await (starknet as any).isPreauthorized();
          if (isAuthorized) {
            const account = await (starknet as any).account;
            if (account && account.address) {
              setWallet({
                address: account.address,
                publicKey: account.address,
                account: account,
                balance: 0, // Se puede obtener el balance real aquí
              });
              setIsConnected(true);
              setNeedsWallet(false);
              console.log("Wallet connected:", account.address);
            }
          }
        } catch (err) {
          // No hay cuenta conectada
          console.log("No wallet connected:", err);
        }
      } else {
        console.log("Starknet not available");
      }
    } catch (err) {
      console.error("Error checking existing connection:", err);
    }
  };

  const setWalletPin = (pin: string) => {
    setEncryptKey(pin);
  };

  const connectWallet = async (connectedWallet: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Connecting wallet:", connectedWallet);
      
      // Verificar que la wallet tenga una dirección
      if (!connectedWallet || !connectedWallet.address) {
        throw new Error("No se pudo obtener la dirección de la wallet");
      }
      
      // Crear el objeto de wallet con la estructura correcta
      const walletData = {
        address: connectedWallet.address,
        publicKey: connectedWallet.publicKey || connectedWallet.address,
        account: connectedWallet.account || connectedWallet,
        balance: connectedWallet.balance || 0,
      };
      
      setWallet(walletData);
      setIsConnected(true);
      setNeedsWallet(false);
      
      console.log("Wallet connected successfully:", walletData.address);
    } catch (err: any) {
      console.error("Error connecting wallet:", err);
      setError(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      const starknet = getStarknet();
      if (starknet && starknet.disconnect) {
        await starknet.disconnect();
      }
      setWallet(null);
      setIsConnected(false);
      setNeedsWallet(true);
    } catch (err) {
      console.error("Error disconnecting wallet:", err);
    }
  };

  const createWallet = async () => {
    if (!encryptKey) return;
    
    setIsLoading(true);
    
    // Simulate wallet creation
    setTimeout(() => {
      setWallet({
        publicKey: "0x" + Math.random().toString(16).substr(2, 40),
        encryptedPrivateKey: "encrypted_" + Math.random().toString(16).substr(2, 20),
        balance: Math.floor(Math.random() * 1000),
      });
      setIsLoading(false);
      setNeedsWallet(false);
    }, 2000);
  };

  const refetch = async () => {
    if (!isConnected) return;
    
    setIsLoading(true);
    
    try {
      const starknet = getStarknet();
      if (starknet) {
        try {
          const account = (starknet as any).account;
          if (account) {
            setWallet({
              address: account.address,
              publicKey: account.address,
              account: account,
              balance: 0,
            });
          }
        } catch (err) {
          console.error("Error getting account:", err);
        }
      }
    } catch (err) {
      console.error("Error refetching wallet:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    wallet,
    isLoading,
    isError,
    error,
    refetch,
    setWalletPin,
    needsPin: !encryptKey,
    needsWallet,
    createWallet,
    isCreatingWallet: isLoading,
    isConnected,
    connectWallet,
    disconnectWallet,
  };
}
