"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Filter, Download, Search, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HistorialPage() {
  const transactions = [
    {
      id: 1,
      type: "send",
      amount: 500,
      to: "María González",
      date: "2024-01-10",
      status: "completed"
    },
    {
      id: 2,
      type: "receive",
      amount: 300,
      from: "Carlos López",
      date: "2024-01-08",
      status: "completed"
    },
    {
      id: 3,
      type: "tanda",
      amount: 200,
      to: "Tanda Familiar",
      date: "2024-01-05",
      status: "pending"
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
                Historial de Transacciones
              </h1>
              <p className="text-xl text-dark-300">
                Revisa todas tus transacciones y actividad
              </p>
            </div>
            <Button variant="outline" className="glass-button border-neural-500 text-neural-400">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="glass-card-dark border-dark-800">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-400" />
                    <Input 
                      placeholder="Buscar transacciones..."
                      className="glass-input border-dark-700 text-dark-100 pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline" className="glass-button border-neural-500 text-neural-400">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="glass-card-dark border-dark-800 hover:border-neural-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        transaction.type === 'send' 
                          ? 'bg-red-500/20 text-red-400' 
                          : transaction.type === 'receive'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {transaction.type === 'send' ? (
                          <ArrowUpRight className="w-6 h-6" />
                        ) : transaction.type === 'receive' ? (
                          <ArrowDownLeft className="w-6 h-6" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-blue-400"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-dark-100">
                          {transaction.type === 'send' ? 'Enviado a' : 
                           transaction.type === 'receive' ? 'Recibido de' : 
                           'Tanda'}: {transaction.to || transaction.from}
                        </h3>
                        <p className="text-sm text-dark-400">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        transaction.type === 'send' ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {transaction.type === 'send' ? '-' : '+'}${transaction.amount}
                      </div>
                      <div className={`text-sm ${
                        transaction.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {transaction.status === 'completed' ? 'Completado' : 'Pendiente'}
                      </div>
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
