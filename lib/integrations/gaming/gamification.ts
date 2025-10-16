/**
 * Gaming & Gamification Integration
 * Para Gaming Track ($5,000)
 */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  category: 'savings' | 'community' | 'security' | 'transactions';
}

export interface UserStats {
  level: number;
  totalPoints: number;
  achievements: Achievement[];
  streak: number;
  rank: number;
  badges: string[];
}

export interface LeaderboardEntry {
  rank: number;
  address: string;
  points: number;
  level: number;
  achievements: number;
}

export class GamificationManager {
  private static instance: GamificationManager;
  private achievements: Achievement[] = [];
  private userStats: UserStats | null = null;

  public static getInstance(): GamificationManager {
    if (!GamificationManager.instance) {
      GamificationManager.instance = new GamificationManager();
    }
    return GamificationManager.instance;
  }

  constructor() {
    this.initializeAchievements();
  }

  /**
   * Inicializa todos los logros disponibles
   */
  private initializeAchievements(): void {
    this.achievements = [
      // Savings Achievements
      {
        id: 'first_contribution',
        name: 'Primera Contribución',
        description: 'Realiza tu primera contribución a una tanda',
        icon: '💰',
        points: 100,
        unlocked: false,
        category: 'savings'
      },
      {
        id: 'savings_streak_7',
        name: 'Racha de Ahorro',
        description: 'Contribuye 7 días consecutivos',
        icon: '🔥',
        points: 500,
        unlocked: false,
        category: 'savings'
      },
      {
        id: 'big_saver',
        name: 'Gran Ahorrador',
        description: 'Ahorra más de $10,000 MXN en tandas',
        icon: '🏆',
        points: 1000,
        unlocked: false,
        category: 'savings'
      },
      
      // Community Achievements
      {
        id: 'community_builder',
        name: 'Constructor de Comunidad',
        description: 'Crea tu primera tanda',
        icon: '👥',
        points: 300,
        unlocked: false,
        category: 'community'
      },
      {
        id: 'tanda_master',
        name: 'Maestro de Tandas',
        description: 'Participa en 10 tandas diferentes',
        icon: '🎯',
        points: 800,
        unlocked: false,
        category: 'community'
      },
      {
        id: 'trusted_member',
        name: 'Miembro de Confianza',
        description: 'Recibe 5 recomendaciones de otros miembros',
        icon: '⭐',
        points: 600,
        unlocked: false,
        category: 'community'
      },
      
      // Security Achievements
      {
        id: 'security_guardian',
        name: 'Guardián de Seguridad',
        description: 'Activa todas las protecciones de IA',
        icon: '🛡️',
        points: 400,
        unlocked: false,
        category: 'security'
      },
      {
        id: 'privacy_champion',
        name: 'Campeón de Privacidad',
        description: 'Usa transacciones privadas 10 veces',
        icon: '🔒',
        points: 700,
        unlocked: false,
        category: 'security'
      },
      
      // Transaction Achievements
      {
        id: 'frequent_sender',
        name: 'Enviador Frecuente',
        description: 'Envía dinero 50 veces',
        icon: '📤',
        points: 300,
        unlocked: false,
        category: 'transactions'
      },
      {
        id: 'speed_demon',
        name: 'Demonio de Velocidad',
        description: 'Completa 10 transacciones en menos de 1 minuto',
        icon: '⚡',
        points: 500,
        unlocked: false,
        category: 'transactions'
      }
    ];
  }

  /**
   * Obtiene estadísticas del usuario
   */
  getUserStats(userAddress: string): UserStats {
    // Simulación de datos del usuario
    const userStats: UserStats = {
      level: 5,
      totalPoints: 2500,
      achievements: this.achievements.filter(a => a.unlocked),
      streak: 12,
      rank: 15,
      badges: ['savings_master', 'community_leader', 'security_expert']
    };

    this.userStats = userStats;
    return userStats;
  }

