// Core type definitions for the game (no functions, only data)

export type Building = {
  id: string;
  name: string;
  owned: number;
  beersPerSecond: number;
  baseCost: number;
  cost: number;
  growthRate: number;
  purchaseText: string;
  description: string;
  unlocked: boolean;
};

export type Achievement = {
  id: string;
  name: string;
  earned: boolean;
  earnedAt?: number; // Timestamp when achievement was earned
  description: string;
  hint: string;
};

export type ResearchBuilding = {
  id: string;
  name: string;
  description: string;
  hopsPerSecond: number;
  owned: number;
  cost: number;
  baseCost: number;
  growthRate: number;
  unlockHint: string;
};

// Game State - all serializable state
export interface GameState {
  // Resources
  totalBeers: number;
  lifetimeBeers: number;
  beersPerClick: number;
  totalHops: number;
  lifetimeHops: number;

  // Collections (objects, not Maps)
  buildings: Record<string, Building>;
  achievements: Record<string, Achievement>;
  researchBuildings: Record<string, ResearchBuilding>;

  // UI State
  nextBuildingId: string | null;
  nextBuildingName: string | null;

  // Performance
  lastFrameTime: number;
  fps: number;

  // Game Control
  isRunning: boolean;
  lastSaveTime: number;
}

// Game Actions - all actions that modify state
export interface GameActions {
  // Resource Actions
  incrementBeers: (amount: number) => void;
  spendBeers: (amount: number) => boolean;
  incrementHops: (amount: number) => void;
  clickBeer: (clientX: number, clientY: number) => void;

  // Building Actions
  purchaseBuilding: (id: string) => void;
  unlockBuilding: (id: string) => void;

  // Research Actions
  purchaseResearchBuilding: (id: string) => void;

  // Achievement Actions
  unlockAchievement: (id: string) => void;

  // Performance Actions
  updatePerformance: (fps: number, frameTime: number) => void;

  // Game Control
  resetGame: () => void;
}

// Combined Store Type
export type GameStore = GameState & GameActions;
