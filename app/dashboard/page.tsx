"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield, 
  Brain,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Users,
  Wallet,
  Network
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIGuardian } from "@/components/dashboard/AIGuardian";

export default function DashboardPage() {
  const [showBalances, setShowBalances] = useState(true);

  const formatAmount = (amount: number) => {
    if (!showBalances) return "••••";
    return `$${amount.toLocaleString()}`;
  };

  return (
    <main className="min-h-screen bg-dark-950 relative overflow-hidden">
      <Navbar />
      
      {/* Neural Background */}
      <div className="absolute inset-0 bg-neural-mesh opacity-20" />
      
      {/* Floating Neural Elements */}
      {[...Array(20)].map((_, i) => {
        const positions = [
          { top: 5, left: 10 }, { top: 15, left: 85 }, { top: 25, left: 20 },
          { top: 35, left: 70 }, { top: 45, left: 40 }, { top: 55, left: 90 },
          { top: 65, left: 15 }, { top: 75, left: 60 }, { top: 85, left: 30 },
          { top: 95, left: 80 }, { top: 10, left: 50 }, { top: 20, left: 25 },
          { top: 30, left: 75 }, { top: 40, left: 45 }, { top: 50, left: 95 },
          { top: 60, left: 35 }, { top: 70, left: 65 }, { top: 80, left: 5 },
          { top: 90, left: 55 }, { top: 100, left: 85 }
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
              <span className="text-white text-sm">🧠</span>
            </div>
            <span className="text-sm font-medium text-dark-200">Dashboard Neural Activo</span>
            <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
          </div>
          
          <h1 className="text-5xl font-bold text-dark-100 mb-6">
            Dashboard <span className="neural-text">Neural</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Control total de tu actividad financiera • Protegido por IA Guardian
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <Card className="glass-card-dark neural-connection group hover:neural-glow transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm mb-1">Balance Total</p>
                <p className="text-2xl font-bold neural-text mb-2">
                  {formatAmount(1250.75)}
                </p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">+12.5%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-neural-500 to-neural-700 rounded-2xl flex items-center justify-center neural-glow group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection group hover:neural-glow transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm mb-1">Enviado Hoy</p>
                <p className="text-2xl font-bold neural-text mb-2">
                  {formatAmount(500.00)}
                </p>
                <div className="flex items-center space-x-1">
                  <ArrowUpRight className="w-4 h-4 text-red-400" />
                  <span className="text-xs text-dark-400">3 transacciones</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center neural-glow group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection group hover:neural-glow transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm mb-1">Recibido Hoy</p>
                <p className="text-2xl font-bold neural-text mb-2">
                  {formatAmount(250.00)}
                </p>
                <div className="flex items-center space-x-1">
                  <ArrowDownLeft className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-dark-400">2 transacciones</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center neural-glow group-hover:scale-110 transition-transform">
                <ArrowDownLeft className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection group hover:neural-glow transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm mb-1">Seguridad IA</p>
                <p className="text-2xl font-bold neural-text mb-2">98.5%</p>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">Excelente</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center neural-glow group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="glass-card-dark neural-connection">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-neural-500 to-neural-700 rounded-2xl flex items-center justify-center neural-glow">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark-100">Acciones Rápidas</h3>
                  <p className="text-dark-400">Operaciones neurales frecuentes</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="neural-button h-16 text-lg">
                  <ArrowUpRight className="w-5 h-5 mr-2" />
                  Enviar Dinero
                </Button>
                <Button className="neural-button h-16 text-lg">
                  <ArrowDownLeft className="w-5 h-5 mr-2" />
                  Recibir Dinero
                </Button>
                <Button className="neural-button h-16 text-lg">
                  <Activity className="w-5 h-5 mr-2" />
                  Ver Historial
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Recent Transactions */}
          <Card className="glass-card-dark neural-connection">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-dark-100">Transacciones Recientes</h3>
                </div>
                <Button variant="outline" className="glass-button border-neural-500 text-dark-100 hover:bg-glass-white">
                  Ver todas
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass-card rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-dark-100">Enviado a María</p>
                      <p className="text-sm text-dark-400">Hace 2 horas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-bold">-$250.00</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completado
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 glass-card rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                      <ArrowDownLeft className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-dark-100">Recibido de Carlos</p>
                      <p className="text-sm text-dark-400">Ayer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">+$150.00</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completado
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 glass-card rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-dark-100">Pendiente</p>
                      <p className="text-sm text-dark-400">Hace 5 minutos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold">-$100.00</p>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      <Clock className="w-3 h-3 mr-1" />
                      Procesando
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="glass-card-dark neural-connection">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-bold text-dark-100">Insights Neurales</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 glass-card rounded-2xl border border-green-500/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-dark-100">Patrón Normal</span>
                  </div>
                  <p className="text-sm text-dark-400">
                    Tu actividad financiera sigue patrones seguros y predecibles.
                  </p>
                </div>

                <div className="p-4 glass-card rounded-2xl border border-blue-500/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <Network className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold text-dark-100">Red Optimizada</span>
                  </div>
                  <p className="text-sm text-dark-400">
                    Starknet + ChipiPay ofrece la mejor velocidad y comisiones.
                  </p>
                </div>

                <div className="p-4 glass-card rounded-2xl border border-purple-500/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="w-5 h-5 text-purple-400" />
                    <span className="font-semibold text-dark-100">Protección Activa</span>
                  </div>
                  <p className="text-sm text-dark-400">
                    IA Guardian ha bloqueado 3 intentos de fraude esta semana.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Family Vault Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="glass-card-dark neural-connection border border-purple-500/30">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center neural-glow">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark-100">Bóveda Neural Familiar</h3>
                    <p className="text-dark-400">Gestión familiar protegida por IA</p>
                  </div>
                </div>
                <Button className="neural-button">
                  <Users className="w-4 h-4 mr-2" />
                  Gestionar Familia
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold neural-text mb-1">3</div>
                  <div className="text-sm text-dark-400">Miembros activos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold neural-text mb-1">$2,500</div>
                  <div className="text-sm text-dark-400">Fondo familiar</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold neural-text mb-1">98%</div>
                  <div className="text-sm text-dark-400">Seguridad IA</div>
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