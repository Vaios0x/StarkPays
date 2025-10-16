"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, QrCode, Copy, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ReceivePage() {
  const walletAddress = "0x0735b811E30E0303E8347483C56588CBa51053a8b7f8713fc7252a342Ec11769";
  
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
              <Download className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-dark-100 mb-4">
              Recibir Dinero
            </h1>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Comparte tu dirección para recibir pagos de forma segura
            </p>
          </motion.div>
        </div>

        {/* Receive Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* QR Code */}
          <Card className="glass-card-dark border-dark-800">
            <CardHeader>
              <CardTitle className="text-dark-100">Código QR</CardTitle>
              <CardDescription className="text-dark-400">
                Escanea este código para enviar dinero
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="w-64 h-64 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <QrCode className="w-32 h-32 text-dark-900" />
              </div>
              <Button 
                variant="outline" 
                className="glass-button border-neural-500 text-neural-400"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar QR
              </Button>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="glass-card-dark border-dark-800">
            <CardHeader>
              <CardTitle className="text-dark-100">Dirección de Wallet</CardTitle>
              <CardDescription className="text-dark-400">
                Copia y comparte esta dirección
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="glass-card rounded-xl p-4">
                <p className="text-sm text-dark-400 mb-2">Tu dirección Starknet:</p>
                <p className="font-mono text-sm text-dark-100 break-all">
                  {walletAddress}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="glass-button border-neural-500 text-neural-400"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </Button>
                <Button 
                  variant="outline" 
                  className="glass-button border-neural-500 text-neural-400"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
                  <span className="text-sm text-dark-300">Red: Starknet Sepolia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-dark-300">Estado: Activo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
