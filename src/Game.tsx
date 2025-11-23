"use client";

import "regenerator-runtime/runtime";
import { GameEngine } from "react-game-engine";
import {
  getFps,
  updateCanPurchase,
  updateTotalBeers,
  updateTotalBeersPerSecond,
  purchaseBuilding,
  updateTotalBuildings,
  updateAchievements,
  showBeerClickNumber,
  updateCanPurchaseResearchBuilding,
  updateTotalHops,
  purchaseResearchBuilding,
  updateTotalHopsPerSecond,
  unlockBuilding,
} from "./systems";
import BeerClicker from "./viewComponents/BeerClicker";
import Buildings from "./entities/Buildings";
import buildingData from "./assets/buildings";
import Achievements from "./entities/Achievements";
import achievementData from "./assets/achievements";
import { entities } from "./types/entities";
import { input } from "./types/input";
import researchBuildings from "./assets/researchBuildings";
import Research from "./entities/Research";

const Game = () => {
  return (
    <GameEngine<entities, input>
      style={{
        display: "flex",
        outline: "none",
        flex: "",
        alignItems: "start",
      }}
      systems={[
        updateTotalHops,
        updateCanPurchase,
        getFps,
        updateTotalBeers,
        updateTotalBeersPerSecond,
        updateTotalHopsPerSecond,
        purchaseBuilding,
        purchaseResearchBuilding,
        updateTotalBuildings,
        updateAchievements,
        showBeerClickNumber,
        updateCanPurchaseResearchBuilding,
        unlockBuilding,
      ]}
      entities={{
        //-- Notice that each entity has a unique id (required)
        //-- and a renderer property (optional). If no renderer
        //-- is supplied with the entity - it won't get displayed.
        beersPerSecond: { value: 0 },
        hopsPerSecond: { value: 0 },
        beersPerClick: { value: 1 },
        lastFrameTime: { value: performance.now() },
        fps: { value: 60 },
        totalBuildings: { value: 0 },
        buildings: {
          buildings: {
            buildingData,
          },
          nextBuildingId: "fellowSapper",
          nextBuildingName: "Fellow Sapper",
          renderer: <Buildings />,
        },
        beerClicker: {
          lifetimeBeers: 0,
          totalBeers: 0,
          totalBeersPerSecond: 0,
          renderer: <BeerClicker />,
        },
        achievements: {
          achievements: { achievementData },
          renderer: <Achievements />,
        },
        research: {
          research: {
            researchBuildings,
            totalHops: 0,
            lifetimeHops: 0,
            totalHopsPerSecond: 0,
          },
          renderer: <Research />,
        },
      }}
    />
  );
};

export default Game;
