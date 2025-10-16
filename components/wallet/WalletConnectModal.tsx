"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Wallet, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";
import { getStarknet } from "@starknet-io/get-starknet-core";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (wallet: any) => void;
}

export function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableWallets, setAvailableWallets] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      checkAvailableWallets();
    }
  }, [isOpen]);

  const checkAvailableWallets = async () => {
    try {
      // Verificar window.starknet primero
      const windowStarknet = (window as any).starknet;
      if (windowStarknet) {
        console.log("Window starknet available:", windowStarknet);
        setAvailableWallets([{ id: "argentX", name: "Argent X", isConnected: windowStarknet.isConnected }]);
        return;
      }
      
      // Fallback a getStarknet
      const starknet = getStarknet();
      if (!starknet) {
        console.log("Starknet not available");
        setAvailableWallets([]);
        return;
      }
      
      const wallets = await starknet.getAvailableWallets();
      console.log("Available wallets:", wallets);
      setAvailableWallets(wallets);
    } catch (err) {
      console.error("Error checking wallets:", err);
      setAvailableWallets([]);
    }
  };

  const connectToArgentX = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      console.log("Starting Argent X connection process...");
      
      // Método directo: Usar window.starknet directamente
      const windowStarknet = (window as any).starknet;
      console.log("Window starknet available:", !!windowStarknet);
      
      if (!windowStarknet) {
        throw new Error("Argent X no está instalado. Por favor, instala la extensión de Argent X.");
      }

      // Verificar si Argent X está disponible
      if (!windowStarknet.isConnected) {
        console.log("Argent X not connected, attempting to connect...");
        
        try {
          // Intentar conectar directamente
          await windowStarknet.enable();
          console.log("Argent X enabled successfully");
        } catch (enableError) {
          console.log("Enable error:", enableError);
          // Continuar aunque haya error, a veces es normal
        }
      }

      // Obtener la cuenta directamente
      let account;
      try {
        account = await windowStarknet.account;
        console.log("Account obtained from window.starknet:", account);
      } catch (accountError) {
        console.log("Error getting account from window.starknet:", accountError);
        
        // Método alternativo: usar getStarknet
        try {
          const starknet = getStarknet();
          if (starknet) {
            account = await (starknet as any).account;
            console.log("Account obtained from getStarknet:", account);
          }
        } catch (getStarknetError) {
          console.log("Error with getStarknet:", getStarknetError);
          throw new Error("No se pudo obtener la cuenta de la wallet. Asegúrate de que Argent X esté desbloqueado.");
        }
      }

      if (!account || !account.address) {
        throw new Error("No se pudo obtener la cuenta de la wallet. Asegúrate de que Argent X esté desbloqueado y autorizado.");
      }

      // Crear objeto de wallet con la estructura esperada
      const walletObject = {
        address: account.address,
        account: account,
        publicKey: account.address,
        balance: 0
      };
      
      console.log("Wallet object created successfully:", walletObject);
      onConnect(walletObject);
      onClose();
      
    } catch (err: any) {
      console.error("Error connecting to Argent X:", err);
      setError(err.message || "Error al conectar con Argent X");
    } finally {
      setIsConnecting(false);
    }
  };

  const installArgentX = () => {
    window.open("https://chrome.google.com/webstore/detail/argent-x/dlcobpjiigpikoobohmabehhmhfoodbb", "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Conectar Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Estado de conexión */}
          {isConnecting && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
              <span className="text-blue-700 dark:text-blue-300">
                Conectando con Argent X...
              </span>
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
            >
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-700 dark:text-red-300 font-medium">Error de conexión</p>
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Información sobre Argent X */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Argent X
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  La wallet más segura y fácil de usar para Starknet
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-2">
              {availableWallets.some(wallet => 
                wallet.id === "argentX" || wallet.name?.toLowerCase().includes("argent")
              ) ? (
                <Button
                  onClick={connectToArgentX}
                  disabled={isConnecting}
                  className="w-full neural-button"
                  tabIndex={0}
                  aria-label="Conectar con Argent X"
                >
                  {isConnecting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Conectando...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      Conectar con Argent X
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    onClick={installArgentX}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    tabIndex={0}
                    aria-label="Instalar Argent X"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Instalar Argent X
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Argent X no está instalado. Haz clic para instalarlo.
                  </p>
                </div>
              )}
            </div>

            {/* Información adicional */}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>• Argent X es la wallet oficial de Starknet</p>
              <p>• Soporte completo para contratos inteligentes</p>
              <p>• Interfaz intuitiva y segura</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
