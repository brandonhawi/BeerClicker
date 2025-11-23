import type { ReactNode } from "react";

import { Achievement } from "./achievement";
import { Building } from "./building";
import { researchBuilding } from "./research";

export type entities = {
  beersPerSecond: {
    value: number;
  };
  hopsPerSecond: {
    value: number;
  };
  beersPerClick: {
    value: number;
  };
  lastFrameTime: {
    value: number;
  };
  fps: {
    value: number;
  };
  totalBuildings: {
    value: number;
  };
  buildings: {
    buildings: {
      buildingData: Map<string, Building>;
    };
    nextBuildingName?: string;
    nextBuildingId?: string;
    renderer: ReactNode;
  };
  beerClicker: {
    lifetimeBeers: number;
    totalBeers: number;
    totalBeersPerSecond: number;
    renderer: ReactNode;
  };
  achievements: {
    achievements: {
      achievementData: Map<string, Achievement>;
    };
    renderer: ReactNode;
  };
  research: {
    research: {
      researchBuildings: Map<string, researchBuilding>;
      totalHops: number;
      lifetimeHops: number;
      totalHopsPerSecond: number;
    };
    renderer: ReactNode;
  };
};
