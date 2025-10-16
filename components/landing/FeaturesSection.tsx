"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Brain, Lock, DollarSign, Clock, Sparkles, Network, Users, Target, TrendingUp } from "lucide-react";
export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: Brain,
      title: "Guardián Neural",
      description: "IA que detecta fraudes en tiempo real y protege a tu familia con precisión del 99.7%",
      color: "from-purple-500 to-purple-700",
      neural: true,
    },
    {
      icon: Zap,
      title: "Enrutamiento Inteligente",
      description: "Optimiza automáticamente las rutas de pago para reducir costos y aumentar velocidad",
      color: "from-yellow-500 to-orange-500",
      neural: true,
    },
    {
      icon: Lock,
      title: "Escudo de Privacidad",
      description: "Protección total de datos personales con encriptación de grado militar",
      color: "from-green-500 to-green-700",
      neural: true,
    },
    {
      icon: Shield,
      title: "Bóveda Familiar",
      description: "Almacenamiento seguro de fondos familiares con acceso controlado",
      color: "from-blue-500 to-blue-700",
      neural: true,
    },
    {
      icon: DollarSign,
      title: "0% Gas Fees",
      description: "Transacciones completamente gratuitas gracias a la integración con ChipiPay",
      color: "from-emerald-500 to-emerald-700",
      neural: true,
    },
    {
      icon: Clock,
      title: "Transferencias Rápidas",
      description: "Envíos instantáneos en segundos, no minutos como otros servicios",
      color: "from-red-500 to-red-700",
      neural: true,
    },
    {
      icon: Users,
      title: "Tandas Neurales",
      description: "Sistema inteligente de tandas con IA que optimiza los pagos grupales",
      color: "from-indigo-500 to-indigo-700",
      neural: true,
    },
    {
      icon: Target,
      title: "AVNU Gasless",
      description: "Integración con AVNU para transacciones sin gas en Starknet",
      color: "from-cyan-500 to-cyan-700",
      neural: true,
    },
    {
      icon: TrendingUp,
      title: "Seguridad Avanzada",
      description: "Múltiples capas de seguridad con verificación biométrica y 2FA",
      color: "from-orange-500 to-orange-700",
      neural: true,
    },
  ];

  return (
    <section ref={ref} className="py-32 bg-dark-950 relative overflow-hidden">
      {/* Neural Background */}
      <div className="absolute inset-0 bg-neural-mesh opacity-30" />
      
      {/* Floating Neural Elements */}
      {[...Array(12)].map((_, i) => {
        // Use deterministic positioning based on index
        const positions = [
          { top: 15, left: 20 },
          { top: 35, left: 80 },
          { top: 55, left: 15 },
          { top: 75, left: 70 },
          { top: 25, left: 45 },
          { top: 65, left: 35 },
          { top: 5, left: 60 },
          { top: 45, left: 90 },
          { top: 85, left: 50 },
          { top: 30, left: 10 },
          { top: 70, left: 85 },
          { top: 20, left: 75 }
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
              delay: i * 0.25,
            }}
          />
        );
      })}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-3 glass-card mb-6">
            <Network className="w-6 h-6 text-neural-400" />
            <span className="text-sm font-medium text-dark-200">Red Neural</span>
            <Sparkles className="w-4 h-4 text-neural-400 neural-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-dark-100 mb-8">
            Características Neurales
          </h2>
          
          <p className="text-xl text-dark-300 max-w-4xl mx-auto leading-relaxed">
            Tecnología de vanguardia que protege a tu familia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card-dark neural-connection rounded-3xl p-8 h-full relative overflow-hidden"
              >
                {/* Neural Background Effect */}
                <div className="absolute inset-0 bg-neural-mesh opacity-20" />
                
                {/* Neural Icon Container */}
                <div className="relative z-10">
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform neural-glow`}
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  {/* Starknet + ChipiPay Badge */}
                  {feature.neural && (
                    <div className="inline-flex items-center space-x-2 bg-neural-gradient text-white px-3 py-1 rounded-full text-xs font-medium mb-4">
                      <Brain className="w-3 h-3" />
                      <span>STARKNET + CHIPIPAY</span>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-dark-100 mb-4 group-hover:text-neural-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-dark-300 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Neural Progress Bar */}
                  <motion.div
                    className="mt-6 h-1 bg-neural-gradient rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                  />

                  {/* Neural Connection Lines */}
                  <div className="absolute top-4 right-4 opacity-30">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-neural-500 rounded-full"
                        style={{
                          top: `${i * 8}px`,
                          left: `${i * 8}px`,
                        }}
                        animate={{
                          scale: [0.5, 1.5, 0.5],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Neural Network Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="glass-card-dark rounded-3xl p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Brain className="w-8 h-8 text-neural-400 neural-pulse" />
              <h3 className="text-2xl font-bold text-dark-100">Red Neural Starknet</h3>
              <Network className="w-8 h-8 text-neural-400 neural-pulse" />
            </div>
            
            <p className="text-dark-300 mb-8 max-w-2xl mx-auto">
              Construido sobre la red más avanzada de blockchain con IA integrada
            </p>
            
            {/* Neural Network Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card text-center p-6">
                <div className="text-3xl font-bold neural-text mb-2">99.7%</div>
                <div className="text-sm text-dark-300">Precisión Neural</div>
              </div>
              <div className="glass-card text-center p-6">
                <div className="text-3xl font-bold neural-text mb-2">0.3s</div>
                <div className="text-sm text-dark-300">Velocidad Starknet</div>
              </div>
              <div className="glass-card text-center p-6">
                <div className="text-3xl font-bold neural-text mb-2">24/7</div>
                <div className="text-sm text-dark-300">Seguridad Avanzada</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
