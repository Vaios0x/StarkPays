"use client";

import { motion } from "framer-motion";
import { Wallet, Shield, Zap, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export function WalletConnectPrompt() {
  const features = [
    {
      icon: Shield,
      title: "Protección IA",
      description: "Starknet Guardian AI protege cada transacción"
    },
    {
      icon: Zap,
      title: "0% Gas Fees",
      description: "ChipiPay elimina las comisiones de gas"
    },
    {
      icon: Users,
      title: "Tandas Neurales",
      description: "Círculos de ahorro comunitario seguros"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-dark-900 to-dark-950 relative overflow-hidden">
      {/* Neural Background */}
      <div className="absolute inset-0 bg-neural-mesh opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neural-500 to-neural-700 rounded-3xl mb-6 neural-glow">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold neural-text mb-6">
            Conecta tu wallet para acceder a
            <br />
            <span className="bg-gradient-to-r from-neural-400 to-neural-600 bg-clip-text text-transparent">
              Tandas Neurales
            </span>
          </h2>
          
          <p className="text-xl text-dark-300 max-w-3xl mx-auto mb-12">
            Únete a la revolución de las remesas con Starknet + ChipiPay. 
            Crea tandas comunitarias, envía dinero sin comisiones y protege a tu familia con IA.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="glass-card-dark p-8 h-full neural-connection">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-neural-500 to-neural-700 rounded-2xl flex items-center justify-center mx-auto mb-6 neural-glow">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold neural-text mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-dark-300">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="glass-card-dark rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold neural-text mb-4">
              ¿Listo para empezar?
            </h3>
            
            <p className="text-dark-300 mb-8">
              Conecta tu wallet y accede a todas las funcionalidades de StarkPays
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/send">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-neural-500 to-neural-700 hover:from-neural-600 hover:to-neural-800 text-white px-8 py-4 text-lg neural-glow"
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  Conectar Wallet
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-neural-500 text-neural-400 hover:bg-neural-500/10 px-8 py-4 text-lg"
              >
                Ver Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
