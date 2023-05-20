import { entities } from "../types/entities";
import { researchBuilding } from "../types/research";

const researchBuildings: Map<string, researchBuilding> = new Map([
  [
    "magnifyingGlass",
    {
      name: "Magnifying Glass",
      description: "Zoom in and find hidden hops at the end of your beers",
      hopsPerSecond: 1,
      canPurchase: false,
      calculateCanPurchase: (entities: entities) =>
        entities.totalBuildings.value >= 3,
      owned: 0,
      cost: 10,
      baseCost: 10,
      growthRate: 1.01,
      unlockHint: "Unlocks when you own 3 total buildings",
    },
  ],
]);

export default researchBuildings;
