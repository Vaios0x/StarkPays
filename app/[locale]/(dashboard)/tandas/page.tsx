"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Users, 
  DollarSign, 
  Clock, 
  TrendingUp,
  Shield,
  Brain,
  ArrowRight,
  Calendar,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/Footer";
import { AIGuardian } from "@/components/dashboard/AIGuardian";
import { useStarknet } from "@/lib/starknet/provider";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface Tanda {
  id: string;
  name: string;
  description: string;
  contributionAmount: number;
  frequencyDays: number;
  maxMembers: number;
  currentMembers: number;
  status: "active" | "completed" | "cancelled";
  creator: string;
  createdAt: string;
  nextContribution: string;
  totalPool: number;
}

export default function TandasPage() {
  const { isConnected, address, connect } = useStarknet();
  const t = useTranslations();
  const [tandas, setTandas] = useState<Tanda[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    // Mock data para desarrollo
    const mockTandas: Tanda[] = [
      {
        id: "1",
        name: "Tanda Familiar Neural",
        description: "Ahorro familiar protegido por IA",
        contributionAmount: 500,
        frequencyDays: 7,
        maxMembers: 10,
        currentMembers: 7,
        status: "active",
        creator: "0x742d...8f3a",
        createdAt: "2024-01-15",
        nextContribution: "2024-01-22",
        totalPool: 3500,
      },
      {
        id: "2",
        name: "Tanda de Emergencia",
        description: "Fondo de emergencia comunitario",
        contributionAmount: 200,
        frequencyDays: 14,
        maxMembers: 8,
        currentMembers: 5,
        status: "active",
        creator: "0x1234...5678",
        createdAt: "2024-01-10",
        nextContribution: "2024-01-24",
        totalPool: 1000,
      },
      {
        id: "3",
        name: "Tanda de Vacaciones",
        description: "Ahorro para vacaciones familiares",
        contributionAmount: 1000,
        frequencyDays: 30,
        maxMembers: 6,
        currentMembers: 6,
        status: "completed",
        creator: "0xabcd...efgh",
        createdAt: "2023-12-01",
        nextContribution: "Completada",
        totalPool: 6000,
      },
    ];

    setTimeout(() => {
      setTandas(mockTandas);
      setLoading(false);
    }, 1000);
  }, []);

  const handleJoinTanda = async (tandaId: string) => {
    if (!walletConnected) {
      toast.error(t('errors.wallet_not_connected'));
      return;
    }

    try {
      // Simular unirse a tanda
      toast.success("✅ " + t('success.joined_tanda'), {
        description: t('ai.protection') + " activada",
      });
    } catch (error) {
      toast.error("❌ " + t('errors.join_tanda_error'));
    }
  };

  const handleCreateTanda = () => {
    if (!walletConnected) {
      toast.error(t('errors.wallet_not_connected'));
      return;
    }
    // Navegar a página de crear tanda
    window.location.href = "/tandas/create";
  };

  return (
    <main className="min-h-screen bg-dark-950 relative overflow-hidden">
      
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
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 glass-card mb-8">
            <div className="w-8 h-8 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
              <span className="text-white text-sm">👥</span>
            </div>
            <span className="text-sm font-medium text-dark-200">{t('tandas_page.neural_active')}</span>
            <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
          </div>
          
          <h1 className="text-5xl font-bold text-dark-100 mb-6">
            {t('tandas_page.title')}
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            {t('tandas_page.subtitle')}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold neural-text mb-2">47</div>
              <div className="text-sm text-dark-400">Tandas Activas</div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold neural-text mb-2">$23.5K</div>
              <div className="text-sm text-dark-400">Total Ahorrado</div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold neural-text mb-2">98.7%</div>
              <div className="text-sm text-dark-400">Tasa de Éxito</div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold neural-text mb-2">0</div>
              <div className="text-sm text-dark-400">Fraudes Detectados</div>
            </div>
          </Card>
        </motion.div>


        {/* Create Tanda Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          {!walletConnected ? (
            <div className="space-y-4">
              <div className="glass-card-dark rounded-2xl p-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-neural-gradient rounded-full flex items-center justify-center mx-auto mb-4 neural-glow">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-100 mb-2">
                    Conecta tu Wallet
                  </h3>
                  <p className="text-dark-400 mb-6">
                    Necesitas conectar tu wallet para crear o unirte a tandas
                  </p>
                  <Button
                    onClick={connect}
                    className="neural-button text-lg px-8 py-4"
                    size="lg"
                  >
                    <Brain className="w-6 h-6 mr-3" />
                    Conectar Wallet
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              onClick={handleCreateTanda}
              className="neural-button text-lg px-8 py-4"
              size="lg"
            >
              <Plus className="w-6 h-6 mr-3" />
              Crear Nueva Tanda Neural
            </Button>
          )}
        </motion.div>

        {/* Tandas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            // Loading skeleton
            [...Array(6)].map((_, i) => (
              <Card key={i} className="glass-card-dark neural-connection">
                <div className="p-8">
                  <div className="animate-pulse">
                    <div className="h-6 bg-dark-800 rounded mb-4"></div>
                    <div className="h-4 bg-dark-800 rounded mb-2"></div>
                    <div className="h-4 bg-dark-800 rounded mb-6"></div>
                    <div className="flex space-x-4 mb-6">
                      <div className="h-8 bg-dark-800 rounded flex-1"></div>
                      <div className="h-8 bg-dark-800 rounded flex-1"></div>
                    </div>
                    <div className="h-10 bg-dark-800 rounded"></div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            tandas.map((tanda, index) => (
              <motion.div
                key={tanda.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="glass-card-dark neural-connection hover:neural-glow transition-all duration-300">
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-dark-100 mb-2">
                          {tanda.name}
                        </h3>
                        <p className="text-dark-400 text-sm">
                          {tanda.description}
                        </p>
                      </div>
                      <Badge 
                        className={`${
                          tanda.status === "active" 
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : tanda.status === "completed"
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }`}
                      >
                        {tanda.status === "active" ? "Activa" : 
                         tanda.status === "completed" ? "Completada" : "Cancelada"}
                      </Badge>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold neural-text mb-1">
                          ${tanda.contributionAmount}
                        </div>
                        <div className="text-xs text-dark-400">Contribución</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold neural-text mb-1">
                          {tanda.currentMembers}/{tanda.maxMembers}
                        </div>
                        <div className="text-xs text-dark-400">Miembros</div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-dark-400 mb-2">
                        <span>Progreso</span>
                        <span>{Math.round((tanda.currentMembers / tanda.maxMembers) * 100)}%</span>
                      </div>
                      <div className="w-full bg-dark-800 rounded-full h-2">
                        <div 
                          className="bg-neural-gradient h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(tanda.currentMembers / tanda.maxMembers) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-neural-400" />
                          <span className="text-sm text-dark-400">Próxima contribución:</span>
                        </div>
                        <span className="text-sm text-dark-100">{tanda.nextContribution}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-neural-400" />
                          <span className="text-sm text-dark-400">Total del pool:</span>
                        </div>
                        <span className="text-sm text-dark-100">${tanda.totalPool}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    {tanda.status === "active" && (
                      <div className="space-y-3">
                        {tanda.currentMembers < tanda.maxMembers ? (
                          <Button
                            onClick={() => handleJoinTanda(tanda.id)}
                            className="w-full neural-button"
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Unirse a la Tanda
                          </Button>
                        ) : (
                          <Button
                            disabled
                            className="w-full glass-button border-dark-600 text-dark-400"
                          >
                            <Users className="w-4 h-4 mr-2" />
                            Tanda Completa
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          className="w-full glass-button border-neural-500 text-dark-100 hover:bg-glass-white"
                        >
                          <Brain className="w-4 h-4 mr-2" />
                          Ver Detalles
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* AI Guardian Widget */}
      <AIGuardian />
      
      <Footer />
    </main>
  );
}
