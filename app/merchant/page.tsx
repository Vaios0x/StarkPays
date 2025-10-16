"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Store, QrCode, CreditCard, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function MerchantPage() {
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
            className="text-center"
          >
            <div className="w-16 h-16 bg-neural-gradient rounded-2xl flex items-center justify-center neural-glow mx-auto mb-6">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-dark-100 mb-4">
              Merchant Dashboard
            </h1>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Acepta pagos con ChipiPay y Starknet. 0% comisiones, máxima seguridad.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="glass-card border-neural-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold neural-text mb-2">$12,450</div>
              <div className="text-sm text-dark-300">Ventas Hoy</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-neural-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold neural-text mb-2">156</div>
              <div className="text-sm text-dark-300">Transacciones</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-neural-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold neural-text mb-2">0%</div>
              <div className="text-sm text-dark-300">Comisiones</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-neural-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold neural-text mb-2">99.7%</div>
              <div className="text-sm text-dark-300">Precisión IA</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 mb-8"
        >
          {/* QR Code */}
          <Card className="glass-card-dark border-dark-800">
            <CardHeader>
              <CardTitle className="text-dark-100">Código QR de Pago</CardTitle>
              <CardDescription className="text-dark-400">
                Genera códigos QR para recibir pagos
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="w-64 h-64 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <QrCode className="w-32 h-32 text-dark-900" />
              </div>
              <Button className="neural-button">
                <QrCode className="w-4 h-4 mr-2" />
                Generar QR
              </Button>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="glass-card-dark border-dark-800">
            <CardHeader>
              <CardTitle className="text-dark-100">Métodos de Pago</CardTitle>
              <CardDescription className="text-dark-400">
                Configura los métodos de pago aceptados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 glass-card rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark-100">ChipiPay</h3>
                    <p className="text-sm text-dark-400">0% comisiones</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between p-4 glass-card rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-neural-gradient rounded-xl flex items-center justify-center">
                    <div className="w-5 h-5 text-white font-bold">S</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-dark-100">Starknet</h3>
                    <p className="text-sm text-dark-400">Gasless transactions</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card-dark border-dark-800">
            <CardHeader>
              <CardTitle className="text-dark-100">Transacciones Recientes</CardTitle>
              <CardDescription className="text-dark-400">
                Últimas transacciones procesadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, amount: 150, customer: "Juan Pérez", time: "2 min ago", status: "completed" },
                  { id: 2, amount: 75, customer: "María García", time: "5 min ago", status: "completed" },
                  { id: 3, amount: 200, customer: "Carlos López", time: "10 min ago", status: "pending" }
                ].map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 glass-card rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-neural-gradient rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {transaction.customer.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-dark-100">{transaction.customer}</h3>
                        <p className="text-sm text-dark-400">{transaction.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-dark-100">${transaction.amount}</div>
                      <div className={`text-sm ${
                        transaction.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {transaction.status === 'completed' ? 'Completado' : 'Pendiente'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
