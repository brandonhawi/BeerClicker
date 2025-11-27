import { Building } from '../types/gameTypes';

/**
 * Check if a building can be purchased
 * @param building The building to check
 * @param wallet The total beers available
 * @returns True if the building can be purchased
 */
export function canPurchase(building: Building, wallet: number): boolean {
  return building.unlocked && wallet >= building.cost;
}

/**
 * Calculate the next cost for a building after purchase
 * @param building The building that was purchased
 * @returns The new cost
 */
export function calculateNextCost(building: Building): number {
  return Math.ceil(building.baseCost * Math.pow(building.growthRate, building.owned + 1));
}

/**
 * Calculate the total production per second for a building
 * @param building The building to calculate production for
 * @returns Production per second
 */
export function calculateProduction(building: Building): number {
  return building.owned * building.beersPerSecond;
}
