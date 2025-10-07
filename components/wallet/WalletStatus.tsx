"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Wallet, DollarSign, CheckCircle, AlertCircle, Brain, Network, Zap } from "lucide-react";

interface WalletStatusProps {
  wallet: any;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

export function WalletStatus({ wallet, isLoading, isError, error }: WalletStatusProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card-dark rounded-3xl p-8"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center neural-glow">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-dark-100">Estado Neural</h3>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-neural-400 border-t-transparent rounded-full"
          />
          <span className="text-dark-300">Cargando información neural...</span>
        </div>
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card-dark rounded-3xl p-8 border border-red-500/20"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center neural-glow">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-red-400">Error Neural</h3>
        </div>
        
        <p className="text-red-300">
          {error?.message || "Error al cargar la wallet neural"}
        </p>
      </motion.div>
    );
  }

  if (!wallet) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card-dark rounded-3xl p-8 border border-yellow-500/20"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center neural-glow">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-yellow-400">Wallet No Encontrada</h3>
        </div>
        
        <p className="text-yellow-300">
          No se encontró una wallet neural asociada a tu cuenta.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card-dark rounded-3xl p-8 neural-connection"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center neural-glow">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-dark-100">Wallet Neural Activa</h3>
            <p className="text-sm text-dark-400">Sistema de IA conectado</p>
          </div>
        </div>
        
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 neural-pulse"></div>
          Conectada
        </Badge>
      </div>

      <div className="space-y-6">
        {/* Dirección */}
        <div>
          <label className="text-sm font-medium text-dark-200 mb-2 block">
            Dirección Neural:
          </label>
          <div className="glass-card rounded-2xl p-4">
            <p className="font-mono text-sm text-dark-100 break-all">
              {wallet.publicKey?.slice(0, 10)}...{wallet.publicKey?.slice(-8)}
            </p>
          </div>
        </div>
        
        {/* Balance */}
        <div>
          <label className="text-sm font-medium text-dark-200 mb-2 block">
            Balance USDC:
          </label>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center neural-glow">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-bold neural-text">
              {wallet.balance || "0.00"}
            </span>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-dark-800 pt-6">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-8 h-8 bg-gradient-to-br from-neural-500 to-neural-700 rounded-xl flex items-center justify-center neural-glow">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-neural-400 font-medium">Protegida por Guardian AI</span>
              <p className="text-xs text-dark-400">Detección neural activa</p>
            </div>
          </div>
        </div>

        {/* Stats Neurales */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold neural-text mb-1">99.7%</div>
            <div className="text-xs text-dark-400">Precisión IA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold neural-text mb-1">0.3s</div>
            <div className="text-xs text-dark-400">Análisis</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
