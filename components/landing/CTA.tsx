"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Shield, Zap, DollarSign, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const benefits = [
  { icon: Shield, text: "Starknet Security 24/7" },
  { icon: Zap, text: "ChipiPay Speed" },
  { icon: DollarSign, text: "0% Gas Fees" },
  { icon: CheckCircle2, text: "Starknet + ChipiPay" },
];

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary-500 to-primary-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Protege a tu familia
            <br />
            <span className="text-primary-100">con Starknet + ChipiPay</span>
          </h2>
          
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Únete a miles de familias que ya usan Starknet + ChipiPay para enviar 
            dinero con 0% gas fees, de forma segura y rápida.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <benefit.icon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/send">
              <Button 
                size="lg" 
                className="group bg-white text-primary-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all text-lg px-8 py-4"
              >
                Empezar con ChipiPay
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              Ver demo Starknet
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-primary-100">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Sin registro de crédito</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Configuración en 2 minutos</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Soporte 24/7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
