"use client";

import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { GamificationManager } from "./gamification";

interface GamingContextType {
  isInitialized: boolean;
  userStats: {
    level: number;
    totalPoints: number;
    achievements: any[];
    streak: number;
    rank: number;
    badges: string[];
  } | null;
  leaderboard: any[];
  processAction: (action: any) => Promise<any>;
  getAchievements: (category?: string) => any[];
  getAchievementProgress: (achievementId: string) => any;
}

const GamingContext = createContext<GamingContextType>({
  isInitialized: false,
  userStats: null,
  leaderboard: [],
  processAction: async () => ({}),
  getAchievements: () => [],
  getAchievementProgress: () => ({})
});

export function GamingProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [userStats, setUserStats] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [gamificationManager] = useState(() => GamificationManager.getInstance());

  useEffect(() => {
    const initGaming = () => {
      try {
        // Cargar estadísticas del usuario
        const stats = gamificationManager.getUserStats('current_user');
        setUserStats(stats);
        
        // Cargar leaderboard
        const leaderboardData = gamificationManager.getLeaderboard();
        setLeaderboard(leaderboardData);
        
        setIsInitialized(true);
        console.log("✅ Gaming Manager initialized");
      } catch (error) {
        console.error("❌ Gaming Manager init error:", error);
        // Inicializar con datos por defecto en caso de error
        setUserStats({
          level: 1,
          totalPoints: 0,
          achievements: [],
          streak: 0,
          rank: 999,
          badges: []
        });
        setLeaderboard([]);
        setIsInitialized(true);
      }
    };

    initGaming();
  }, []);

  const processAction = async (action: any) => {
    try {
      const result = await gamificationManager.processUserAction(action, 'current_user');
      
      // Actualizar estadísticas
      const updatedStats = gamificationManager.getUserStats('current_user');
      setUserStats(updatedStats);
      
      return result;
    } catch (error) {
      console.error("❌ Error processing gaming action:", error);
      throw error;
    }
  };

  const getAchievements = (category?: string) => {
    if (category) {
      return gamificationManager.getAchievementsByCategory(category);
    }
    return gamificationManager.getAchievementsByCategory('all');
  };

  const getAchievementProgress = (achievementId: string) => {
    return gamificationManager.getAchievementProgress(achievementId, 'current_user');
  };

  return (
    <GamingContext.Provider
      value={{
        isInitialized,
        userStats,
        leaderboard,
        processAction,
        getAchievements,
        getAchievementProgress
      }}
    >
      {children}
    </GamingContext.Provider>
  );
}

export const useGaming = () => useContext(GamingContext);
