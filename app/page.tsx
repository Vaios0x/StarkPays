"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useChipiPay } from "@/lib/integrations/chipi/provider";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { AIProtection } from "@/components/landing/AIProtection";
import { Testimonials } from "@/components/landing/Testimonials";
import { Stats } from "@/components/landing/Stats";
import { TandasSection } from "@/components/landing/TandasSection";
import { WalletConnectPrompt } from "@/components/landing/WalletConnectPrompt";
import { CTA } from "@/components/landing/CTA";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isConnected } = useChipiPay();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-dark-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="neural-pulse">Cargando...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-950">
      <Navbar />
      <HeroSection />
      <Stats />
      <FeaturesSection />
      <AIProtection />
      <HowItWorks />
      <Testimonials />
      {isConnected ? <TandasSection /> : <WalletConnectPrompt />}
      <CTA />
      
      {/* StarkPays + ChipiPay Demo Section */}
      <section className="py-32 bg-dark-950 relative overflow-hidden">
        {/* Starknet Background Pattern */}
        <div className="absolute inset-0 bg-neural-mesh opacity-30" />
        
        {/* Floating Starknet Nodes */}
        {[...Array(8)].map((_, i) => {
          const positions = [
            { top: 15, left: 20, size: 2 },
            { top: 35, left: 80, size: 1.5 },
            { top: 55, left: 15, size: 2.5 },
            { top: 75, left: 85, size: 1 },
            { top: 25, left: 50, size: 2 },
            { top: 65, left: 30, size: 1.8 },
            { top: 85, left: 60, size: 2.2 },
            { top: 45, left: 10, size: 1.2 }
          ];
          
          const pos = positions[i] || positions[0];
          
          return (
            <motion.div
              key={i}
              className="absolute bg-neural-500 rounded-full neural-pulse"
              style={{
                top: `${pos.top}%`,
                left: `${pos.left}%`,
                width: `${pos.size}px`,
                height: `${pos.size}px`,
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 2.5 + (i * 0.2),
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          );
        })}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-dark rounded-3xl p-12 max-w-6xl mx-auto neural-connection"
          >
            <div className="mb-12">
              <div className="inline-flex items-center space-x-3 glass-card mb-6">
                <div className="w-8 h-8 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
                  <span className="text-white text-sm">⚡</span>
                </div>
                <span className="text-sm font-medium text-dark-200">Starknet + ChipiPay Demo Activo</span>
                <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
              </div>
              
              <h2 className="text-5xl font-bold text-dark-100 mb-6">
                Prueba <span className="neural-text">StarkPays</span> en Acción
              </h2>
              <p className="text-xl text-dark-300 mb-8 max-w-4xl mx-auto">
                Experimenta la primera plataforma de remesas construida en Starknet con ChipiPay. 
                Transacciones gasless, IA neural de protección y velocidad blockchain real.
              </p>
            </div>

            {/* Live Demo Interface */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Mobile Demo Interface */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="glass-card-dark rounded-3xl p-6 transform hover:scale-105 transition-transform duration-500">
                  <div className="aspect-[9/16] bg-dark-900 rounded-2xl overflow-hidden relative">
                    {/* Starknet Network Background */}
                    <div className="absolute inset-0 bg-neural-mesh opacity-20" />
                    
                    <div className="relative z-10 p-6 h-full flex flex-col">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
                          <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="text-xl font-bold text-dark-100 mb-2">StarkPays + ChipiPay</h3>
                        <p className="text-sm text-dark-400">Starknet Network</p>
                      </div>

                      {/* Live Transaction Demo */}
                      <div className="flex-1 space-y-4">
                        {/* Transaction Card */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                          className="glass-card rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-dark-400">Enviando a México</span>
                            <span className="text-xs text-neural-400 font-semibold">LIVE</span>
                          </div>
                          <div className="text-lg font-bold text-dark-100">$500 USD</div>
                          <div className="text-xs text-dark-400">0% gas fees con ChipiPay</div>
                        </motion.div>

                        {/* AI Analysis */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.5 }}
                          className="glass-card rounded-xl p-4"
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-6 h-6 bg-neural-gradient rounded-full flex items-center justify-center">
                              <span className="text-xs">🧠</span>
                            </div>
                            <span className="text-xs text-dark-400">IA Analizando</span>
                          </div>
                          <div className="w-full h-1 bg-dark-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-neural-gradient"
                              initial={{ width: 0 }}
                              animate={{ width: "85%" }}
                              transition={{ duration: 2, delay: 2 }}
                            />
                          </div>
                          <div className="text-xs text-neural-400 mt-1">Patrón normal detectado ✓</div>
                        </motion.div>

                        {/* ChipiPay Status */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.5 }}
                          className="glass-card rounded-xl p-4"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                              <span className="text-xs">💳</span>
                            </div>
                            <div>
                              <div className="text-xs text-dark-400">ChipiPay Optimizado</div>
                              <div className="text-sm font-bold text-dark-100">0% gas fees</div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Status Bar */}
                      <div className="mt-6 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-dark-400">Starknet Status</span>
                          <span className="text-xs text-neural-400 font-semibold">ACTIVE</span>
                        </div>
                        <div className="w-full h-1 bg-dark-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-neural-gradient"
                            initial={{ width: 0 }}
                            animate={{ width: "92%" }}
                            transition={{ duration: 3, delay: 1 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Notifications */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -left-8 top-20 glass-card-dark w-56 neural-connection"
                >
                  <div className="flex items-center space-x-3 p-4">
                    <div className="w-10 h-10 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
                      <span className="text-sm">🛡️</span>
                    </div>
                    <div>
                      <p className="text-xs text-dark-400">Fraude detectado</p>
                      <p className="text-sm font-bold text-dark-100">Bloqueado por Starknet ✓</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -right-8 bottom-32 glass-card-dark w-56 neural-connection"
                >
                  <div className="flex items-center space-x-3 p-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center neural-glow">
                      <span className="text-sm">⚡</span>
                    </div>
                    <div>
                      <p className="text-xs text-dark-400">ChipiPay optimizado</p>
                      <p className="text-sm font-bold text-neural-400">0% gas fees</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Demo Features */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Feature Cards */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-neural-gradient rounded-xl flex items-center justify-center neural-glow">
                      <span className="text-xl">🧠</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark-100">IA Neural en Starknet</h3>
                      <p className="text-sm text-dark-300">Detección de fraudes en tiempo real</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center neural-glow">
                      <span className="text-xl">💳</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark-100">ChipiPay Gasless</h3>
                      <p className="text-sm text-dark-300">0% gas fees en todas las transacciones</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center neural-glow">
                      <span className="text-xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-dark-100">Velocidad Starknet</h3>
                      <p className="text-sm text-dark-300">Transacciones en segundos, no minutos</p>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <div className="space-y-4 pt-6">
                  <Link href="/merchant">
                    <Button 
                      size="lg" 
                      className="w-full neural-button text-lg px-6 py-4 h-auto"
                    >
                      💳 Probar ChipiPay Demo
                    </Button>
                  </Link>
                  
                  <Link href="/send">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full glass-button border-neural-500 text-neural-400 hover:bg-neural-500 hover:text-white text-lg px-6 py-4 h-auto"
                    >
                      🧠 Ver Sistema Starknet
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center glass-card rounded-2xl p-6"
              >
                <div className="text-3xl font-bold neural-text mb-2">99.7%</div>
                <div className="text-sm text-dark-300">Precisión Starknet</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center glass-card rounded-2xl p-6"
              >
                <div className="text-3xl font-bold neural-text mb-2">0.3s</div>
                <div className="text-sm text-dark-300">ChipiPay Speed</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center glass-card rounded-2xl p-6"
              >
                <div className="text-3xl font-bold neural-text mb-2">24/7</div>
                <div className="text-sm text-dark-300">Starknet Security</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center glass-card rounded-2xl p-6"
              >
                <div className="text-3xl font-bold neural-text mb-2">10K+</div>
                <div className="text-sm text-dark-300">Con ChipiPay</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
