import { ResearchBuilding } from '../types/gameTypes';

/**
 * Initial research building definitions
 * All data is serializable (no functions)
 */
export const initialResearchBuildings: Record<string, ResearchBuilding> = {
  magnifyingGlass: {
    id: 'magnifyingGlass',
    name: 'Magnifying Glass',
    description: 'Zoom in and find hidden hops at the end of your beers',
    hopsPerSecond: 1,
    owned: 0,
    cost: 10,
    baseCost: 10,
    growthRate: 1.01,
    unlockHint: 'Unlocks when you own 3 total buildings',
  },
};

export default initialResearchBuildings;
