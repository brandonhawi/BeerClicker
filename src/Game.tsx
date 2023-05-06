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
} from "./systems";
import BeerClicker from "./viewComponents/BeerClicker";
import Buildings from "./entities/Buildings";
import buildings from "./assets/buildings.json";
import achievements from "./assets/achievements.json";

const Game = () => {
  return (
    <GameEngine
      style={{
        display: "flex",
        outline: "none",
        flex: "",
        alignItems: "start",
      }}
      systems={[
        updateCanPurchase,
        getFps,
        updateTotalBeers,
        updateTotalBeersPerSecond,
        purchaseBuilding,
        updateTotalBuildings,
        updateAchievements,
        showBeerClickNumber,
      ]}
      entities={{
        //-- Notice that each entity has a unique id (required)
        //-- and a renderer property (optional). If no renderer
        //-- is supplied with the entity - it won't get displayed.
        beersPerSecond: { value: 0 },
        beersPerClick: { value: 1 },
        lastFrameTime: { value: performance.now() },
        fps: { value: 60 },
        totalBuildings: { value: 0 },
        buildings: {
          ...buildings,
          renderer: <Buildings />,
        },
        beerClicker: {
          lifetimeBeers: 0,
          totalBeers: 0,
          totalBeersPerSecond: 0,
          renderer: <BeerClicker />,
        },
        achievements: {
          ...achievements,
        },
        // research: {
        //   //
        // }
      }}
    ></GameEngine>
  );
};

export default Game;
