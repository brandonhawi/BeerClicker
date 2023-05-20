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
    nextBuildingName: string;
    nextBuildingId: string;
    renderer: JSX.Element;
  };
  beerClicker: {
    lifetimeBeers: number;
    totalBeers: number;
    totalBeersPerSecond: number;
    renderer: JSX.Element;
  };
  achievements: {
    achievements: {
      achievementData: Map<string, Achievement>;
    };
    renderer: JSX.Element;
  };
  research: {
    research: {
      researchBuildings: Map<string, researchBuilding>;
      totalHops: number;
      lifetimeHops: number;
      totalHopsPerSecond: number;
    };
    renderer: JSX.Element;
  };
};
