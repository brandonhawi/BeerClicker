import { GameState } from '../types/gameTypes';

/**
 * Achievement condition functions
 * Each function takes the game state and returns whether the achievement should be earned
 */
export const achievementRules: Record<string, (state: GameState) => boolean> = {
  // Total buildings achievements
  totalBuilding1: (state: GameState) => {
    const totalBuildings = Object.values(state.buildings).reduce(
      (sum, building) => sum + building.owned,
      0
    );
    return totalBuildings >= 1;
  },

  totalBuilding2: (state: GameState) => {
    const totalBuildings = Object.values(state.buildings).reduce(
      (sum, building) => sum + building.owned,
      0
    );
    return totalBuildings >= 10;
  },

  // Lifetime beers achievements
  totalBeers1: (state: GameState) => {
    return state.lifetimeBeers >= 1000;
  },

  // Specific building achievements
  homeBrewKit1: (state: GameState) => {
    const brewKit = state.buildings.brewKit;
    return brewKit ? brewKit.owned >= 1 : false;
  },

  fellowSapper1: (state: GameState) => {
    const fellowSapper = state.buildings.fellowSapper;
    return fellowSapper ? fellowSapper.owned >= 1 : false;
  },

  beerTree1: (state: GameState) => {
    const beerTree = state.buildings.beerTree;
    return beerTree ? beerTree.owned >= 1 : false;
  },
};
