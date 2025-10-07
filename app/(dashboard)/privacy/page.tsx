"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Key, 
  CheckCircle2, 
  AlertTriangle,
  Brain,
  Zap,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { usePrivacy } from "@/lib/integrations/privacy/provider";
import { toast } from "sonner";

export default function PrivacyPage() {
  const { 
    isInitialized, 
    hasAnonymousIdentity, 
    privacyLevel, 
    anonymousIdentity,
    createAnonymousIdentity,
    processPrivateTransaction 
  } = usePrivacy();
  
  const [loading, setLoading] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    anonymousMode: false,
    zeroKnowledge: false,
    dataMinimization: true,
    encryptionLevel: 'high' as 'low' | 'medium' | 'high'
  });

  const privacyFeatures = [
    {
      icon: Shield,
      title: "Zero-Knowledge Proofs",
      description: "Transacciones privadas sin revelar datos personales",
      status: privacyLevel === 'high' ? 'active' : 'inactive',
      points: 500
    },
    {
      icon: Lock,
      title: "Anonymous Identity",
      description: "Identidad anónima para transacciones privadas",
      status: hasAnonymousIdentity ? 'active' : 'inactive',
      points: 300
    },
    {
      icon: Brain,
      title: "AI Privacy Protection",
      description: "IA que protege tu privacidad automáticamente",
      status: 'active',
      points: 400
    },
    {
      icon: Zap,
      title: "Private Transactions",
      description: "Envío de dinero sin rastro en blockchain",
      status: privacyLevel === 'high' ? 'active' : 'inactive',
      points: 600
    }
  ];

  const handleCreateAnonymousIdentity = async () => {
    setLoading(true);
    try {
      await createAnonymousIdentity({
        age: 25,
        country: 'MX',
        kycLevel: 2
      });
      
      toast.success("✅ Identidad anónima creada", {
        description: "Ahora puedes realizar transacciones privadas"
      });
    } catch (error) {
      toast.error("❌ Error creando identidad anónima");
    } finally {
      setLoading(false);
    }
  };

  const handlePrivateTransaction = async () => {
    if (!hasAnonymousIdentity) {
      toast.error("Crea una identidad anónima primero");
      return;
    }

    setLoading(true);
    try {
      const result = await processPrivateTransaction(100, "0x742d...8f3a");
      
      if (result.success) {
        toast.success("✅ Transacción privada completada", {
          description: `Hash: ${result.transactionHash}`
        });
      } else {
        toast.error("❌ Error en transacción privada");
      }
    } catch (error) {
      toast.error("❌ Error procesando transacción");
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
            <div className="w-8 h-8 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-dark-200">Privacy & Identity Protection</span>
            <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
          </div>
          
          <h1 className="text-5xl font-bold text-dark-100 mb-6">
            Privacidad <span className="neural-text">Neural</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Protección de privacidad avanzada con Zero-Knowledge Proofs y transacciones anónimas
          </p>
        </motion.div>

        {/* Privacy Level Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="glass-card-dark neural-connection">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-dark-100 mb-2">
                    Nivel de Privacidad Actual
                  </h3>
                  <p className="text-dark-300">
                    {privacyLevel === 'high' ? 'Máxima protección activa' : 
                     privacyLevel === 'medium' ? 'Protección media' : 'Protección básica'}
                  </p>
                </div>
                <Badge 
                  className={`${
                    privacyLevel === 'high' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : privacyLevel === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}
                >
                  {privacyLevel.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-dark-400 mb-2">
                    <span>Protección de Privacidad</span>
                    <span>{privacyLevel === 'high' ? '100%' : privacyLevel === 'medium' ? '60%' : '20%'}</span>
                  </div>
                  <Progress 
                    value={privacyLevel === 'high' ? 100 : privacyLevel === 'medium' ? 60 : 20} 
                    className="h-2"
                  />
                </div>
                
                {hasAnonymousIdentity && (
                  <div className="flex items-center space-x-2 text-sm text-dark-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Identidad anónima activa</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Privacy Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="glass-card-dark neural-connection hover:neural-glow transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        feature.status === 'active' 
                          ? 'bg-neural-gradient neural-glow' 
                          : 'bg-dark-800'
                      }`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-dark-100 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-dark-300 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold neural-text mb-1">
                        {feature.points}
                      </div>
                      <div className="text-xs text-dark-400">puntos</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      className={`${
                        feature.status === 'active'
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }`}
                    >
                      {feature.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                    
                    {feature.status === 'active' && (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!hasAnonymousIdentity ? (
              <Button
                onClick={handleCreateAnonymousIdentity}
                disabled={loading}
                className="neural-button text-lg px-8 py-4"
                size="lg"
              >
                <Key className="w-5 h-5 mr-2" />
                {loading ? 'Creando...' : 'Crear Identidad Anónima'}
              </Button>
            ) : (
              <Button
                onClick={handlePrivateTransaction}
                disabled={loading}
                className="neural-button text-lg px-8 py-4"
                size="lg"
              >
                <Lock className="w-5 h-5 mr-2" />
                {loading ? 'Procesando...' : 'Transacción Privada'}
              </Button>
            )}
            
            <Button
              variant="outline"
              className="glass-button border-neural-500 text-dark-100 hover:bg-glass-white text-lg px-8 py-4"
              size="lg"
            >
              <Settings className="w-5 h-5 mr-2" />
              Configurar Privacidad
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
