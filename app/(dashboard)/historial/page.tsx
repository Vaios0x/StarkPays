"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  Brain,
  Shield,
  Zap,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  EyeOff,
  RefreshCw,
  MoreHorizontal,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIGuardian } from "@/components/dashboard/AIGuardian";
import { HistoryStats } from "@/components/dashboard/HistoryStats";
import { TransactionFilters } from "@/components/dashboard/TransactionFilters";
import { HistoryAnalytics } from "@/components/dashboard/HistoryAnalytics";

// Tipos de transacciones
type TransactionType = "send" | "receive" | "exchange" | "fee";
type TransactionStatus = "completed" | "pending" | "failed" | "processing";

interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  recipient?: string;
  sender?: string;
  message?: string;
  timestamp: Date;
  fee: number;
  hash: string;
  aiScore?: number;
  route?: string;
  network?: string;
}

// Datos de ejemplo
const mockTransactions: Transaction[] = [
  {
    id: "tx_001",
    type: "send",
    status: "completed",
    amount: 500,
    currency: "USD",
    recipient: "0x742d...8f3a",
    message: "Para la renta",
    timestamp: new Date("2024-01-15T14:30:00"),
    fee: 2.50,
    hash: "0x7b4f8a2c9d1e3f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    aiScore: 95,
    route: "ChipiPay Neural + Starknet",
    network: "Starknet"
  },
  {
    id: "tx_002",
    type: "receive",
    status: "completed",
    amount: 250,
    currency: "USD",
    sender: "0x8a3f...2b9c",
    message: "Pago de trabajo",
    timestamp: new Date("2024-01-14T09:15:00"),
    fee: 0,
    hash: "0x9c5e7f8a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a",
    aiScore: 98,
    route: "SPEI Direct",
    network: "SPEI"
  },
  {
    id: "tx_003",
    type: "send",
    status: "pending",
    amount: 1000,
    currency: "USD",
    recipient: "0x5d8a...7f2e",
    message: "Inversión familiar",
    timestamp: new Date("2024-01-13T16:45:00"),
    fee: 5.00,
    hash: "0x3a6b9c2d5e8f1a4b7c0d3e6f9a2b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7e0f3a6b9c2d",
    aiScore: 87,
    route: "Lightning Network",
    network: "Lightning"
  },
  {
    id: "tx_004",
    type: "exchange",
    status: "completed",
    amount: 750,
    currency: "USD",
    message: "Conversión USD → MXN",
    timestamp: new Date("2024-01-12T11:20:00"),
    fee: 3.75,
    hash: "0x1f4a7b0c3d6e9f2a5b8c1d4e7f0a3b6c9d2e5f8a1b4c7d0e3f6a9b2c5d8e1f4a7b0c3d",
    aiScore: 92,
    route: "Neural Exchange",
    network: "Starknet"
  },
  {
    id: "tx_005",
    type: "send",
    status: "failed",
    amount: 200,
    currency: "USD",
    recipient: "0x9e2f...4a7b",
    message: "Pago urgente",
    timestamp: new Date("2024-01-11T08:30:00"),
    fee: 1.00,
    hash: "0x8d5c2f9a6b3e0d7f4a1c8e5b2f9a6c3d0e7f4a1b8c5d2e9f6a3b0c7d4e1f8a5b2c9d6e",
    aiScore: 45,
    route: "SPEI",
    network: "SPEI"
  },
  {
    id: "tx_006",
    type: "receive",
    status: "completed",
    amount: 150,
    currency: "USD",
    sender: "0x3c7a...9f1e",
    message: "Reembolso",
    timestamp: new Date("2024-01-10T13:15:00"),
    fee: 0,
    hash: "0x6f9a3c7d0e1f4a7b0c3d6e9f2a5b8c1d4e7f0a3b6c9d2e5f8a1b4c7d0e3f6a9b2c5d8e",
    aiScore: 99,
    route: "ChipiPay Neural",
    network: "Starknet"
  }
];

