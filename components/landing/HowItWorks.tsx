"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Shield, Brain, Zap, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Conecta con ChipiPay",
    description: "Conecta tu wallet Starknet o crea una con ChipiPay (0% gas fees)",
    icon: Shield,
    color: "from-blue-500 to-blue-700",
  },
  {
    number: "02",
    title: "Starknet AI Analiza",
    description: "IA neural en Starknet verifica patrones y detecta fraudes en 2.3 segundos",
    icon: Brain,
    color: "from-purple-500 to-purple-700",
  },
  {
    number: "03",
    title: "ChipiPay Optimiza",
    description: "ChipiPay + IA selecciona la ruta más barata con 0% gas fees",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
  },
  {
    number: "04",
    title: "Dinero Llega Seguro",
    description: "Tu familia recibe el dinero en 5 minutos con protección Starknet activada",
    icon: CheckCircle2,
    color: "from-green-500 to-green-700",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cómo funciona{" "}
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Starknet + ChipiPay
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            En 4 simples pasos, envía dinero con Starknet y ChipiPay (0% gas fees)
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200 transform -translate-y-1/2" />
          
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-8 h-8 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {step.number}
                  </div>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6">
                    <ArrowRight className="w-6 h-6 text-primary-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para usar Starknet + ChipiPay?
            </h3>
            <p className="text-primary-100 mb-6">
              Únete a más de 10,000 familias que ya usan Starknet + ChipiPay
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Empezar ahora
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Ver demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
