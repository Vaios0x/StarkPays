"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield, 
  Clock,
  Zap,
  Brain,
  Activity,
  Target,
  Award
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HistoryStatsProps {
  showBalances: boolean;
  stats: {
    totalSent: number;
    totalReceived: number;
    totalFees: number;
    averageSecurity: number;
    totalTransactions: number;
    successRate: number;
    averageTime: number;
    topRoute: string;
    neuralScore: number;
  };
}

export function HistoryStats({ showBalances, stats }: HistoryStatsProps) {
  const formatAmount = (amount: number) => {
    if (!showBalances) return "••••";
    return `$${amount.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getSecurityColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getSecurityBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (score >= 70) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      {/* Total Sent */}
      <Card className="glass-card-dark neural-connection group hover:neural-glow transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-dark-400 text-sm mb-1">Total Enviado</p>
            <p className="text-2xl font-bold neural-text mb-2">
              {formatAmount(stats.totalSent)}
            </p>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-red-400" />
              <span className="text-xs text-dark-400">Salida</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center neural-glow group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
      </Card>

      {/* Total Received */}
      <Card className="glass-card-dark neural-connection group hover:neural-glow transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-dark-400 text-sm mb-1">Total Recibido</p>
            <p className="text-2xl font-bold neural-text mb-2">
              {formatAmount(stats.totalReceived)}
            </p>
            <div className="flex items-center space-x-1">
              <TrendingDown className="w-4 h-4 text-green-400" />
              <span className="text-xs text-dark-400">Entrada</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center neural-glow group-hover:scale-110 transition-transform">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
        </div>
      </Card>

      {/* Total Fees */}
      <Card className="glass-card-dark neural-connection group hover:neural-glow transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-dark-400 text-sm mb-1">Comisiones</p>
            <p className="text-2xl font-bold neural-text mb-2">
              {formatAmount(stats.totalFees)}
            </p>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-dark-400">Neural</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center neural-glow group-hover:scale-110 transition-transform">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
        </div>
      </Card>

      {/* Security Score */}
      <Card className="glass-card-dark neural-connection group hover:neural-glow transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-dark-400 text-sm mb-1">Seguridad IA</p>
            <p className={`text-2xl font-bold mb-2 ${getSecurityColor(stats.averageSecurity)}`}>
              {formatPercentage(stats.averageSecurity)}
            </p>
            <Badge className={`${getSecurityBadgeColor(stats.averageSecurity)} border text-xs`}>
              <Shield className="w-3 h-3 mr-1" />
              Neural Guardian
            </Badge>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center neural-glow group-hover:scale-110 transition-transform">
            <Shield className="w-6 h-6 text-white" />
          </div>
        </div>
      </Card>

      {/* Additional Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Total Transactions */}
        <Card className="glass-card-dark neural-connection">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm mb-1">Transacciones</p>
              <p className="text-xl font-bold neural-text">
                {stats.totalTransactions}
              </p>
            </div>
            <Activity className="w-8 h-8 text-neural-400" />
          </div>
        </Card>

        {/* Success Rate */}
        <Card className="glass-card-dark neural-connection">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm mb-1">Tasa de Éxito</p>
              <p className="text-xl font-bold neural-text">
                {formatPercentage(stats.successRate)}
              </p>
            </div>
            <Target className="w-8 h-8 text-green-400" />
          </div>
        </Card>

        {/* Average Time */}
        <Card className="glass-card-dark neural-connection">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm mb-1">Tiempo Promedio</p>
              <p className="text-xl font-bold neural-text">
                {formatTime(stats.averageTime)}
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-400" />
          </div>
        </Card>

        {/* Top Route */}
        <Card className="glass-card-dark neural-connection">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm mb-1">Ruta Favorita</p>
              <p className="text-lg font-bold neural-text">
                {stats.topRoute}
              </p>
            </div>
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
        </Card>
      </motion.div>

      {/* Neural Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="md:col-span-2 lg:col-span-4"
      >
        <Card className="glass-card-dark neural-connection border border-neural-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-neural-500 to-neural-700 rounded-3xl flex items-center justify-center neural-glow">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark-100 mb-2">
                  Score Neural General
                </h3>
                <p className="text-dark-400 text-sm">
                  Análisis completo de tu actividad financiera
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-bold neural-text mb-2">
                {stats.neuralScore}/100
              </div>
              <Badge className="bg-neural-500/20 text-neural-400 border-neural-500/30">
                <Award className="w-3 h-3 mr-1" />
                Excelente
              </Badge>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-dark-400 mb-2">
              <span>Progreso Neural</span>
              <span>{stats.neuralScore}%</span>
            </div>
            <div className="w-full bg-dark-800 rounded-full h-3">
              <motion.div 
                className="h-3 rounded-full bg-neural-gradient"
                initial={{ width: 0 }}
                animate={{ width: `${stats.neuralScore}%` }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
