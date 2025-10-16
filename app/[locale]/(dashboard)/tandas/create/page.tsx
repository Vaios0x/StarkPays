"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Users, 
  DollarSign, 
  Calendar, 
  Shield, 
  Brain,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/layout/Footer";
import { AIGuardian } from "@/components/dashboard/AIGuardian";
import { useChipiPay } from "@/lib/integrations/chipi/provider";
import { toast } from "sonner";

export default function CreateTandaPage() {
  const { isConnected, address } = useChipiPay();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contributionAmount: "",
    frequencyDays: "7",
    maxMembers: "",
    token: "USDC",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.description || !formData.contributionAmount || !formData.maxMembers) {
        toast.error("Completa todos los campos requeridos");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      window.history.back();
    }
  };

  const handleCreateTanda = async () => {
    if (!isConnected) {
      toast.error("Conecta tu wallet primero");
      return;
    }

    setLoading(true);
    try {
      // Simular creación de tanda
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("✅ Tanda creada exitosamente", {
        description: "Protección IA activada automáticamente",
      });
      
      setStep(3);
    } catch (error) {
      toast.error("❌ Error creando tanda");
    } finally {
      setLoading(false);
    }
  };

  const totalPool = parseFloat(formData.contributionAmount || "0") * parseInt(formData.maxMembers || "0");
  const frequencyText = formData.frequencyDays === "7" ? "semanal" : 
                       formData.frequencyDays === "14" ? "quincenal" : 
                       formData.frequencyDays === "30" ? "mensual" : "personalizada";

  return (
    <main className="min-h-screen bg-dark-950 relative overflow-hidden">
      
      {/* Neural Background */}
      <div className="absolute inset-0 bg-neural-mesh opacity-20" />
      
      {/* Floating Neural Elements */}
      {[...Array(15)].map((_, i) => {
        const positions = [
          { top: 10, left: 15 }, { top: 30, left: 85 }, { top: 50, left: 25 },
          { top: 70, left: 75 }, { top: 20, left: 45 }, { top: 60, left: 35 },
          { top: 5, left: 65 }, { top: 40, left: 95 }, { top: 80, left: 55 },
          { top: 25, left: 5 }, { top: 90, left: 30 }, { top: 15, left: 80 },
          { top: 35, left: 10 }, { top: 65, left: 90 }, { top: 85, left: 20 }
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
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 glass-card mb-8">
            <div className="w-8 h-8 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
              <span className="text-white text-sm">🧠</span>
            </div>
            <span className="text-sm font-medium text-dark-200">Crear Tanda Neural</span>
            <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
          </div>
          
          <h1 className="text-5xl font-bold text-dark-100 mb-6">
            Crear <span className="neural-text">Tanda Neural</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Ahorro comunitario protegido por IA • Círculos de confianza • Sin intermediarios
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center mb-16"
        >
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all ${
                  step >= s
                    ? "bg-neural-gradient text-white neural-glow"
                    : "glass-card text-dark-400"
                }`}
              >
                {s}
              </motion.div>
              {s < 3 && (
                <div
                  className={`w-20 h-1 mx-4 rounded-full transition-all ${
                    step > s ? "bg-neural-gradient" : "bg-dark-800"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-dark rounded-3xl p-8 neural-connection"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center neural-glow">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-dark-100">Información Básica</h2>
                <p className="text-dark-400">Configura los detalles de tu tanda</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <Label className="text-dark-200 font-medium mb-3 block">
                  Nombre de la Tanda *
                </Label>
                <Input
                  placeholder="Tanda Familiar Neural"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400"
                />
              </div>

              <div>
                <Label className="text-dark-200 font-medium mb-3 block">
                  Descripción *
                </Label>
                <Input
                  placeholder="Ahorro familiar protegido por IA para emergencias..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-dark-200 font-medium mb-3 block">
                    Contribución por Miembro (USD) *
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="500"
                      value={formData.contributionAmount}
                      onChange={(e) => handleInputChange("contributionAmount", e.target.value)}
                      className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400 pl-10"
                    />
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-neural-400 w-5 h-5" />
                  </div>
                </div>

                <div>
                  <Label className="text-dark-200 font-medium mb-3 block">
                    Máximo de Miembros *
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="10"
                      value={formData.maxMembers}
                      onChange={(e) => handleInputChange("maxMembers", e.target.value)}
                      className="glass-button border-neural-500 text-dark-100 placeholder:text-dark-400 pl-10"
                    />
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-neural-400 w-5 h-5" />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-dark-200 font-medium mb-3 block">
                  Frecuencia de Contribuciones
                </Label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "7", label: "Semanal", icon: Clock },
                    { value: "14", label: "Quincenal", icon: Calendar },
                    { value: "30", label: "Mensual", icon: Target },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => handleInputChange("frequencyDays", value)}
                      className={`p-4 rounded-2xl border-2 transition-all ${
                        formData.frequencyDays === value
                          ? "border-neural-500 bg-neural-500/10 neural-glow"
                          : "border-dark-600 glass-card hover:border-neural-500/50"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-neural-400 mx-auto mb-2" />
                      <div className="text-sm font-medium text-dark-100">{label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleNext}
                className="w-full neural-button text-lg py-4"
                size="lg"
              >
                <span className="flex items-center">
                  Continuar
                  <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
                </span>
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Review & AI Protection */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Review Card */}
            <Card className="glass-card-dark neural-connection">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center neural-glow">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-dark-100">Revisar Configuración</h2>
                    <p className="text-dark-400">Verifica los detalles antes de crear</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-dark-200 mb-4">Detalles de la Tanda</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-dark-400">Nombre:</span>
                          <span className="text-dark-100 font-medium">{formData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Descripción:</span>
                          <span className="text-dark-100 font-medium">{formData.description}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Contribución:</span>
                          <span className="text-dark-100 font-medium">${formData.contributionAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Miembros:</span>
                          <span className="text-dark-100 font-medium">{formData.maxMembers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Frecuencia:</span>
                          <span className="text-dark-100 font-medium">{frequencyText}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-dark-200 mb-4">Proyección</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-dark-400">Total del Pool:</span>
                          <span className="text-neural-400 font-bold">${totalPool.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Duración estimada:</span>
                          <span className="text-dark-100 font-medium">
                            {parseInt(formData.maxMembers || "0") * parseInt(formData.frequencyDays || "7")} días
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Token:</span>
                          <span className="text-dark-100 font-medium">{formData.token}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* AI Protection Card */}
            <Card className="glass-card-dark neural-connection border border-green-500/20">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center neural-glow">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark-100">Protección IA Neural</h3>
                    <p className="text-dark-400">Tu tanda estará protegida automáticamente</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-dark-200">Detección de fraudes en tiempo real</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-dark-200">Análisis de patrones de comportamiento</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-dark-200">Verificación de identidad</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-dark-200">Alertas de riesgo temprano</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-dark-200">Protección contra lavado de dinero</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-dark-200">Score de confianza por miembro</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="glass-button border-dark-600 text-dark-300 hover:bg-glass-white flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <Button 
                onClick={handleCreateTanda} 
                className="flex-1 neural-button" 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                    />
                    Creando Tanda Neural...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Crear Tanda Neural
                  </span>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-dark rounded-3xl p-12 text-center neural-connection"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-3xl flex items-center justify-center mx-auto mb-8 neural-glow"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>

            <h3 className="text-4xl font-bold text-dark-100 mb-4">
              ¡Tanda Neural Creada!
            </h3>
            <p className="text-xl text-dark-300 mb-12">
              Tu tanda "{formData.name}" está lista y protegida por IA
            </p>

            <div className="glass-card rounded-2xl p-6 mb-8 max-w-md mx-auto">
              <p className="text-sm text-dark-400 mb-3">ID de la Tanda Neural</p>
              <p className="font-mono text-sm text-dark-100 break-all">
                0x7b4f...9a2c
              </p>
            </div>

            {/* Stats de la tanda */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold neural-text mb-1">{formData.maxMembers}</div>
                <div className="text-xs text-dark-400">Miembros máx</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold neural-text mb-1">${formData.contributionAmount}</div>
                <div className="text-xs text-dark-400">Contribución</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold neural-text mb-1">${totalPool.toLocaleString()}</div>
                <div className="text-xs text-dark-400">Total pool</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                onClick={() => window.location.href = "/tandas"}
                className="neural-button"
              >
                <span className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Ver Todas las Tandas
                </span>
              </Button>
              <Button 
                onClick={() => setStep(1)}
                variant="outline"
                className="glass-button border-neural-500 text-dark-100 hover:bg-glass-white"
              >
                Crear Otra Tanda
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* AI Guardian Widget */}
      <AIGuardian />
      
      <Footer />
    </main>
  );
}
