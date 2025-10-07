"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  QrCode, 
  Copy, 
  Share, 
  Download, 
  Wallet, 
  Shield, 
  Brain, 
  Clock,
  CheckCircle2,
  DollarSign,
  ArrowDownLeft,
  Zap,
  Network
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIGuardian } from "@/components/dashboard/AIGuardian";
import { toast } from "sonner";

export default function ReceivePage() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock wallet address
  const walletAddress = "0x742d...8f3a";
  const qrCodeData = `starkpays:${walletAddress}?amount=${amount}&message=${encodeURIComponent(message)}`;

  const handleGenerateQR = async () => {
    setIsGenerating(true);
    // Simulate QR generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowQR(true);
    setIsGenerating(false);
    toast.success("QR Neural generado", {
      description: "Código listo para recibir pagos"
    });
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Dirección copiada", {
      description: "Dirección neural copiada al portapapeles"
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Recibir dinero con StarkPays Neural",
        text: `Envía dinero a mi dirección neural: ${walletAddress}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${window.location.href}?address=${walletAddress}`);
      toast.success("Enlace copiado", {
        description: "Enlace neural copiado al portapapeles"
      });
    }
  };

  return (
    <main className="min-h-screen bg-dark-950 relative overflow-hidden">
      <Navbar />
      
      {/* Neural Background */}
      <div className="absolute inset-0 bg-neural-mesh opacity-20" />
      
      {/* Floating Neural Elements */}
      {[...Array(15)].map((_, i) => {
        const positions = [
          { top: 10, left: 15 }, { top: 30, left: 85 }, { top: 50, left: 25 },
          { top: 70, left: 75 }, { top: 20, left: 45 }, { top: 60, left: 35 },
          { top: 5, left: 65 }, { top: 40, left: 95 }, { top: 80, left: 55 },
          { top: 25, left: 5 }, { top: 90, left: 30 }, { top: 15, left: 80 },
          { top: 35, left: 10 }, { top: 65, left: 90 }, { top: 85, left: 20 }
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
              <span className="text-white text-sm">📱</span>
            </div>
            <span className="text-sm font-medium text-dark-200">Receptor Neural Activo</span>
            <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
          </div>
          
          <h1 className="text-5xl font-bold text-dark-100 mb-6">
            Recibir <span className="neural-text">Dinero Neural</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Genera códigos QR neurales • Recibe pagos instantáneos • Protegido por IA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <Card className="glass-card-dark neural-connection">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center neural-glow">
                    <QrCode className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-dark-100">Código QR Neural</h2>
                    <p className="text-dark-400">Escanea para recibir pagos</p>
                  </div>
                </div>

                {/* QR Code Display */}
                <div className="text-center mb-8">
                  {showQR ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block p-6 glass-card rounded-3xl neural-glow"
                    >
                      <div className="w-64 h-64 bg-white rounded-2xl flex items-center justify-center">
                        <div className="w-56 h-56 bg-gradient-to-br from-neural-500 to-neural-700 rounded-xl flex items-center justify-center">
                          <QrCode className="w-32 h-32 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="w-64 h-64 bg-dark-800 rounded-2xl flex items-center justify-center mx-auto">
                      <div className="text-center">
                        <QrCode className="w-16 h-16 text-dark-400 mx-auto mb-4" />
                        <p className="text-dark-400">Genera tu código QR</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Amount and Message */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-dark-200 font-medium mb-2 block">
                      Cantidad (opcional)
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="500"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400 pl-10"
                      />
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-neural-400 w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <label className="text-dark-200 font-medium mb-2 block">
                      Mensaje (opcional)
                    </label>
                    <Input
                      placeholder="Para la renta..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleGenerateQR}
                  disabled={isGenerating}
                  className="w-full neural-button text-lg py-4"
                  size="lg"
                >
                  {isGenerating ? (
                    <span className="flex items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                      />
                      Generando QR Neural...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      Generar QR Neural
                    </span>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Wallet Address Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <Card className="glass-card-dark neural-connection">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center neural-glow">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-dark-100">Dirección Neural</h2>
                    <p className="text-dark-400">Tu wallet protegida por IA</p>
                  </div>
                </div>

                {/* Address Display */}
                <div className="glass-card rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-dark-400">Dirección Neural</span>
                    <Badge className="bg-neural-500/20 text-neural-400 border-neural-500/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Protegida por IA
                    </Badge>
                  </div>
                  <div className="font-mono text-sm text-dark-100 break-all bg-dark-800 p-3 rounded-xl">
                    {walletAddress}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Button
                    onClick={handleCopyAddress}
                    variant="outline"
                    className="glass-button border-neural-500 text-dark-100 hover:bg-glass-white"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="glass-button border-neural-500 text-dark-100 hover:bg-glass-white"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                </div>

                {/* Network Info */}
                <div className="glass-card rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-neural-500 to-neural-700 rounded-xl flex items-center justify-center">
                        <Network className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-dark-200 font-medium">Red Neural</p>
                        <p className="text-sm text-dark-400">Starknet + ChipiPay</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">Activa</p>
                      <p className="text-xs text-dark-400">0.5% fee</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Security Info */}
            <Card className="glass-card-dark neural-connection border border-green-500/20">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center neural-glow">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark-100">Protección Neural</h3>
                    <p className="text-sm text-dark-400">IA Guardian activa</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-dark-400">Detección de fraudes:</span>
                    <span className="text-green-400 font-semibold">✓ Activa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-400">Análisis de patrones:</span>
                    <span className="text-green-400 font-semibold">✓ Activa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-dark-400">Score de seguridad:</span>
                    <span className="text-neural-400 font-bold">98%</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="glass-card-dark neural-connection">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center neural-glow">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark-100">Actividad Reciente</h3>
                  <p className="text-dark-400">Últimos pagos recibidos</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass-card rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center">
                      <ArrowDownLeft className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-dark-100">Pago recibido</p>
                      <p className="text-sm text-dark-400">Hace 2 horas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">+$250.00</p>
                    <p className="text-xs text-dark-400">Completado</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 glass-card rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-dark-100">Pago rápido</p>
                      <p className="text-sm text-dark-400">Ayer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">+$150.00</p>
                    <p className="text-xs text-dark-400">Completado</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* AI Guardian Widget */}
      <AIGuardian />
      
      <Footer />
    </main>
  );
}