"use client";
import { motion } from "framer-motion";
import { PayWithChipiButton } from "@/components/pay-with-chipi-button";
import { useWalletWithAuth } from "@/features/wallet/hooks/use-wallet-with-auth";
import { WalletStatus } from "@/components/wallet/WalletStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Shield, DollarSign, Zap, Lock, Brain, Network, 
  CheckCircle, AlertTriangle, Sparkles, TrendingUp 
} from "lucide-react";
import { useState } from "react";

export default function MerchantPage() {
  const { 
    wallet, 
    isLoading, 
    isError, 
    error,
    setWalletPin, 
    needsPin, 
    needsWallet, 
    createWallet, 
    isCreatingWallet 
  } = useWalletWithAuth();
  const [pin, setPin] = useState("");
  const [isSubmittingPin, setIsSubmittingPin] = useState(false);
  
  const handlePinSubmit = async () => {
    if (!pin.trim()) return;
    setIsSubmittingPin(true);
    setWalletPin(pin);
    setIsSubmittingPin(false);
  };

  const handleCreateWallet = async () => {
    if (!pin.trim()) return;
    setIsSubmittingPin(true);
    setWalletPin(pin);
    await createWallet();
    setIsSubmittingPin(false);
  };

  if (needsPin) {
    return (
      <main className="min-h-screen bg-dark-950 relative overflow-hidden">
        <Navbar />
        
        {/* Neural Background */}
        <div className="absolute inset-0 bg-neural-mesh opacity-30" />
        
        {/* Floating Neural Elements */}
        {[...Array(8)].map((_, i) => {
          const positions = [
            { top: 20, left: 20 },
            { top: 40, left: 80 },
            { top: 60, left: 30 },
            { top: 80, left: 70 },
            { top: 30, left: 50 },
            { top: 70, left: 40 },
            { top: 10, left: 10 },
            { top: 90, left: 90 }
          ];
          
          const pos = positions[i] || positions[0];
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neural-500 rounded-full neural-pulse"
              style={{
                top: `${pos.top}%`,
                left: `${pos.left}%`,
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + (i * 0.3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          );
        })}
        
        <div className="relative z-10 flex items-center justify-center min-h-screen py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-dark rounded-3xl p-8 w-full max-w-md"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-neural-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 neural-glow">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-dark-100 mb-2">
                Acceso Neural
              </h1>
              <p className="text-dark-300">
                Ingresa tu PIN para acceder a tu wallet neural
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="pin" className="text-dark-200 font-medium">
                  PIN del Wallet Neural
                </Label>
                <Input
                  id="pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Ingresa tu PIN neural"
                  onKeyDown={(e) => e.key === "Enter" && handlePinSubmit()}
                  className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400"
                  tabIndex={0}
                  aria-label="PIN del wallet"
                />
              </div>
              
              <Button 
                onClick={handlePinSubmit} 
                disabled={!pin.trim() || isSubmittingPin}
                className="w-full neural-button"
              >
                {isSubmittingPin ? (
                  <span className="flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Verificando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Acceder Neural
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </main>
    );
  }

  if (needsWallet) {
    return (
      <main className="min-h-screen bg-dark-950 relative overflow-hidden">
        <Navbar />
        
        {/* Neural Background */}
        <div className="absolute inset-0 bg-neural-mesh opacity-30" />
        
        {/* Floating Neural Elements */}
        {[...Array(8)].map((_, i) => {
          const positions = [
            { top: 20, left: 20 },
            { top: 40, left: 80 },
            { top: 60, left: 30 },
            { top: 80, left: 70 },
            { top: 30, left: 50 },
            { top: 70, left: 40 },
            { top: 10, left: 10 },
            { top: 90, left: 90 }
          ];
          
          const pos = positions[i] || positions[0];
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neural-500 rounded-full neural-pulse"
              style={{
                top: `${pos.top}%`,
                left: `${pos.left}%`,
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + (i * 0.3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          );
        })}
        
        <div className="relative z-10 flex items-center justify-center min-h-screen py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-dark rounded-3xl p-8 w-full max-w-md"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 neural-glow">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-dark-100 mb-2">
                Crear Wallet Neural
              </h1>
              <p className="text-dark-300">
                Crea tu wallet segura para comenzar a usar ChipiPay Neural
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="pin" className="text-dark-200 font-medium">
                  PIN de Seguridad Neural
                </Label>
                <Input
                  id="pin"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Crea un PIN neural seguro"
                  onKeyDown={(e) => e.key === "Enter" && handleCreateWallet()}
                  className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400"
                  tabIndex={0}
                  aria-label="PIN de seguridad"
                />
                <p className="text-sm text-dark-400 mt-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-neural-400" />
                  Este PIN protegerá tu wallet neural. Guárdalo en un lugar seguro.
                </p>
              </div>
              
              <Button 
                onClick={handleCreateWallet} 
                disabled={!pin.trim() || isSubmittingPin || isCreatingWallet}
                className="w-full neural-button"
              >
                {isSubmittingPin || isCreatingWallet ? (
                  <span className="flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Creando Wallet Neural...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Crear Wallet Neural
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-dark-950 relative overflow-hidden">
        <Navbar />
        
        {/* Neural Background */}
        <div className="absolute inset-0 bg-neural-mesh opacity-30" />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-neural-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 neural-glow"
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-dark-100 mb-2">Cargando Wallet Neural...</h2>
            <p className="text-dark-300">Conectando con ChipiPay Neural</p>
          </motion.div>
        </div>
        
        <Footer />
      </main>
    );
  }

  if (isError || !wallet) {
    return (
      <main className="min-h-screen bg-dark-950 relative overflow-hidden">
        <Navbar />
        
        {/* Neural Background */}
        <div className="absolute inset-0 bg-neural-mesh opacity-30" />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-dark rounded-3xl p-8 w-full max-w-md text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6 neural-glow">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-red-400 mb-2">Error de Conexión Neural</h2>
            <p className="text-dark-300">
              No se pudo conectar con tu wallet neural. Por favor, inicia sesión nuevamente.
            </p>
          </motion.div>
        </div>
        
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-950 relative overflow-hidden">
      <Navbar />
      
      {/* Neural Background */}
      <div className="absolute inset-0 bg-neural-mesh opacity-20" />
      
      {/* Floating Neural Elements */}
      {[...Array(12)].map((_, i) => {
        const positions = [
          { top: 10, left: 15 },
          { top: 30, left: 85 },
          { top: 50, left: 25 },
          { top: 70, left: 75 },
          { top: 20, left: 45 },
          { top: 60, left: 35 },
          { top: 5, left: 65 },
          { top: 40, left: 95 },
          { top: 80, left: 55 },
          { top: 25, left: 5 },
          { top: 90, left: 30 },
          { top: 15, left: 80 }
        ];
        
        const pos = positions[i] || positions[0];
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neural-500 rounded-full neural-pulse"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + (i * 0.3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        );
      })}
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 glass-card mb-8">
            <div className="w-8 h-8 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
              <span className="text-white text-sm">🧠</span>
            </div>
            <span className="text-sm font-medium text-dark-200">ChipiPay Neural Activo</span>
            <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
          </div>
          
          <div className="w-24 h-24 bg-neural-gradient rounded-3xl flex items-center justify-center mx-auto mb-8 neural-glow">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-dark-100 mb-6">
            Pago con <span className="neural-text">ChipiPay Neural</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Transacción segura protegida por IA neural con detección de fraudes en tiempo real
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Payment Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card-dark rounded-3xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center neural-glow">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-dark-100">Detalles del Pago Neural</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-dark-800">
                <span className="text-dark-300">Monto:</span>
                <span className="font-bold text-2xl neural-text">$0.10 USD</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-dark-800">
                <span className="text-dark-300">Comisión Neural:</span>
                <span className="font-bold text-green-400 text-lg">$0.00</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-dark-300 text-lg">Total:</span>
                <span className="font-bold text-3xl neural-text">$0.10 USD</span>
              </div>
              
              <div className="mt-6 p-4 glass-card rounded-2xl">
                <div className="flex items-center space-x-3 text-sm text-dark-300">
                  <Zap className="w-5 h-5 text-neural-400" />
                  <span>Transacción gasless con ChipiPay Neural</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Wallet Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <WalletStatus 
              wallet={wallet} 
              isLoading={isLoading} 
              isError={isError} 
              error={error} 
            />
          </motion.div>
        </div>

        {/* Payment Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-16"
        >
          <PayWithChipiButton
            costumerWallet={wallet}
            amountUsd={0.1}
            label="Proceder con el Pago Neural"
          />
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-card-dark rounded-3xl p-8 text-center neural-connection"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 neural-glow">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-dark-100 mb-3">Detección Neural</h3>
            <p className="text-dark-300">
              IA neural analiza cada transacción en tiempo real con 99.7% de precisión
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-card-dark rounded-3xl p-8 text-center neural-connection"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 neural-glow">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-dark-100 mb-3">Gasless Neural</h3>
            <p className="text-dark-300">
              Sin fees de gas gracias a ChipiPay Neural y optimización de rutas IA
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-card-dark rounded-3xl p-8 text-center neural-connection"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 neural-glow">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-dark-100 mb-3">Fees Optimizados</h3>
            <p className="text-dark-300">
              Comisiones desde 0.5% vs 3-5% tradicional con optimización neural
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </main>
  );
}
