import { GameState, ResearchBuilding } from '../types/gameTypes';

/**
 * Research building unlock condition functions
 * Each function takes the game state and returns whether the research building can be unlocked
 */
export const researchUnlockConditions: Record<string, (state: GameState) => boolean> = {
  magnifyingGlass: (state: GameState) => {
    const totalBuildings = Object.values(state.buildings).reduce(
      (sum, building) => sum + building.owned,
      0
    );
    return totalBuildings >= 3;
  },
};

/**
 * Check if a research building can be purchased
 * @param research The research building to check
 * @param state The current game state
 * @returns True if the research building can be purchased
 */
export function canPurchaseResearch(research: ResearchBuilding, state: GameState): boolean {
  const unlockCondition = researchUnlockConditions[research.id];
  const isUnlocked = unlockCondition ? unlockCondition(state) : true;
  const hasEnoughHops = state.totalHops >= research.cost;

  return isUnlocked && hasEnoughHops;
}

/**
 * Check if the unlock hint should be shown for a research building
 * @param research The research building to check
 * @param state The current game state
 * @returns True if the unlock hint should be displayed
 */
export function shouldShowUnlockHint(research: ResearchBuilding, state: GameState): boolean {
  const unlockCondition = researchUnlockConditions[research.id];
  const isUnlocked = unlockCondition ? unlockCondition(state) : true;

  return !isUnlocked;
}

/**
 * Calculate the next cost for a research building after purchase
 * @param research The research building that was purchased
 * @returns The new cost
 */
export function calculateNextResearchCost(research: ResearchBuilding): number {
  return Math.ceil(research.baseCost * Math.pow(research.growthRate, research.owned + 1));
}

/**
 * Calculate the total hops production per second for a research building
 * @param research The research building to calculate production for
 * @returns Hops production per second
 */
export function calculateResearchProduction(research: ResearchBuilding): number {
  return research.owned * research.hopsPerSecond;
}
