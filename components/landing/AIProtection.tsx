"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Shield, AlertTriangle, CheckCircle2, Eye, Lock } from "lucide-react";

const protectionFeatures = [
  {
    icon: Brain,
    title: "Starknet Análisis Predictivo",
    description: "IA neural en Starknet analiza patrones de envío para detectar comportamientos anómalos",
    examples: ["Envío fuera de horario habitual", "Monto inusual vs historial", "Destinatario nuevo con monto alto"],
  },
  {
    icon: Shield,
    title: "ChipiPay Bloqueo Automático",
    description: "Sistema Starknet bloquea transacciones sospechosas antes de que se completen",
    examples: ["Score de riesgo > 80%", "Patrón de fraude detectado", "Múltiples intentos fallidos"],
  },
  {
    icon: Eye,
    title: "Starknet Monitoreo 24/7",
    description: "Guardian AI en Starknet monitorea cada transacción en tiempo real",
    examples: ["Alertas instantáneas", "Notificaciones familiares", "Reportes de seguridad"],
  },
];

const zkFeatures = [
  {
    icon: Lock,
    title: "Starknet Privacidad Total",
    description: "ZK-proofs de Starknet ocultan montos y frecuencia a terceros",
  },
  {
    icon: CheckCircle2,
    title: "ChipiPay Verificación Familiar",
    description: "La familia puede verificar con ChipiPay sin exponer datos sensibles",
  },
];

export function AIProtection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Starknet Guardian AI
            </span>{" "}
            protege tu familia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La única plataforma construida en Starknet que usa IA neural para detectar 
            fraudes y proteger a tu familia con ChipiPay (0% gas fees).
          </p>
        </motion.div>

        {/* AI Protection Features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {protectionFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="space-y-2">
                  {feature.examples.map((example, i) => (
                    <div key={i} className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ZK Privacy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Starknet Privacy Shield con ZK-Proofs
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Protege la privacidad de tu familia con Starknet ZK-proofs sin sacrificar la verificación
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {zkFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">99.7%</div>
            <div className="text-sm text-gray-600">Precisión Starknet</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-sm text-gray-600">Fraudes con ChipiPay</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">2.3s</div>
            <div className="text-sm text-gray-600">ChipiPay Speed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Starknet Security</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
