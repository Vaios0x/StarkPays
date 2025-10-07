"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp,
  Award,
  Medal,
  Crown,
  Flame,
  CheckCircle2,
  Lock,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useGaming } from "@/lib/integrations/gaming/provider";
import { toast } from "sonner";

export default function GamingPage() {
  const { 
    isInitialized, 
    userStats, 
    leaderboard, 
    processAction, 
    getAchievements, 
    getAchievementProgress 
  } = useGaming();
  
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard' | 'stats'>('achievements');
  const [loading, setLoading] = useState(false);

  const achievementCategories = [
    { id: 'savings', name: 'Ahorro', icon: Target, color: 'from-green-500 to-green-700' },
    { id: 'community', name: 'Comunidad', icon: Users, color: 'from-blue-500 to-blue-700' },
    { id: 'security', name: 'Seguridad', icon: Shield, color: 'from-purple-500 to-purple-700' },
    { id: 'transactions', name: 'Transacciones', icon: Zap, color: 'from-yellow-500 to-yellow-700' }
  ];

  const handleProcessAction = async (actionType: string) => {
    setLoading(true);
    try {
      const result = await processAction({
        type: actionType,
        data: { timestamp: Date.now() }
      });
      
      if (result.pointsEarned > 0) {
        toast.success(`✅ +${result.pointsEarned} puntos ganados!`);
      }
      
      if (result.newAchievements.length > 0) {
        result.newAchievements.forEach((achievement: any) => {
          toast.success(`🏆 Logro desbloqueado: ${achievement.name}`);
        });
      }
      
      if (result.levelUp) {
        toast.success(`🎉 ¡Subiste al nivel ${result.newLevel}!`);
      }
    } catch (error) {
      toast.error("❌ Error procesando acción");
    } finally {
      setLoading(false);
    }
  };

  // Mostrar contenido siempre, con datos por defecto si no están cargados
  const displayStats = userStats || {
    level: 1,
    totalPoints: 0,
    achievements: [],
    streak: 0,
    rank: 999,
    badges: []
  };

  return (
    <main className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Neural Background */}
      <div className="absolute inset-0 bg-neural-mesh opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 glass-card mb-8">
            <div className="w-8 h-8 bg-neural-gradient rounded-full flex items-center justify-center neural-glow">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-dark-200">Gaming & Gamification</span>
            <div className="w-2 h-2 bg-neural-400 rounded-full neural-pulse"></div>
          </div>
          
          <h1 className="text-5xl font-bold text-dark-100 mb-6">
            Gaming <span className="neural-text">Neural</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Gamificación completa para motivar el ahorro y la participación comunitaria
          </p>
        </motion.div>

        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold neural-text mb-2">
                Nivel {displayStats.level}
              </div>
              <div className="text-sm text-dark-400">Tu Nivel</div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold neural-text mb-2">
                {displayStats.totalPoints.toLocaleString()}
              </div>
              <div className="text-sm text-dark-400">Puntos Totales</div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold neural-text mb-2">
                {displayStats.streak}
              </div>
              <div className="text-sm text-dark-400">Racha Actual</div>
            </div>
          </Card>

          <Card className="glass-card-dark neural-connection">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold neural-text mb-2">
                #{displayStats.rank}
              </div>
              <div className="text-sm text-dark-400">Ranking Global</div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex space-x-1 glass-card-dark p-1 rounded-2xl max-w-lg mx-auto">
            {[
              { id: 'achievements', label: 'Logros', icon: Trophy },
              { id: 'leaderboard', label: 'Ranking', icon: TrendingUp },
              { id: 'stats', label: 'Estadísticas', icon: Target }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-neural-gradient text-white neural-glow'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {activeTab === 'achievements' && (
            <div className="space-y-8">
              {/* Achievement Categories */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {achievementCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="glass-card-dark neural-connection hover:neural-glow transition-all duration-300">
                      <div className="p-6 text-center">
                        <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-dark-100 mb-2">
                          {category.name}
                        </h3>
                        <div className="text-2xl font-bold neural-text">
                          {getAchievements(category.id).length}
                        </div>
                        <div className="text-sm text-dark-400">Logros</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Achievements List */}
              <div className="grid md:grid-cols-2 gap-6">
                {getAchievements().map((achievement: any, index: number) => {
                  const progress = getAchievementProgress(achievement.id);
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <Card className="glass-card-dark neural-connection">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                achievement.unlocked 
                                  ? 'bg-neural-gradient neural-glow' 
                                  : 'bg-dark-800'
                              }`}>
                                <span className="text-2xl">{achievement.icon}</span>
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-dark-100 mb-1">
                                  {achievement.name}
                                </h3>
                                <p className="text-sm text-dark-300">
                                  {achievement.description}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold neural-text mb-1">
                                {achievement.points}
                              </div>
                              <div className="text-xs text-dark-400">puntos</div>
                            </div>
                          </div>
                          
                          {!achievement.unlocked && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm text-dark-400">
                                <span>Progreso</span>
                                <span>{progress.percentage}%</span>
                              </div>
                              <Progress value={progress.percentage} className="h-2" />
                              <div className="text-xs text-dark-400">
                                {progress.progress} / {progress.maxProgress}
                              </div>
                            </div>
                          )}
                          
                          {achievement.unlocked && (
                            <div className="flex items-center space-x-2 text-green-400">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-sm font-medium">Desbloqueado</span>
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <Card className="glass-card-dark neural-connection">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-dark-100 mb-6">
                  Ranking Global
                </h3>
                
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <motion.div
                      key={entry.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className={`flex items-center justify-between p-4 rounded-xl ${
                        entry.rank <= 3 
                          ? 'bg-neural-gradient/20 border border-neural-500/30' 
                          : 'bg-dark-800/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          entry.rank === 1 ? 'bg-yellow-500' :
                          entry.rank === 2 ? 'bg-gray-400' :
                          entry.rank === 3 ? 'bg-orange-500' :
                          'bg-dark-700'
                        }`}>
                          {entry.rank <= 3 ? (
                            <Medal className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-sm font-bold text-white">#{entry.rank}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-dark-100">
                            {entry.address.slice(0, 8)}...{entry.address.slice(-6)}
                          </div>
                          <div className="text-sm text-dark-400">
                            Nivel {entry.level}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold neural-text">
                          {entry.points.toLocaleString()}
                        </div>
                        <div className="text-sm text-dark-400">
                          {entry.achievements} logros
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'stats' && (
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass-card-dark neural-connection">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-dark-100 mb-6">
                    Acciones Rápidas
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { action: 'contribution', label: 'Hacer Contribución', points: 50 },
                      { action: 'transaction', label: 'Enviar Dinero', points: 25 },
                      { action: 'tanda_creation', label: 'Crear Tanda', points: 100 },
                      { action: 'security_setting', label: 'Configurar Seguridad', points: 75 }
                    ].map((action, index) => (
                      <motion.div
                        key={action.action}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                      >
                        <Button
                          onClick={() => handleProcessAction(action.action)}
                          disabled={loading}
                          className="w-full justify-between neural-button"
                        >
                          <span>{action.label}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">+{action.points}</span>
                            <Play className="w-4 h-4" />
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="glass-card-dark neural-connection">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-dark-100 mb-6">
                    Progreso del Nivel
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-dark-400 mb-2">
                        <span>Nivel {displayStats.level}</span>
                        <span>Nivel {displayStats.level + 1}</span>
                      </div>
                      <Progress value={75} className="h-3" />
                      <div className="text-xs text-dark-400 mt-2">
                        7,500 / 10,000 puntos para el siguiente nivel
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold neural-text">
                          {displayStats.achievements.length}
                        </div>
                        <div className="text-sm text-dark-400">Logros</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold neural-text">
                          {displayStats.badges.length}
                        </div>
                        <div className="text-sm text-dark-400">Insignias</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
