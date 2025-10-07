"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, Shield, DollarSign } from "lucide-react";

const stats = [
  { 
    number: "63.3B", 
    label: "Mercado México (USD)", 
    suffix: "",
    icon: TrendingUp,
    color: "from-blue-500 to-blue-700"
  },
  { 
    number: "50M", 
    label: "Sin cuenta bancaria", 
    suffix: "",
    icon: Users,
    color: "from-purple-500 to-purple-700"
  },
  { 
    number: "35%", 
    label: "Sufren fraude telefónico", 
    suffix: "",
    icon: Shield,
    color: "from-red-500 to-red-700"
  },
  { 
    number: "0%", 
    label: "Gas fees con ChipiPay", 
    suffix: "",
    icon: DollarSign,
    color: "from-green-500 to-green-700"
  },
];

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-32 bg-dark-950 relative overflow-hidden">
      {/* Neural Background */}
      <div className="absolute inset-0 bg-neural-mesh opacity-30" />
      
      {/* Floating Neural Elements */}
      {[...Array(8)].map((_, i) => {
        // Use deterministic positioning based on index
        const positions = [
          { top: 20, left: 15 },
          { top: 40, left: 85 },
          { top: 60, left: 25 },
          { top: 80, left: 75 },
          { top: 30, left: 45 },
          { top: 70, left: 35 },
          { top: 10, left: 65 },
          { top: 50, left: 95 }
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
              duration: 3 + (i * 0.4),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        );
      })}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card-dark rounded-3xl p-8 h-full relative overflow-hidden neural-connection"
              >
                {/* Neural Background Effect */}
                <div className="absolute inset-0 bg-neural-mesh opacity-20" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    className="text-4xl md:text-5xl font-bold neural-text mb-2"
                  >
                    {stat.number}
                    {stat.suffix}
                  </motion.div>
                  
                  {/* Label */}
                  <p className="text-dark-300 text-sm md:text-base font-medium">
                    {stat.label}
                  </p>

                  {/* Neural Progress Bar */}
                  <motion.div
                    className={`mt-4 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
