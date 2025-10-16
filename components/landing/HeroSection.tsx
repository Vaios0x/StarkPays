"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, DollarSign, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export function HeroSection() {
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 neural-mesh-bg">
      {/* Neural Network Background */}
      <div className="absolute inset-0 bg-dark-950">
        <div className="absolute inset-0 bg-neural-mesh opacity-60" />
        
        {/* Neural Connection Lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            // Use deterministic positioning based on index
            const positions = [
              { top: 20, left: 10, width: 150, rotation: 45 },
              { top: 30, left: 80, width: 200, rotation: 120 },
              { top: 60, left: 20, width: 180, rotation: 200 },
              { top: 80, left: 70, width: 160, rotation: 300 },
              { top: 40, left: 50, width: 220, rotation: 60 },
              { top: 70, left: 30, width: 190, rotation: 150 },
              { top: 10, left: 60, width: 170, rotation: 90 },
              { top: 50, left: 90, width: 140, rotation: 270 },
              { top: 90, left: 40, width: 210, rotation: 180 },
              { top: 25, left: 15, width: 165, rotation: 330 },
              { top: 75, left: 85, width: 175, rotation: 240 },
              { top: 35, left: 65, width: 185, rotation: 30 },
              { top: 85, left: 25, width: 155, rotation: 120 },
              { top: 15, left: 75, width: 195, rotation: 210 },
              { top: 65, left: 45, width: 145, rotation: 300 },
              { top: 45, left: 5, width: 205, rotation: 75 },
              { top: 95, left: 55, width: 135, rotation: 165 },
              { top: 5, left: 35, width: 185, rotation: 255 },
              { top: 55, left: 95, width: 160, rotation: 345 },
              { top: 85, left: 65, width: 200, rotation: 105 }
            ];
            
            const pos = positions[i] || positions[0];
            
            return (
              <motion.div
                key={i}
                className="absolute h-px bg-neural-gradient opacity-20"
                style={{
                  top: `${pos.top}%`,
                  left: `${pos.left}%`,
                  width: `${pos.width}px`,
                  transform: `rotate(${pos.rotation}deg)`,
                }}
                animate={{
                  opacity: [0.1, 0.4, 0.1],
                  scaleX: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + (i * 0.2),
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            );
          })}
        </div>

        {/* Floating Neural Nodes */}
        {[...Array(15)].map((_, i) => {
          // Use deterministic positioning based on index
          const nodePositions = [
            { top: 20, left: 15 },
            { top: 40, left: 85 },
            { top: 60, left: 25 },
            { top: 80, left: 75 },
            { top: 30, left: 45 },
            { top: 70, left: 35 },
            { top: 10, left: 65 },
            { top: 50, left: 95 },
            { top: 90, left: 55 },
            { top: 35, left: 5 },
            { top: 75, left: 85 },
            { top: 25, left: 75 },
            { top: 85, left: 45 },
            { top: 15, left: 25 },
            { top: 65, left: 65 }
          ];
          
          const pos = nodePositions[i] || nodePositions[0];
          
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-neural-500 rounded-full neural-pulse"
              style={{
                top: `${pos.top}%`,
                left: `${pos.left}%`,
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + (i * 0.1),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          );
        })}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Starknet + ChipiPay Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-3 glass-card neural-connection"
            >
              <div className="w-8 h-8 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-dark-100">Nuevo: IA Neural en Starknet</span>
              <Sparkles className="w-4 h-4 text-neural-400 neural-pulse" />
            </motion.div>

            {/* Neural Headline */}
            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="neural-text block">
                  StarkPays
                </span>
                <span className="text-dark-100 block">
                  Envía Dinero Sin Comisiones con IA que Protege a tu Familia
                </span>
              </h1>
              
              <div className="h-1 w-32 bg-neural-gradient rounded-full neural-glow" />
            </div>

            {/* Starknet + ChipiPay Subheadline */}
            <p className="text-xl text-dark-300 max-w-2xl leading-relaxed">
              La primera plataforma de remesas construida en Starknet con IA neural. Transacciones gasless, detección de fraudes en tiempo real y protección familiar.
            </p>

            {/* Neural Stats Pills */}
            <div className="flex flex-wrap gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass-card-dark neural-float"
              >
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-neural-400" />
                  <span className="text-sm font-semibold text-dark-100">0% Gas Fees</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass-card-dark neural-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-neural-400" />
                  <span className="text-sm font-semibold text-dark-100">Instantáneo</span>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="glass-card-dark neural-float"
                style={{ animationDelay: '2s' }}
              >
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-neural-400" />
                  <span className="text-sm font-semibold text-dark-100">Protección IA</span>
                </div>
              </motion.div>
            </div>

            {/* Neural CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/send">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="neural-button group text-lg px-8 py-4 h-auto"
                  >
                    <span className="flex items-center">
                      Probar StarkPays Gratis
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </Link>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="glass-button text-lg px-8 py-4 h-auto border-neural-500 text-neural-400 hover:bg-neural-500 hover:text-white"
                >
                  Ver Demo en Vivo
                </Button>
              </motion.div>
            </div>

            {/* Neural Trust Indicators */}
            <div className="flex items-center space-x-6 pt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-dark-800 bg-neural-gradient neural-glow"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-dark-100">10,000+ Familias Protegidas</p>
                <p className="text-xs text-dark-400">4.9/5 Estrellas</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Neural Interface */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Neural Glow Effect */}
              <div className="absolute -inset-8 bg-neural-gradient rounded-3xl blur-3xl opacity-30 neural-pulse" />
              
              {/* Neural Interface Mockup */}
              <div className="relative glass-card-dark rounded-3xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-700 neural-connection">
                <div className="aspect-[9/16] bg-dark-900 rounded-2xl overflow-hidden relative">
                  {/* Neural Network Visualization */}
                  <div className="absolute inset-0 bg-neural-mesh opacity-40" />
                  
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    {/* Header */}
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-dark-100 mb-2">StarkPays + ChipiPay</h3>
                      <p className="text-sm text-dark-400">Starknet Network</p>
                    </div>

                    {/* Neural Network Lines */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="relative w-32 h-32">
                        {[...Array(8)].map((_, i) => {
                          // Use deterministic positioning based on index
                          const nodePositions = [
                            { top: 20, left: 20 },
                            { top: 60, left: 80 },
                            { top: 40, left: 40 },
                            { top: 80, left: 60 },
                            { top: 30, left: 70 },
                            { top: 70, left: 30 },
                            { top: 10, left: 50 },
                            { top: 90, left: 90 }
                          ];
                          
                          const pos = nodePositions[i] || nodePositions[0];
                          
                          return (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-neural-500 rounded-full"
                              style={{
                                top: `${pos.top}%`,
                                left: `${pos.left}%`,
                              }}
                              animate={{
                                scale: [0.5, 1.5, 0.5],
                                opacity: [0.3, 1, 0.3],
                              }}
                              transition={{
                                duration: 2 + (i * 0.2),
                                repeat: Infinity,
                                delay: i * 0.3,
                              }}
                            />
                          );
                        })}
                        
                        {/* Connection Lines */}
                        {[...Array(12)].map((_, i) => {
                          // Use deterministic positioning based on index
                          const linePositions = [
                            { top: 15, left: 15, width: 30, rotation: 45 },
                            { top: 25, left: 75, width: 40, rotation: 120 },
                            { top: 35, left: 35, width: 25, rotation: 200 },
                            { top: 45, left: 65, width: 35, rotation: 300 },
                            { top: 55, left: 25, width: 30, rotation: 60 },
                            { top: 65, left: 85, width: 40, rotation: 150 },
                            { top: 75, left: 45, width: 25, rotation: 90 },
                            { top: 85, left: 55, width: 35, rotation: 270 },
                            { top: 5, left: 5, width: 30, rotation: 180 },
                            { top: 95, left: 95, width: 40, rotation: 330 },
                            { top: 50, left: 10, width: 25, rotation: 240 },
                            { top: 10, left: 90, width: 35, rotation: 30 }
                          ];
                          
                          const pos = linePositions[i] || linePositions[0];
                          
                          return (
                            <motion.div
                              key={i}
                              className="absolute h-px bg-neural-gradient opacity-30"
                              style={{
                                top: `${pos.top}%`,
                                left: `${pos.left}%`,
                                width: `${pos.width}px`,
                                transform: `rotate(${pos.rotation}deg)`,
                              }}
                              animate={{
                                opacity: [0.1, 0.6, 0.1],
                              }}
                              transition={{
                                duration: 3 + (i * 0.2),
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-dark-400">Starknet Status</span>
                        <span className="text-xs text-neural-400 font-semibold">ACTIVE</span>
                      </div>
                      <div className="w-full h-1 bg-dark-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-neural-gradient"
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Neural Cards */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute -left-8 top-20 glass-card-dark w-56 neural-connection"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400">Fraude detectado</p>
                    <p className="text-sm font-bold text-dark-100">Bloqueado por Starknet ✓</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="absolute -right-8 bottom-32 glass-card-dark w-56 neural-connection"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400">ChipiPay optimizado</p>
                    <p className="text-sm font-bold text-neural-400">0% gas fees</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