  /**
   * Procesa una acción del usuario y verifica logros
   */
  async processUserAction(
    action: {
      type: 'contribution' | 'transaction' | 'tanda_creation' | 'security_setting';
      data: any;
    },
    userAddress: string
  ): Promise<{
    pointsEarned: number;
    newAchievements: Achievement[];
    levelUp: boolean;
    newLevel?: number;
  }> {
    let pointsEarned = 0;
    const newAchievements: Achievement[] = [];

    // Procesar diferentes tipos de acciones
    switch (action.type) {
      case 'contribution':
        pointsEarned += this.processContribution(action.data);
        break;
      case 'transaction':
        pointsEarned += this.processTransaction(action.data);
        break;
      case 'tanda_creation':
        pointsEarned += this.processTandaCreation(action.data);
        break;
      case 'security_setting':
        pointsEarned += this.processSecuritySetting(action.data);
        break;
    }

    // Verificar nuevos logros
    const achievements = await this.checkNewAchievements(userAddress, action);
    newAchievements.push(...achievements);

    // Verificar subida de nivel
    const levelUp = await this.checkLevelUp(userAddress, pointsEarned);

    return {
      pointsEarned,
      newAchievements,
      levelUp,
      newLevel: levelUp ? (this.userStats?.level || 0) + 1 : undefined
    };
  }

  /**
   * Obtiene el leaderboard
   */
  getLeaderboard(limit: number = 10): LeaderboardEntry[] {
    // Simulación de leaderboard
    return Array.from({ length: limit }, (_, i) => ({
      rank: i + 1,
      address: `0x${Math.random().toString(36).substr(2, 40)}`,
      points: 10000 - (i * 500),
      level: 10 - i,
      achievements: 20 - i
    }));
  }

  /**
   * Obtiene logros por categoría
   */
  getAchievementsByCategory(category: string): Achievement[] {
    return this.achievements.filter(a => a.category === category);
  }

  /**
   * Obtiene progreso hacia un logro específico
   */
  getAchievementProgress(achievementId: string, userAddress: string): {
    progress: number;
    maxProgress: number;
    percentage: number;
  } {
    // Simulación de progreso
    const achievement = this.achievements.find(a => a.id === achievementId);
    if (!achievement) {
      return { progress: 0, maxProgress: 0, percentage: 0 };
    }

    // Lógica específica por logro
    let progress = 0;
    let maxProgress = 1;

    switch (achievementId) {
      case 'first_contribution':
        progress = 1;
        maxProgress = 1;
        break;
      case 'savings_streak_7':
        progress = 3;
        maxProgress = 7;
        break;
      case 'big_saver':
        progress = 5000;
        maxProgress = 10000;
        break;
      case 'community_builder':
        progress = 1;
        maxProgress = 1;
        break;
      case 'tanda_master':
        progress = 3;
        maxProgress = 10;
        break;
    }

    return {
      progress,
      maxProgress,
      percentage: Math.round((progress / maxProgress) * 100)
    };
  }

  private processContribution(data: any): number {
    return 50; // Puntos por contribución
  }

  private processTransaction(data: any): number {
    return 25; // Puntos por transacción
  }

  private processTandaCreation(data: any): number {
    return 100; // Puntos por crear tanda
  }

  private processSecuritySetting(data: any): number {
    return 75; // Puntos por configuración de seguridad
  }

  private async checkNewAchievements(userAddress: string, action: any): Promise<Achievement[]> {
    const newAchievements: Achievement[] = [];
    
    // Lógica para verificar nuevos logros basada en la acción
    // Esto sería más complejo en una implementación real
    
    return newAchievements;
  }

  private async checkLevelUp(userAddress: string, pointsEarned: number): Promise<boolean> {
    if (!this.userStats) return false;
    
    const currentLevel = this.userStats.level;
    const pointsNeededForNextLevel = currentLevel * 1000;
    
    return (this.userStats.totalPoints + pointsEarned) >= pointsNeededForNextLevel;
  }
}
