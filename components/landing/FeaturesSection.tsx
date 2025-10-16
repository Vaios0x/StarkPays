"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Brain, Lock, DollarSign, Clock, Sparkles, Network, Users, Target, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const t = useTranslations();

  const features = [
    {
      icon: Brain,
      title: t('features.neural_guardian.title'),
      description: t('features.neural_guardian.description'),
      color: "from-purple-500 to-purple-700",
      neural: true,
    },
    {
      icon: Zap,
      title: t('features.smart_routing.title'),
      description: t('features.smart_routing.description'),
      color: "from-yellow-500 to-orange-500",
      neural: true,
    },
    {
      icon: Lock,
      title: t('features.privacy_shield.title'),
      description: t('features.privacy_shield.description'),
      color: "from-green-500 to-green-700",
      neural: true,
    },
    {
      icon: Shield,
      title: t('features.family_vault.title'),
      description: t('features.family_vault.description'),
      color: "from-blue-500 to-blue-700",
      neural: true,
    },
    {
      icon: DollarSign,
      title: t('features.zero_gas.title'),
      description: t('features.zero_gas.description'),
      color: "from-emerald-500 to-emerald-700",
      neural: true,
    },
    {
      icon: Clock,
      title: t('features.speed_transfer.title'),
      description: t('features.speed_transfer.description'),
      color: "from-red-500 to-red-700",
      neural: true,
    },
    {
      icon: Users,
      title: t('features.neural_tandas.title'),
      description: t('features.neural_tandas.description'),
      color: "from-indigo-500 to-indigo-700",
      neural: true,
    },
    {
      icon: Target,
      title: t('features.avnu_gas.title'),
      description: t('features.avnu_gas.description'),
      color: "from-cyan-500 to-cyan-700",
      neural: true,
    },
    {
      icon: TrendingUp,
      title: t('features.security.title'),
      description: t('features.security.description'),
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
            <span className="text-sm font-medium text-dark-200">{t('features.network')}</span>
            <Sparkles className="w-4 h-4 text-neural-400 neural-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-dark-100 mb-8">
            {t('features.title')}
          </h2>
          
          <p className="text-xl text-dark-300 max-w-4xl mx-auto leading-relaxed">
            {t('features.subtitle')}
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
              <h3 className="text-2xl font-bold text-dark-100">{t('features.network_title')}</h3>
              <Network className="w-8 h-8 text-neural-400 neural-pulse" />
            </div>
            
            <p className="text-dark-300 mb-8 max-w-2xl mx-auto">
              {t('features.network_description')}
            </p>
            
            {/* Neural Network Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card text-center p-6">
                <div className="text-3xl font-bold neural-text mb-2">99.7%</div>
                <div className="text-sm text-dark-300">{t('features.stats.precision')}</div>
              </div>
              <div className="glass-card text-center p-6">
                <div className="text-3xl font-bold neural-text mb-2">0.3s</div>
                <div className="text-sm text-dark-300">{t('features.stats.speed')}</div>
              </div>
              <div className="glass-card text-center p-6">
                <div className="text-3xl font-bold neural-text mb-2">24/7</div>
                <div className="text-sm text-dark-300">{t('features.stats.security')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
