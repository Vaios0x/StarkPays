"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, Shield, Brain, ArrowRight, Target, Calendar, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useChipiPay } from "@/lib/integrations/chipi/provider";

export function TandasSection() {
  const { isConnected } = useChipiPay();

  // Solo mostrar si el wallet está conectado
  if (!isConnected) {
    return null;
  }
  const tandas = [
    {
      id: 1,
      name: "Tanda Familiar Neural",
      description: "Ahorro familiar protegido por IA",
      members: 8,
      maxMembers: 10,
      contribution: 500,
      frequency: "Semanal",
      status: "Activa",
      aiScore: 98,
      totalPool: 4000,
    },
    {
      id: 2,
      name: "Tanda de Emergencia",
      description: "Fondo de emergencia comunitario",
      members: 5,
      maxMembers: 8,
      contribution: 200,
      frequency: "Quincenal",
      status: "Activa",
      aiScore: 95,
      totalPool: 1000,
    },
    {
      id: 3,
      name: "Tanda de Vacaciones",
      description: "Ahorro para vacaciones familiares",
      members: 6,
      maxMembers: 6,
      contribution: 1000,
      frequency: "Mensual",
      status: "Completada",
      aiScore: 100,
      totalPool: 6000,
    },
  ];

  return (
    <section className="py-32 bg-dark-950 relative overflow-hidden">
      {/* Neural Background */}
      <div className="absolute inset-0 bg-neural-mesh opacity-20" />
      
      {/* Floating Neural Elements */}
      {[...Array(12)].map((_, i) => {
        const positions = [
          { top: 10, left: 15 }, { top: 30, left: 85 }, { top: 50, left: 25 },
          { top: 70, left: 75 }, { top: 20, left: 45 }, { top: 60, left: 35 },
          { top: 5, left: 65 }, { top: 40, left: 95 }, { top: 80, left: 55 },
          { top: 25, left: 5 }, { top: 90, left: 30 }, { top: 15, left: 80 }
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
              delay: i * 0.2,
            }}
          />
        );
      })}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-3 glass-card mb-8">
            <div className="w-8 h-8 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
              <span className="text-white text-sm">👥</span>
            </div>
            <span className="text-sm font-medium text-dark-200">Tandas Neurales Activas</span>
            <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
          </div>
          
          <h2 className="text-5xl font-bold text-dark-100 mb-6">
            Tandas <span className="neural-text">Neurales</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Círculos de ahorro comunitario protegidos por IA. Sin intermediarios bancarios, 
            transparencia total en blockchain y protección neural automática.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold neural-text mb-2">47</div>
              <div className="text-sm text-dark-400">Tandas Activas</div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold neural-text mb-2">$23.5K</div>
              <div className="text-sm text-dark-400">Total Ahorrado</div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold neural-text mb-2">98.7%</div>
              <div className="text-sm text-dark-400">Tasa de Éxito</div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold neural-text mb-2">0</div>
              <div className="text-sm text-dark-400">Fraudes Detectados</div>
            </div>
          </Card>
        </motion.div>

        {/* Tandas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {tandas.map((tanda, index) => (
            <motion.div
              key={tanda.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="glass-card-dark neural-connection hover:neural-glow transition-all duration-300">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-dark-100 mb-2">
                        {tanda.name}
                      </h3>
                      <p className="text-dark-400 text-sm">
                        {tanda.description}
                      </p>
                    </div>
                    <Badge 
                      className={`${
                        tanda.status === "Activa" 
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      }`}
                    >
                      {tanda.status}
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold neural-text mb-1">
                        ${tanda.contribution}
                      </div>
                      <div className="text-xs text-dark-400">Contribución</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold neural-text mb-1">
                        {tanda.members}/{tanda.maxMembers}
                      </div>
                      <div className="text-xs text-dark-400">Miembros</div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-dark-400 mb-2">
                      <span>Progreso</span>
                      <span>{Math.round((tanda.members / tanda.maxMembers) * 100)}%</span>
                    </div>
                    <div className="w-full bg-dark-800 rounded-full h-2">
                      <div 
                        className="bg-neural-gradient h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(tanda.members / tanda.maxMembers) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-neural-400" />
                        <span className="text-sm text-dark-400">Frecuencia:</span>
                      </div>
                      <span className="text-sm text-dark-100">{tanda.frequency}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-neural-400" />
                        <span className="text-sm text-dark-400">Total pool:</span>
                      </div>
                      <span className="text-sm text-dark-100">${tanda.totalPool.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-4 h-4 text-neural-400" />
                        <span className="text-sm text-dark-400">IA Score:</span>
                      </div>
                      <span className="text-sm text-neural-400 font-bold">{tanda.aiScore}%</span>
                    </div>
                  </div>

                  {/* Actions */}
                  {tanda.status === "Activa" && (
                    <div className="space-y-3">
                      {tanda.members < tanda.maxMembers ? (
                        <Button
                          className="w-full neural-button"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Unirse a la Tanda
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className="w-full glass-button border-dark-600 text-dark-400"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Tanda Completa
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        className="w-full glass-button border-neural-500 text-dark-100 hover:bg-glass-white"
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="glass-card-dark rounded-3xl p-12 neural-connection">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-dark-100 mb-6">
                ¿Listo para crear tu <span className="neural-text">Tanda Neural</span>?
              </h3>
              <p className="text-xl text-dark-300 mb-8">
                Únete a la revolución del ahorro comunitario. Protegido por IA, 
                transparente en blockchain, sin intermediarios bancarios.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tandas/create">
                  <Button 
                    size="lg" 
                    className="neural-button text-lg px-8 py-4"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Crear Tanda Neural
                  </Button>
                </Link>
                
                <Link href="/tandas">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="glass-button border-neural-500 text-neural-400 hover:bg-neural-500 hover:text-white text-lg px-8 py-4"
                  >
                    <Target className="w-5 h-5 mr-2" />
                    Ver Todas las Tandas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
