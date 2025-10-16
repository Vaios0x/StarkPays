"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Brain, CheckCircle2, DollarSign, Clock, Network, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { useStarknet } from "@/lib/starknet/provider";
import { toast } from "sonner";
import { AIGuardian } from "@/components/dashboard/AIGuardian";
import { useTranslations } from "next-intl";

export default function SendPage() {
  const { isConnected, address, connect } = useStarknet();
  const t = useTranslations();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    message: "",
  });
  const [aiScore, setAiScore] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  // Verificar conexión de wallet
  useEffect(() => {
    const checkConnection = () => {
      const savedAddress = localStorage.getItem("starknet_address");
      const connected = !!savedAddress;
      setWalletConnected(connected);
    };

    checkConnection();
    
    // Verificar cada segundo si hay cambios
    const interval = setInterval(checkConnection, 1000);
    
    return () => clearInterval(interval);
  }, [isConnected, address]);

  const handleFraudCheck = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai/fraud-detection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: "user_address",
          recipient: formData.recipient,
          amount: parseFloat(formData.amount),
          currency: "USD",
          timestamp: Date.now(),
          userHistory: {
            avgAmount: 250,
            frequency: 4,
            lastTransactionTime: Date.now() - 86400000,
            totalTransactions: 12,
          },
        }),
      });

      const data = await response.json();
      setAiScore(data.riskScore);

      if (data.blocked) {
        toast.error("⚠️ " + t('errors.transaction_blocked'), {
          description: t('errors.suspicious_pattern'),
        });
      } else {
        setStep(2);
        toast.success("✓ " + t('success.analysis_completed'), {
          description: t('send.security_score', { score: 100 - data.riskScore }),
        });
      }
    } catch (error) {
      toast.error(t('errors.security_analysis_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!walletConnected) {
      toast.error(t('errors.wallet_not_connected'));
      return;
    }

    setLoading(true);
    try {
      // Simular envío de dinero
      const mockResult = {
        success: true,
        transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
      };

      if (mockResult.success) {
        setStep(3);
        toast.success("✅ " + t('success.money_sent'), {
          description: `Hash: ${mockResult.transactionHash?.slice(0, 10)}...`,
        });
      } else {
        toast.error("❌ " + t('errors.send_error'), {
          description: t('errors.unknown_error'),
        });
      }
    } catch (error: any) {
      toast.error(t('errors.generic_error') + ": " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-950 relative overflow-hidden">
      
      {/* Neural Background */}
      <div className="absolute inset-0 bg-neural-mesh opacity-20" />
      
      {/* Floating Neural Elements */}
      {[...Array(15)].map((_, i) => {
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
          { top: 15, left: 80 },
          { top: 35, left: 10 },
          { top: 65, left: 90 },
          { top: 85, left: 20 }
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
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 glass-card mb-8">
            <div className="w-8 h-8 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
              <span className="text-white text-sm">🧠</span>
            </div>
            <span className="text-sm font-medium text-dark-200">{t('send.neural_system')}</span>
            <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
          </div>
          
          <h1 className="text-5xl font-bold text-dark-100 mb-6">
            {t('send.title')}
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            {t('send.subtitle')}
          </p>
          
          {!walletConnected && (
            <div className="mt-8">
              <div className="glass-card-dark rounded-2xl p-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-neural-gradient rounded-full flex items-center justify-center mx-auto mb-4 neural-glow">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-100 mb-2">
                    {t('send.connect_wallet')}
                  </h3>
                  <p className="text-dark-400 mb-6">
                    {t('send.connect_description')}
                  </p>
                  <Button
                    onClick={connect}
                    className="neural-button text-lg px-8 py-4"
                    size="lg"
                  >
                    <Brain className="w-6 h-6 mr-3" />
                    {t('wallet.connect')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center mb-16"
        >
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all ${
                  step >= s
                    ? "bg-neural-gradient text-white neural-glow"
                    : "glass-card text-dark-400"
                }`}
              >
                {s}
              </motion.div>
              {s < 3 && (
                <div
                  className={`w-20 h-1 mx-4 rounded-full transition-all ${
                    step > s ? "bg-neural-gradient" : "bg-dark-800"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Step 1: Recipient & Amount */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-dark rounded-3xl p-8 neural-connection"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center neural-glow">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-dark-100">Datos de Envío Neural</h2>
                <p className="text-dark-400">Protegido por IA Guardian</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <Label className="text-dark-200 font-medium mb-3 block">
                  Destinatario (Wallet o Email)
                </Label>
                <Input
                  placeholder="0x... o email@ejemplo.com"
                  value={formData.recipient}
                  onChange={(e) =>
                    setFormData({ ...formData, recipient: e.target.value })
                  }
                  className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400"
                />
              </div>

              <div>
                <Label className="text-dark-200 font-medium mb-3 block">
                  Cantidad (USD)
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="500"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400 pl-10"
                  />
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-neural-400 w-5 h-5" />
                </div>
                <div className="mt-3 p-4 glass-card rounded-2xl">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-dark-400">Comisión Neural:</span>
                      <span className="text-green-400 font-semibold ml-2">
                        ${(parseFloat(formData.amount || "0") * 0.005).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-dark-400">Total:</span>
                      <span className="text-neural-400 font-bold ml-2">
                        ${(parseFloat(formData.amount || "0") * 1.005).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-dark-200 font-medium mb-3 block">
                  Mensaje (opcional)
                </Label>
                <Input
                  placeholder="Para la renta..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400"
                />
              </div>

              <Button
                onClick={handleFraudCheck}
                disabled={!formData.recipient || !formData.amount || loading}
                className="w-full neural-button text-lg py-4"
                size="lg"
              >
                {loading ? (
                  <span className="flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                    />
                    Analizando seguridad neural...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Continuar con IA
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Smart Routing */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-dark rounded-3xl p-8 neural-connection"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center neural-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-dark-100">Ruta Neural Óptima</h2>
                <p className="text-dark-400">IA seleccionó la mejor ruta</p>
              </div>
            </div>
            
            {/* Ruta Principal */}
            <div className="glass-card rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-neural-gradient rounded-2xl flex items-center justify-center neural-glow">
                    <Network className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark-100">ChipiPay Neural + Starknet</h3>
                    <p className="text-dark-400">Más rápido y económico</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold neural-text mb-1">5 min</div>
                  <div className="text-sm text-green-400">$0.02 fee</div>
                </div>
              </div>
            </div>

            {/* Alternativas */}
            <div className="space-y-4 mb-8">
              <h4 className="text-lg font-semibold text-dark-200 mb-4">Rutas Alternativas:</h4>
              <div className="grid gap-4">
                <div className="flex justify-between items-center p-4 glass-card rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-dark-300">SPEI</span>
                  </div>
                  <span className="text-dark-100">60 min • $0.15</span>
                </div>
                <div className="flex justify-between items-center p-4 glass-card rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-dark-300">Lightning</span>
                  </div>
                  <span className="text-dark-100">2 min • $0.01</span>
                </div>
              </div>
            </div>

            {/* Seguridad IA */}
            <div className="glass-card rounded-2xl p-6 mb-8 border border-green-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center neural-glow">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-green-400 font-semibold">
                    IA Guardian: Transacción segura
                  </p>
                  <p className="text-sm text-dark-400">
                    Score de seguridad: {100 - aiScore}/100
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="glass-button border-dark-600 text-dark-300 hover:bg-glass-white flex-1"
              >
                Volver
              </Button>
              <Button 
                onClick={handleSend} 
                className="flex-1 neural-button" 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Confirmar Envío Neural
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-dark rounded-3xl p-12 text-center neural-connection"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-3xl flex items-center justify-center mx-auto mb-8 neural-glow"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>

            <h3 className="text-4xl font-bold text-dark-100 mb-4">
              ¡Envío Neural Confirmado!
            </h3>
            <p className="text-xl text-dark-300 mb-12">
              Tu familia recibirá ${formData.amount} en ~5 minutos
            </p>

            <div className="glass-card rounded-2xl p-6 mb-8 max-w-md mx-auto">
              <p className="text-sm text-dark-400 mb-3">ID de Transacción Neural</p>
              <p className="font-mono text-sm text-dark-100 break-all">
                0x7b4f...9a2c
              </p>
            </div>

            {/* Stats de la transacción */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold neural-text mb-1">5 min</div>
                <div className="text-xs text-dark-400">Tiempo estimado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold neural-text mb-1">$0.02</div>
                <div className="text-xs text-dark-400">Fee neural</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold neural-text mb-1">99.7%</div>
                <div className="text-xs text-dark-400">Seguridad IA</div>
              </div>
            </div>

            <Button 
              onClick={() => setStep(1)} 
              className="neural-button"
            >
              <span className="flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Enviar Otro
              </span>
            </Button>
          </motion.div>
        )}
      </div>

      {/* AI Guardian Widget */}
      <AIGuardian />
      
      <Footer />
    </main>
  );
}
