"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Activity,
  Brain,
  Shield,
  Zap,
  Clock,
  DollarSign
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnalyticsData {
  monthlyData: Array<{
    month: string;
    sent: number;
    received: number;
    fees: number;
  }>;
  typeDistribution: Array<{
    type: string;
    count: number;
    percentage: number;
    color: string;
  }>;
  securityTrend: Array<{
    date: string;
    score: number;
  }>;
  topRoutes: Array<{
    route: string;
    count: number;
    percentage: number;
  }>;
}

interface HistoryAnalyticsProps {
  showBalances: boolean;
  data: AnalyticsData;
}

export function HistoryAnalytics({ showBalances, data }: HistoryAnalyticsProps) {
  const formatAmount = (amount: number) => {
    if (!showBalances) return "••••";
    return `$${amount.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="space-y-8"
    >
      {/* Monthly Activity Chart */}
      <Card className="glass-card-dark neural-connection">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center neural-glow">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-dark-100">Actividad Mensual</h3>
              <p className="text-dark-400 text-sm">Tendencias de transacciones</p>
            </div>
          </div>
          <Badge className="bg-neural-500/20 text-neural-400 border-neural-500/30">
            <Activity className="w-3 h-3 mr-1" />
            Últimos 6 meses
          </Badge>
        </div>

        <div className="space-y-4">
          {data.monthlyData.map((month, index) => (
            <motion.div
              key={month.month}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 glass-card rounded-2xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neural-500 to-neural-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {month.month.slice(0, 3)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-dark-100">{month.month}</h4>
                  <p className="text-sm text-dark-400">Actividad neural</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-sm text-dark-400">Enviado</p>
                  <p className="text-lg font-bold text-red-400">
                    {formatAmount(month.sent)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-dark-400">Recibido</p>
                  <p className="text-lg font-bold text-green-400">
                    {formatAmount(month.received)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-dark-400">Comisiones</p>
                  <p className="text-lg font-bold text-blue-400">
                    {formatAmount(month.fees)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-card-dark neural-connection">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center neural-glow">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-dark-100">Distribución por Tipo</h3>
              <p className="text-dark-400 text-sm">Tipos de transacciones</p>
            </div>
          </div>

          <div className="space-y-4">
            {data.typeDistribution.map((type, index) => (
              <motion.div
                key={type.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="text-dark-200 font-medium">{type.type}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-dark-400">{type.count} transacciones</span>
                  <Badge className="bg-dark-800 text-dark-200">
                    {formatPercentage(type.percentage)}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Security Trend */}
        <Card className="glass-card-dark neural-connection">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center neural-glow">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-dark-100">Tendencia de Seguridad</h3>
              <p className="text-dark-400 text-sm">Score IA por período</p>
            </div>
          </div>

          <div className="space-y-4">
            {data.securityTrend.map((point, index) => (
              <motion.div
                key={point.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 glass-card rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-neural-500 to-neural-700 rounded-lg flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-dark-200 font-medium">{point.date}</p>
                    <p className="text-sm text-dark-400">Análisis neural</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    point.score >= 90 ? 'text-green-400' : 
                    point.score >= 70 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {point.score}%
                  </p>
                  <div className="w-20 bg-dark-800 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${
                        point.score >= 90 ? 'bg-green-500' : 
                        point.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${point.score}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Routes */}
      <Card className="glass-card-dark neural-connection">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center neural-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-dark-100">Rutas Más Utilizadas</h3>
            <p className="text-dark-400 text-sm">Análisis de rutas neurales</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.topRoutes.map((route, index) => (
            <motion.div
              key={route.route}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 glass-card rounded-2xl hover:neural-glow transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-neural-500 to-neural-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <span className="font-semibold text-dark-100">{route.route}</span>
                </div>
                <Badge className="bg-neural-500/20 text-neural-400 border-neural-500/30">
                  {formatPercentage(route.percentage)}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-dark-400 text-sm">{route.count} transacciones</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-neural-400" />
                  <span className="text-sm text-neural-400">Rápido</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
