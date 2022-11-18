import React, { PureComponent } from "react";
import { GameEngine } from "react-game-engine";
import { 
  getFps, updateCanPurchase, updateTotalBeers, 
  updateTotalBeersPerSecond, purchaseBuilding,
  updateTotalBuildings, updateAchievements} from "./systems";
import { BeerClicker } from "./viewComponents/BeerClicker";
import { Buildings } from "./entities/Buildings";
import buildingsJSON from "./assets/buildings.json";
import achievementsJSON from "./assets/achievements.json";


export default class Game extends PureComponent {
  createBuildingObjects() {
    var buildings = buildingsJSON["buildings"];
    var buildingObjects = {};
    for (var index in buildings) {
      var buildingID = buildings[index].buildingID;
      buildingObjects[buildingID] = buildings[index];
    }
    return buildingObjects;
  }

  createAchievementObjects() {
    var achievements = achievementsJSON["achievements"];
    var achievementObjects = {};
    for (var index in achievements) {
      var achievementID = achievements[index].achievementID;
      achievementObjects[achievementID] = achievements[index];
    }
    return achievementObjects;
  }

  render() {
    var buildingObjects = this.createBuildingObjects();
    var achievementObjects = this.createAchievementObjects();
    return (
      <GameEngine
        className="gameDiv ui grid container"
        systems={[
          updateCanPurchase, getFps, updateTotalBeers,
          updateTotalBeersPerSecond, purchaseBuilding,
          updateTotalBuildings, updateAchievements
        ]}
        entities={{
          //-- Notice that each entity has a unique id (required)
          //-- and a renderer property (optional). If no renderer
          //-- is supplied with the entity - it won't get displayed.
          counter: { value: 0 },
          beersPerSecond: { value: 0 },
          lastFrameTime: { value: performance.now() },
          fps: { value: 60 },
          totalBuildings: { value: 0 },
          buildings: {
            ...buildingObjects,
            renderer: <Buildings />
          },
          beerClicker: {
            totalBeers: 0,
            totalBeersPerSecond: 0,
            renderer: <BeerClicker />
          },
          achievements: {
            ...achievementObjects,
            //renderer: <Achievements /> 
          }
          // research: {
          //   //
          // }
        }}>
      </GameEngine>
    );
  }
}

export { Game };