export default function HistorialPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all");
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "amount" | "status">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showBalances, setShowBalances] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Datos para estadísticas
  const statsData = {
    totalSent: 1700,
    totalReceived: 400,
    totalFees: 12.25,
    averageSecurity: 94.2,
    totalTransactions: 6,
    successRate: 83.3,
    averageTime: 5,
    topRoute: "ChipiPay Neural",
    neuralScore: 94
  };

  // Datos para analytics
  const analyticsData = {
    monthlyData: [
      { month: "Enero 2024", sent: 500, received: 250, fees: 2.50 },
      { month: "Diciembre 2023", sent: 300, received: 150, fees: 1.50 },
      { month: "Noviembre 2023", sent: 200, received: 100, fees: 1.00 },
      { month: "Octubre 2023", sent: 400, received: 200, fees: 2.00 },
      { month: "Septiembre 2023", sent: 300, received: 150, fees: 1.50 },
      { month: "Agosto 2023", sent: 250, received: 125, fees: 1.25 }
    ],
    typeDistribution: [
      { type: "Enviado", count: 3, percentage: 50, color: "#ef4444" },
      { type: "Recibido", count: 2, percentage: 33.3, color: "#22c55e" },
      { type: "Intercambio", count: 1, percentage: 16.7, color: "#3b82f6" }
    ],
    securityTrend: [
      { date: "Enero 2024", score: 95 },
      { date: "Diciembre 2023", score: 92 },
      { date: "Noviembre 2023", score: 88 },
      { date: "Octubre 2023", score: 94 },
      { date: "Septiembre 2023", score: 90 },
      { date: "Agosto 2023", score: 87 }
    ],
    topRoutes: [
      { route: "ChipiPay Neural", count: 3, percentage: 50 },
      { route: "SPEI Direct", count: 2, percentage: 33.3 },
      { route: "Lightning Network", count: 1, percentage: 16.7 }
    ]
  };

  // Estado de filtros
  const [filters, setFilters] = useState({
    searchTerm: "",
    statusFilter: "all" as TransactionStatus | "all",
    typeFilter: "all" as TransactionType | "all",
    dateRange: "all" as "all" | "today" | "week" | "month" | "year",
    amountRange: { min: "", max: "" },
    sortBy: "date" as "date" | "amount" | "status",
    sortOrder: "desc" as "asc" | "desc"
  });

  // Filtros y búsqueda
  useEffect(() => {
    let filtered = transactions;

    // Filtro por texto
    if (searchTerm) {
      filtered = filtered.filter(tx => 
        tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por estado
    if (statusFilter !== "all") {
      filtered = filtered.filter(tx => tx.status === statusFilter);
    }

    // Filtro por tipo
    if (typeFilter !== "all") {
      filtered = filtered.filter(tx => tx.type === typeFilter);
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "date":
          comparison = a.timestamp.getTime() - b.timestamp.getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, statusFilter, typeFilter, sortBy, sortOrder]);

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "processing":
        return <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />;
    }
  };

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case "send":
        return <ArrowUpRight className="w-5 h-5 text-red-400" />;
      case "receive":
        return <ArrowDownLeft className="w-5 h-5 text-green-400" />;
      case "exchange":
        return <RefreshCw className="w-5 h-5 text-blue-400" />;
      case "fee":
        return <DollarSign className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: TransactionType) => {
    switch (type) {
      case "send":
        return "Enviado";
      case "receive":
        return "Recibido";
      case "exchange":
        return "Intercambio";
      case "fee":
        return "Comisión";
    }
  };

  const formatAmount = (amount: number, show: boolean = true) => {
    if (!show) return "••••";
    return `$${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
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
              <span className="text-white text-sm">📊</span>
            </div>
            <span className="text-sm font-medium text-dark-200">Historial Neural Activo</span>
            <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
          </div>
          
          <h1 className="text-5xl font-bold text-dark-100 mb-6">
            Historial <span className="neural-text">Neural</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Todas tus transacciones protegidas por IA • Análisis en tiempo real
          </p>
        </motion.div>

        {/* Stats Cards */}
        <HistoryStats showBalances={showBalances} stats={statsData} />

        {/* Filters and Search */}
        <TransactionFilters
          filters={filters}
          onFiltersChange={setFilters}
          onReset={() => {
            setFilters({
              searchTerm: "",
              statusFilter: "all",
              typeFilter: "all",
              dateRange: "all",
              amountRange: { min: "", max: "" },
              sortBy: "date",
              sortOrder: "desc"
            });
          }}
          showBalances={showBalances}
          onToggleBalances={() => setShowBalances(!showBalances)}
        />

        {/* Analytics Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mb-8"
        >
          <Button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="neural-button"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            {showAnalytics ? "Ocultar Analytics" : "Ver Analytics Neural"}
          </Button>
        </motion.div>

        {/* Analytics Section */}
        {showAnalytics && (
          <HistoryAnalytics showBalances={showBalances} data={analyticsData} />
        )}

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-card-dark rounded-2xl p-6 neural-connection hover:neural-glow transition-all duration-300 cursor-pointer"
                onClick={() => setShowDetails(showDetails === transaction.id ? null : transaction.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-neural-500 to-neural-700 rounded-2xl flex items-center justify-center neural-glow">
                      {getTypeIcon(transaction.type)}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-dark-100">
                          {getTypeLabel(transaction.type)}
                        </h3>
                        <Badge className={`${getStatusColor(transaction.status)} border`}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(transaction.status)}
                            <span className="capitalize">{transaction.status}</span>
                          </div>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-dark-400">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(transaction.timestamp)}</span>
                        </span>
                        {transaction.message && (
                          <span className="text-dark-300">"{transaction.message}"</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold neural-text mb-1">
                      {transaction.type === "send" ? "-" : "+"}
                      {formatAmount(transaction.amount, showBalances)}
                    </div>
                    <div className="text-sm text-dark-400">
                      {transaction.fee > 0 && `Fee: $${transaction.fee}`}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {showDetails === transaction.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-dark-800"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Transaction Details */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-dark-200 mb-4">Detalles de la Transacción</h4>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-dark-400">Hash:</span>
                              <span className="text-dark-100 font-mono text-sm">
                                {transaction.hash.slice(0, 20)}...{transaction.hash.slice(-8)}
                              </span>
                            </div>
                            
                            {transaction.recipient && (
                              <div className="flex justify-between">
                                <span className="text-dark-400">Destinatario:</span>
                                <span className="text-dark-100 font-mono text-sm">
                                  {transaction.recipient}
                                </span>
                              </div>
                            )}
                            
                            {transaction.sender && (
                              <div className="flex justify-between">
                                <span className="text-dark-400">Remitente:</span>
                                <span className="text-dark-100 font-mono text-sm">
                                  {transaction.sender}
                                </span>
                              </div>
                            )}
                            
                            <div className="flex justify-between">
                              <span className="text-dark-400">Red:</span>
                              <span className="text-dark-100">{transaction.network}</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-dark-400">Ruta:</span>
                              <span className="text-dark-100">{transaction.route}</span>
                            </div>
                          </div>
                        </div>

                        {/* AI Analysis */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-dark-200 mb-4">Análisis Neural IA</h4>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-dark-400">Score de Seguridad:</span>
                              <span className={`font-semibold ${getAIScoreColor(transaction.aiScore || 0)}`}>
                                {transaction.aiScore}%
                              </span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-dark-400">Estado IA:</span>
                              <span className="text-green-400">✓ Verificado</span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-dark-400">Protección:</span>
                              <span className="text-neural-400">Neural Guardian</span>
                            </div>
                          </div>

                          {/* AI Score Bar */}
                          <div className="mt-4">
                            <div className="flex justify-between text-sm text-dark-400 mb-2">
                              <span>Seguridad Neural</span>
                              <span>{transaction.aiScore}%</span>
                            </div>
                            <div className="w-full bg-dark-800 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500`}
                                style={{ width: `${transaction.aiScore}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end space-x-3 mt-6">
                        <Button
                          variant="outline"
                          className="glass-button border-neural-500 text-dark-100 hover:bg-glass-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Exportar
                        </Button>
                        <Button className="neural-button">
                          <Brain className="w-4 h-4 mr-2" />
                          Re-analizar IA
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-neural-500 to-neural-700 rounded-3xl flex items-center justify-center mx-auto mb-8 neural-glow">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-dark-100 mb-4">
              No se encontraron transacciones
            </h3>
            <p className="text-dark-400 mb-8">
              Intenta ajustar los filtros o términos de búsqueda
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setTypeFilter("all");
              }}
              className="neural-button"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Limpiar Filtros
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
