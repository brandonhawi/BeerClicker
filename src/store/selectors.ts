import { useGameStore } from './gameStore';
import { calculateProduction } from '../game-logic/buildingRules';
import { calculateResearchProduction } from '../game-logic/researchRules';

/**
 * Performance-optimized selector hooks
 * These hooks subscribe to specific slices of state to prevent unnecessary re-renders
 */

// Resource Selectors
export const useBeers = () => useGameStore((state) => state.totalBeers);
export const useLifetimeBeers = () => useGameStore((state) => state.lifetimeBeers);
export const useBeersPerClick = () => useGameStore((state) => state.beersPerClick);
export const useHops = () => useGameStore((state) => state.totalHops);
export const useLifetimeHops = () => useGameStore((state) => state.lifetimeHops);

// Computed Resource Selectors
export const useBeersPerSecond = () =>
  useGameStore((state) =>
    Object.values(state.buildings).reduce((total, building) => {
      return total + calculateProduction(building);
    }, 0)
  );

export const useHopsPerSecond = () =>
  useGameStore((state) =>
    Object.values(state.researchBuildings).reduce((total, research) => {
      return total + calculateResearchProduction(research);
    }, 0)
  );

export const useTotalBuildings = () =>
  useGameStore((state) =>
    Object.values(state.buildings).reduce((total, building) => {
      return total + building.owned;
    }, 0)
  );

// Collection Selectors
export const useBuildings = () => useGameStore((state) => state.buildings);
export const useAchievements = () => useGameStore((state) => state.achievements);
export const useResearchBuildings = () => useGameStore((state) => state.researchBuildings);

// UI State Selectors
export const useNextBuildingId = () => useGameStore((state) => state.nextBuildingId);
export const useNextBuildingName = () => useGameStore((state) => state.nextBuildingName);

// Performance Selectors
export const useFPS = () => useGameStore((state) => state.fps);
export const useLastFrameTime = () => useGameStore((state) => state.lastFrameTime);

// Action Selectors (stable references)
export const useGameActions = () =>
  useGameStore((state) => ({
    incrementBeers: state.incrementBeers,
    spendBeers: state.spendBeers,
    incrementHops: state.incrementHops,
    clickBeer: state.clickBeer,
    purchaseBuilding: state.purchaseBuilding,
    unlockBuilding: state.unlockBuilding,
    purchaseResearchBuilding: state.purchaseResearchBuilding,
    unlockAchievement: state.unlockAchievement,
    updatePerformance: state.updatePerformance,
    resetGame: state.resetGame,
  }));
