"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle2, Brain, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AIInsight {
  type: "warning" | "success" | "info";
  message: string;
  confidence: number;
}

export function AIGuardian() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Simular insights AI en tiempo real
    const interval = setInterval(() => {
      const mockInsights: AIInsight[] = [
        {
          type: "success",
          message: "Patrón de envío normal detectado",
          confidence: 95,
        },
        {
          type: "info",
          message: "Ruta optimizada ahorra $2.50",
          confidence: 88,
        },
      ];
      
      setInsights(mockInsights);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform"
      >
        <Brain className="w-8 h-8 text-white" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 w-96 z-50"
    >
      <Card className="bg-white/95 backdrop-blur-xl border-2 border-primary-200 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Guardian AI</h3>
              <p className="text-xs text-gray-500">Protegiendo tu familia 24/7</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Insights */}
        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-2"
              >
                <div className="flex items-start space-x-3">
                  {insight.type === "warning" && (
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  )}
                  {insight.type === "success" && (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  )}
                  {insight.type === "info" && (
                    <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-gray-700">{insight.message}</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={insight.confidence} className="h-1" />
                      <span className="text-xs text-gray-400">
                        {insight.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Activity Monitor */}
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg p-3 mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">
                Análisis en tiempo real
              </span>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-2 h-2 bg-primary-500 rounded-full"
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Monitoreando patrones y optimizando rutas
            </p>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">0</p>
            <p className="text-xs text-gray-500">Fraudes bloqueados</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">$145</p>
            <p className="text-xs text-gray-500">Ahorrado este mes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-xs text-gray-500">Envíos protegidos</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
