import { entities } from "./entities";

export type researchBuilding = {
  name: string;
  description: string;
  hopsPerSecond: number;
  owned: number;
  cost: number;
  baseCost: number;
  growthRate: number;
  canPurchase: boolean;
  calculateCanPurchase: (entities: entities) => boolean;
  unlockHint: string;
  showUnlockHint: boolean;
};
