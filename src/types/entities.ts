import { Achievement } from "./achievement";
import { Building } from "./building";

export type entities = {
  beersPerSecond: {
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
};
