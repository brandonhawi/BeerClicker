import React, { PureComponent } from "react";
import { GameEngine } from "react-game-engine";
import { getFps, updateCanPurchase, updateTotalBeers, updateTotalBeersPerSecond, purchaseBuilding } from "./systems";
import { BeerClicker } from "./viewComponents/BeerClicker";
import { Buildings } from "./entities/Buildings";
import buildingsJSON from "./assets/buildings.json";


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

  render() {
    var buildingObjects = this.createBuildingObjects();
    return (
      <GameEngine
        className="gameDiv ui grid container"
        systems={[
          updateCanPurchase, getFps, updateTotalBeers,
          updateTotalBeersPerSecond, purchaseBuilding
        ]}
        entities={{
          //-- Notice that each entity has a unique id (required)
          //-- and a renderer property (optional). If no renderer
          //-- is supplied with the entity - it won't get displayed.
          beersPerSecond: { value: 0 },
          lastFrameTime: { value: performance.now() },
          fps: { value: 60 },
          buildings: {
            ...buildingObjects,
            renderer: <Buildings />
          },
          beerClicker: {
            totalBeers: 100000,
            totalBeersPerSecond: 0,
            renderer: <BeerClicker />
          }
        }}>
      </GameEngine>
    );
  }
}

export { Game };