"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Plus, Users, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function TandasPage() {
  const tandas = [
    {
      id: 1,
      name: "Tanda Familiar",
      amount: 500,
      members: 8,
      current: 3,
      nextPayment: "2024-01-15"
    },
    {
      id: 2,
      name: "Ahorro Navidad",
      amount: 1000,
      members: 12,
      current: 7,
      nextPayment: "2024-01-20"
    }
  ];

  return (
    <main className="min-h-screen bg-dark-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-dark-300 hover:text-neural-400">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-dark-100 mb-4">
                Tandas Neurales
              </h1>
              <p className="text-xl text-dark-300">
                Sistema inteligente de ahorro colaborativo con IA
              </p>
            </div>
            <Link href="/tandas/create">
              <Button className="neural-button">
                <Plus className="w-5 h-5 mr-2" />
                Crear Tanda
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="glass-card border-neural-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold neural-text mb-2">2</div>
              <div className="text-sm text-dark-300">Tandas Activas</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-neural-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold neural-text mb-2">$1,500</div>
              <div className="text-sm text-dark-300">Total Ahorrado</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-neural-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold neural-text mb-2">20</div>
              <div className="text-sm text-dark-300">Miembros</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tandas List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-dark-100 mb-6">Mis Tandas</h2>
          
          {tandas.map((tanda, index) => (
            <motion.div
              key={tanda.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="glass-card-dark border-dark-800 hover:border-neural-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-dark-100 mb-2">
                        {tanda.name}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-neural-400" />
                          <span className="text-dark-300">${tanda.amount}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-neural-400" />
                          <span className="text-dark-300">{tanda.current}/{tanda.members}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-neural-400" />
                          <span className="text-dark-300">{tanda.nextPayment}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
                          <span className="text-dark-300">Activa</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-6">
                      <div className="w-16 h-16 bg-neural-gradient rounded-2xl flex items-center justify-center neural-glow mb-4">
                        <span className="text-white font-bold text-lg">
                          {Math.round((tanda.current / tanda.members) * 100)}%
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="glass-button border-neural-500 text-neural-400"
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
