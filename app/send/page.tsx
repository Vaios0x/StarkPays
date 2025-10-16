"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Send, DollarSign, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SendPage() {
  return (
    <main className="min-h-screen bg-dark-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <Send className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-dark-100 mb-4">
              Enviar Dinero
            </h1>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Envía dinero de forma segura y rápida con IA neural que protege a tu familia
            </p>
          </motion.div>
        </div>

        {/* Send Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Form */}
          <Card className="glass-card-dark border-dark-800">
            <CardHeader>
              <CardTitle className="text-dark-100">Detalles del Envío</CardTitle>
              <CardDescription className="text-dark-400">
                Completa la información para enviar dinero de forma segura
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-200">Destinatario</label>
                <Input 
                  placeholder="Nombre completo o email"
                  className="glass-input border-dark-700 text-dark-100"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-200">Cantidad</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-dark-400" />
                  <Input 
                    placeholder="0.00"
                    type="number"
                    className="glass-input border-dark-700 text-dark-100 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-200">Mensaje (opcional)</label>
                <Input 
                  placeholder="Mensaje para el destinatario"
                  className="glass-input border-dark-700 text-dark-100"
                />
              </div>
              
              <Button className="w-full neural-button text-lg py-6">
                <Send className="w-5 h-5 mr-2" />
                Enviar Dinero
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="space-y-6">
            <Card className="glass-card border-neural-500/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-neural-gradient rounded-xl flex items-center justify-center neural-glow">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark-100">Protección IA</h3>
                    <p className="text-sm text-dark-300">Detección de fraudes en tiempo real</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-neural-500/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center neural-glow">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark-100">0% Gas Fees</h3>
                    <p className="text-sm text-dark-300">Transacciones completamente gratuitas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-neural-500/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center neural-glow">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark-100">Instantáneo</h3>
                    <p className="text-sm text-dark-300">Envíos en segundos, no minutos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
