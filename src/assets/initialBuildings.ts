import { Building } from '../types/gameTypes';

/**
 * Initial building definitions
 * All data is serializable (no functions)
 */
export const initialBuildings: Record<string, Building> = {
  brewKit: {
    id: 'brewKit',
    name: 'Brew Kit',
    owned: 0,
    beersPerSecond: 0.1,
    baseCost: 10,
    cost: 10,
    growthRate: 1.01,
    purchaseText: 'Buy a Home Brew Kit',
    description:
      'An at home kit to passively generate beers while you sap on your couch.',
    unlocked: true,
  },
  fellowSapper: {
    id: 'fellowSapper',
    name: 'Fellow Sapper',
    owned: 0,
    beersPerSecond: 1,
    baseCost: 100,
    cost: 100,
    growthRate: 1.001,
    purchaseText: 'Hire a fellow sapper',
    description:
      "This guy says he'll buy you beer, in exchange for beer. Who knew frats were this desperate...",
    unlocked: false,
  },
  beerTree: {
    id: 'beerTree',
    name: 'Beer Tree',
    owned: 0,
    beersPerSecond: 10,
    baseCost: 1000,
    cost: 1000,
    growthRate: 1.0009,
    purchaseText: 'Plant a Beer Tree',
    description:
      'You dig a hole, pour beers into it, and hope that you have a good rainy season this year.',
    unlocked: false,
  },
  craftBrewery: {
    id: 'craftBrewery',
    name: 'Craft Brewery',
    owned: 0,
    beersPerSecond: 100,
    baseCost: 10000,
    cost: 10000,
    growthRate: 1.00007,
    purchaseText: 'Build a Craft Brewery',
    description: 'I guess we had to have one normal beer thing in this game.',
    unlocked: false,
  },
  hopetship: {
    id: 'hopetship',
    name: 'Hopetship',
    owned: 0,
    beersPerSecond: 1000,
    baseCost: 100000,
    cost: 100000,
    growthRate: 1.000005,
    purchaseText: 'Launch a Hopetship!',
    description:
      'Science has advanced to the point where rockets now use beer as fuel; launch a hopetship to gather hops on new frontiers.',
    unlocked: false,
  },
  corporateOffice: {
    id: 'corporateOffice',
    name: 'Corporate Office',
    owned: 0,
    beersPerSecond: 10000,
    baseCost: 1000000,
    cost: 1000000,
    growthRate: 1.0000006,
    purchaseText: 'Build a Corporate Office',
    description: 'Bureauctratic beers taste just as good.',
    unlocked: false,
  },
};

export default initialBuildings;
