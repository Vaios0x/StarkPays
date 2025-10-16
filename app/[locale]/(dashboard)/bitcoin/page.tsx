"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Bitcoin, 
  ArrowRight, 
  ArrowLeft, 
  TrendingUp, 
  Shield, 
  Zap,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBitcoin } from "@/lib/integrations/bitcoin/provider";
import { toast } from "sonner";

export default function BitcoinPage() {
  const { 
    isConnected, 
    isInitialized, 
    address, 
    balance, 
    connect, 
    sendBitcoin, 
    processRemittance,
    createBitcoinTanda 
  } = useBitcoin();
  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'send' | 'receive' | 'tandas'>('send');
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    message: ''
  });

  const bitcoinStats = [
    {
      title: "Balance Total",
      value: `${balance.total.toFixed(6)} BTC`,
      change: "+2.5%",
      icon: Bitcoin,
      color: "from-orange-500 to-orange-700"
    },
    {
      title: "Transacciones",
      value: "47",
      change: "+12%",
      icon: TrendingUp,
      color: "from-green-500 to-green-700"
    },
    {
      title: "Velocidad",
      value: "0.3s",
      change: "Instantáneo",
      icon: Zap,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Seguridad",
      value: "100%",
      change: "Protegido",
      icon: Shield,
      color: "from-purple-500 to-purple-700"
    }
  ];

  const handleConnect = async () => {
    setLoading(true);
    try {
      const result = await connect();
      if (result.success) {
        toast.success("✅ Bitcoin wallet conectado", {
          description: `Dirección: ${result.address?.slice(0, 10)}...`
        });
      } else {
        toast.error("❌ Error conectando Bitcoin wallet");
      }
    } catch (error) {
      toast.error("❌ Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleSendBitcoin = async () => {
    if (!isConnected) {
      toast.error("Conecta tu Bitcoin wallet primero");
      return;
    }

    setLoading(true);
    try {
      const result = await sendBitcoin(formData.recipient, parseFloat(formData.amount));
      toast.success("✅ Bitcoin enviado", {
        description: `TX: ${result.txid}`
      });
    } catch (error) {
      toast.error("❌ Error enviando Bitcoin");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBitcoinTanda = async () => {
    if (!isConnected) {
      toast.error("Conecta tu Bitcoin wallet primero");
      return;
    }

    setLoading(true);
    try {
      const result = await createBitcoinTanda(0.001, 8, 7);
      if (result.success) {
        toast.success("✅ Tanda Bitcoin creada", {
          description: `ID: ${result.tandaId}`
        });
      }
    } catch (error) {
      toast.error("❌ Error creando tanda Bitcoin");
    } finally {
      setLoading(false);
    }
  };

  const handleProcessRemittance = async () => {
    if (!isConnected) {
      toast.error("Conecta tu Bitcoin wallet primero");
      return;
    }

    setLoading(true);
    try {
      const result = await processRemittance(0.001, formData.recipient);
      if (result.success) {
        toast.success("✅ Remesa Bitcoin procesada", {
          description: `MXN: $${result.mxnAmount.toLocaleString()}`
        });
      }
    } catch (error) {
      toast.error("❌ Error procesando remesa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Neural Background */}
      <div className="absolute inset-0 bg-neural-mesh opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 glass-card mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center neural-glow">
              <Bitcoin className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-dark-200">Bitcoin Integration</span>
            <div className="w-2 h-2 bg-orange-400 rounded-full neural-pulse"></div>
          </div>
          
          <h1 className="text-5xl font-bold text-dark-100 mb-6">
            Bitcoin <span className="neural-text">Neural</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Integración completa con Bitcoin para remesas y tandas. Conecta con Xverse y Atomiq.
          </p>
        </motion.div>

        {/* Connection Status */}
        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <Card className="glass-card-dark neural-connection max-w-md mx-auto">
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-6 neural-glow">
                  <Bitcoin className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-dark-100 mb-4">
                  Conecta tu Bitcoin Wallet
                </h3>
                
                <p className="text-dark-300 mb-8">
                  Conecta con Xverse para acceder a todas las funcionalidades de Bitcoin
                </p>
                
                <Button
                  onClick={handleConnect}
                  disabled={loading}
                  className="neural-button w-full text-lg py-4"
                  size="lg"
                >
                  <Bitcoin className="w-5 h-5 mr-2" />
                  {loading ? 'Conectando...' : 'Conectar Xverse'}
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
            >
              {bitcoinStats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="glass-card-dark neural-connection">
                    <div className="p-6 text-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold neural-text mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-dark-400 mb-1">
                        {stat.title}
                      </div>
                      <div className="text-xs text-green-400">
                        {stat.change}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex space-x-1 glass-card-dark p-1 rounded-2xl max-w-md mx-auto">
                {[
                  { id: 'send', label: 'Enviar', icon: ArrowRight },
                  { id: 'receive', label: 'Recibir', icon: ArrowLeft },
                  { id: 'tandas', label: 'Tandas', icon: TrendingUp }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-neural-gradient text-white neural-glow'
                        : 'text-dark-300 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {activeTab === 'send' && (
                <Card className="glass-card-dark neural-connection">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-dark-100 mb-6">
                      Enviar Bitcoin
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <Label className="text-dark-200 mb-2">Dirección de destino</Label>
                        <Input
                          value={formData.recipient}
                          onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                          placeholder="bc1q..."
                          className="glass-input"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-dark-200 mb-2">Cantidad (BTC)</Label>
                        <Input
                          type="number"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                          placeholder="0.001"
                          className="glass-input"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-dark-200 mb-2">Mensaje (opcional)</Label>
                        <Input
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Mensaje para el destinatario"
                          className="glass-input"
                        />
                      </div>
                      
                      <div className="flex space-x-4">
                        <Button
                          onClick={handleSendBitcoin}
                          disabled={loading}
                          className="neural-button flex-1"
                        >
                          <Bitcoin className="w-4 h-4 mr-2" />
                          {loading ? 'Enviando...' : 'Enviar Bitcoin'}
                        </Button>
                        
                        <Button
                          onClick={handleProcessRemittance}
                          disabled={loading}
                          variant="outline"
                          className="glass-button border-neural-500 text-dark-100 hover:bg-glass-white flex-1"
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          Remesa MXN
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {activeTab === 'receive' && (
                <Card className="glass-card-dark neural-connection">
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-dark-100 mb-6">
                      Recibir Bitcoin
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="w-48 h-48 bg-dark-800 rounded-2xl flex items-center justify-center mx-auto">
                        <QrCode className="w-24 h-24 text-dark-400" />
                      </div>
                      
                      <div>
                        <Label className="text-dark-200 mb-2">Tu dirección Bitcoin</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            value={address || ''}
                            readOnly
                            className="glass-input"
                          />
                          <Button
                            onClick={() => {
                              navigator.clipboard.writeText(address || '');
                              toast.success("Dirección copiada");
                            }}
                            variant="outline"
                            size="sm"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-sm text-dark-300">
                        Comparte esta dirección para recibir Bitcoin
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {activeTab === 'tandas' && (
                <Card className="glass-card-dark neural-connection">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-dark-100 mb-6">
                      Tandas Bitcoin
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-dark-200 mb-2">Contribución (BTC)</Label>
                          <Input
                            type="number"
                            placeholder="0.001"
                            className="glass-input"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-dark-200 mb-2">Máximo miembros</Label>
                          <Input
                            type="number"
                            placeholder="8"
                            className="glass-input"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-dark-200 mb-2">Frecuencia (días)</Label>
                        <Input
                          type="number"
                          placeholder="7"
                          className="glass-input"
                        />
                      </div>
                      
                      <Button
                        onClick={handleCreateBitcoinTanda}
                        disabled={loading}
                        className="neural-button w-full"
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        {loading ? 'Creando...' : 'Crear Tanda Bitcoin'}
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          </>
        )}
      </div>
    </main>
  );
}
