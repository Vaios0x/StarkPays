"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Users, 
  DollarSign, 
  Calendar, 
  Shield, 
  Brain,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  User,
  Wallet,
  Zap,
  Network
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Footer } from "@/components/layout/Footer";
import { AIGuardian } from "@/components/dashboard/AIGuardian";
import { useChipiPay } from "@/lib/integrations/chipi/provider";
import { toast } from "sonner";

interface TandaMember {
  address: string;
  name: string;
  joinedAt: string;
  contributions: number;
  trustScore: number;
  status: "active" | "pending" | "suspended";
}

interface TandaContribution {
  id: string;
  member: string;
  amount: number;
  timestamp: string;
  status: "completed" | "pending" | "late";
  round: number;
}

interface TandaPayout {
  id: string;
  recipient: string;
  amount: number;
  timestamp: string;
  round: number;
  status: "completed" | "pending";
}

export default function TandaDetailPage({ params }: { params: { id: string } }) {
  const { isConnected, address } = useChipiPay();
  const [tanda, setTanda] = useState<any>(null);
  const [members, setMembers] = useState<TandaMember[]>([]);
  const [contributions, setContributions] = useState<TandaContribution[]>([]);
  const [payouts, setPayouts] = useState<TandaPayout[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Mock data para desarrollo
    const mockTanda = {
      id: params.id,
      name: "Tanda Familiar Neural",
      description: "Ahorro familiar protegido por IA para emergencias y proyectos familiares",
      contributionAmount: 500,
      frequencyDays: 7,
      maxMembers: 10,
      currentMembers: 7,
      status: "active",
      creator: "0x742d...8f3a",
      createdAt: "2024-01-15",
      nextContribution: "2024-01-22",
      totalPool: 3500,
      totalRounds: 3,
      currentRound: 1,
    };

    const mockMembers: TandaMember[] = [
      {
        address: "0x742d...8f3a",
        name: "María González",
        joinedAt: "2024-01-15",
        contributions: 3,
        trustScore: 98,
        status: "active",
      },
      {
        address: "0x1234...5678",
        name: "Carlos López",
        joinedAt: "2024-01-16",
        contributions: 2,
        trustScore: 95,
        status: "active",
      },
      {
        address: "0xabcd...efgh",
        name: "Ana Martínez",
        joinedAt: "2024-01-17",
        contributions: 2,
        trustScore: 92,
        status: "active",
      },
      {
        address: "0x9876...5432",
        name: "Luis Rodríguez",
        joinedAt: "2024-01-18",
        contributions: 1,
        trustScore: 88,
        status: "active",
      },
      {
        address: "0x4567...8901",
        name: "Sofia Herrera",
        joinedAt: "2024-01-19",
        contributions: 1,
        trustScore: 85,
        status: "active",
      },
      {
        address: "0x2345...6789",
        name: "Miguel Torres",
        joinedAt: "2024-01-20",
        contributions: 0,
        trustScore: 90,
        status: "pending",
      },
      {
        address: "0x6789...0123",
        name: "Elena Vargas",
        joinedAt: "2024-01-21",
        contributions: 0,
        trustScore: 87,
        status: "pending",
      },
    ];

    const mockContributions: TandaContribution[] = [
      {
        id: "1",
        member: "0x742d...8f3a",
        amount: 500,
        timestamp: "2024-01-15T10:00:00Z",
        status: "completed",
        round: 1,
      },
      {
        id: "2",
        member: "0x1234...5678",
        amount: 500,
        timestamp: "2024-01-16T14:30:00Z",
        status: "completed",
        round: 1,
      },
      {
        id: "3",
        member: "0xabcd...efgh",
        amount: 500,
        timestamp: "2024-01-17T09:15:00Z",
        status: "completed",
        round: 1,
      },
      {
        id: "4",
        member: "0x9876...5432",
        amount: 500,
        timestamp: "2024-01-18T16:45:00Z",
        status: "completed",
        round: 1,
      },
      {
        id: "5",
        member: "0x4567...8901",
        amount: 500,
        timestamp: "2024-01-19T11:20:00Z",
        status: "completed",
        round: 1,
      },
    ];

    const mockPayouts: TandaPayout[] = [
      {
        id: "1",
        recipient: "0x742d...8f3a",
        amount: 2500,
        timestamp: "2024-01-22T10:00:00Z",
        round: 1,
        status: "completed",
      },
    ];

    setTimeout(() => {
      setTanda(mockTanda);
      setMembers(mockMembers);
      setContributions(mockContributions);
      setPayouts(mockPayouts);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleJoinTanda = async () => {
    if (!isConnected) {
      toast.error("Conecta tu wallet primero");
      return;
    }

    try {
      toast.success("✅ Te uniste a la tanda", {
        description: "Protección IA activada",
      });
    } catch (error) {
      toast.error("❌ Error uniéndote a la tanda");
    }
  };

  const handleContribute = async () => {
    if (!isConnected) {
      toast.error("Conecta tu wallet primero");
      return;
    }

    try {
      toast.success("✅ Contribución realizada", {
        description: "Transacción gasless ejecutada",
      });
    } catch (error) {
      toast.error("❌ Error realizando contribución");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-dark-950 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-dark-800 rounded mb-4"></div>
              <div className="h-4 bg-dark-800 rounded mb-8"></div>
              <div className="h-64 bg-dark-800 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!tanda) {
    return (
      <main className="min-h-screen bg-dark-950 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-dark-100 mb-4">Tanda no encontrada</h1>
            <p className="text-dark-400 mb-8">La tanda que buscas no existe o ha sido eliminada</p>
            <Button onClick={() => window.history.back()} className="neural-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>
        </div>
      </main>
    );
  }

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
          className="mb-8"
        >
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="glass-button border-dark-600 text-dark-300 hover:bg-glass-white mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-dark-100 mb-4">
                {tanda.name}
              </h1>
              <p className="text-xl text-dark-300 mb-6">
                {tanda.description}
              </p>
              <div className="flex items-center space-x-4">
                <Badge 
                  className={`${
                    tanda.status === "active" 
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}
                >
                  {tanda.status === "active" ? "Activa" : "Inactiva"}
                </Badge>
                <div className="flex items-center space-x-2 text-dark-400">
                  <User className="w-4 h-4" />
                  <span>Creada por {tanda.creator}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold neural-text mb-2">
                ${tanda.totalPool.toLocaleString()}
              </div>
              <div className="text-sm text-dark-400">Total del Pool</div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold neural-text mb-2">{tanda.currentMembers}/{tanda.maxMembers}</div>
              <div className="text-sm text-dark-400">Miembros</div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold neural-text mb-2">${tanda.contributionAmount}</div>
              <div className="text-sm text-dark-400">Contribución</div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold neural-text mb-2">{tanda.frequencyDays}d</div>
              <div className="text-sm text-dark-400">Frecuencia</div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold neural-text mb-2">{tanda.currentRound}/{tanda.totalRounds}</div>
              <div className="text-sm text-dark-400">Ronda</div>
            </div>
          </Card>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="glass-card-dark neural-connection">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-dark-200">Progreso de la Tanda</h3>
                <span className="text-sm text-dark-400">
                  {Math.round((tanda.currentMembers / tanda.maxMembers) * 100)}% completado
                </span>
              </div>
              <Progress 
                value={(tanda.currentMembers / tanda.maxMembers) * 100} 
                className="h-3 mb-4"
              />
              <div className="flex justify-between text-sm text-dark-400">
                <span>Miembros actuales: {tanda.currentMembers}</span>
                <span>Faltan: {tanda.maxMembers - tanda.currentMembers} miembros</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex space-x-1 glass-card rounded-2xl p-2">
            {[
              { id: "overview", label: "Resumen", icon: Target },
              { id: "members", label: "Miembros", icon: Users },
              { id: "contributions", label: "Contribuciones", icon: DollarSign },
              { id: "payouts", label: "Pagos", icon: TrendingUp },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all ${
                  activeTab === id
                    ? "bg-neural-gradient text-white neural-glow"
                    : "text-dark-400 hover:text-dark-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Protection */}
              <Card className="glass-card-dark neural-connection border border-green-500/20">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center neural-glow">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark-100">Protección IA Neural</h3>
                      <p className="text-sm text-dark-400">Activa y monitoreando</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-dark-400">Detección de fraudes:</span>
                      <span className="text-green-400 font-semibold">✓ Activa</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-dark-400">Análisis de patrones:</span>
                      <span className="text-green-400 font-semibold">✓ Activa</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-dark-400">Score promedio:</span>
                      <span className="text-neural-400 font-bold">94%</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Next Actions */}
              <Card className="glass-card-dark neural-connection">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-dark-100 mb-6">Próximas Acciones</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-neural-400" />
                        <span className="text-dark-200">Próxima contribución:</span>
                      </div>
                      <span className="text-dark-100 font-medium">{tanda.nextContribution}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Target className="w-5 h-5 text-neural-400" />
                        <span className="text-dark-200">Ronda actual:</span>
                      </div>
                      <span className="text-dark-100 font-medium">{tanda.currentRound}/{tanda.totalRounds}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    {tanda.currentMembers < tanda.maxMembers ? (
                      <Button
                        onClick={handleJoinTanda}
                        className="w-full neural-button"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Unirse a la Tanda
                      </Button>
                    ) : (
                      <Button
                        onClick={handleContribute}
                        className="w-full neural-button"
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Contribuir
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "members" && (
            <Card className="glass-card-dark neural-connection">
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark-100 mb-6">Miembros de la Tanda</h3>
                
                <div className="space-y-4">
                  {members.map((member, index) => (
                    <div key={member.address} className="flex items-center justify-between p-4 glass-card rounded-2xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-neural-500 to-neural-700 rounded-2xl flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-dark-100">{member.name}</div>
                          <div className="text-sm text-dark-400">{member.address}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-sm text-dark-400">Contribuciones</div>
                            <div className="font-semibold text-dark-100">{member.contributions}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-dark-400">Trust Score</div>
                            <div className="font-semibold text-neural-400">{member.trustScore}%</div>
                          </div>
                          <Badge 
                            className={`${
                              member.status === "active" 
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : member.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }`}
                          >
                            {member.status === "active" ? "Activo" : 
                             member.status === "pending" ? "Pendiente" : "Suspendido"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {activeTab === "contributions" && (
            <Card className="glass-card-dark neural-connection">
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark-100 mb-6">Historial de Contribuciones</h3>
                
                <div className="space-y-4">
                  {contributions.map((contribution) => (
                    <div key={contribution.id} className="flex items-center justify-between p-4 glass-card rounded-2xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-dark-100">${contribution.amount}</div>
                          <div className="text-sm text-dark-400">Ronda {contribution.round}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-dark-400">{contribution.member}</div>
                        <div className="text-sm text-dark-400">{new Date(contribution.timestamp).toLocaleDateString()}</div>
                        <Badge 
                          className={`${
                            contribution.status === "completed" 
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : contribution.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }`}
                        >
                          {contribution.status === "completed" ? "Completada" : 
                           contribution.status === "pending" ? "Pendiente" : "Tardía"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {activeTab === "payouts" && (
            <Card className="glass-card-dark neural-connection">
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark-100 mb-6">Historial de Pagos</h3>
                
                <div className="space-y-4">
                  {payouts.map((payout) => (
                    <div key={payout.id} className="flex items-center justify-between p-4 glass-card rounded-2xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-dark-100">${payout.amount.toLocaleString()}</div>
                          <div className="text-sm text-dark-400">Ronda {payout.round}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-dark-400">{payout.recipient}</div>
                        <div className="text-sm text-dark-400">{new Date(payout.timestamp).toLocaleDateString()}</div>
                        <Badge 
                          className={`${
                            payout.status === "completed" 
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }`}
                        >
                          {payout.status === "completed" ? "Completado" : "Pendiente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </div>

      {/* AI Guardian Widget */}
      <AIGuardian />
      
      <Footer />
    </main>
  );
}
