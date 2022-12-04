import { Grid, Menu } from "semantic-ui-react";
import BuildingView from "./BuildingView";
import buildings from "../assets/buildings.json";

const Buildings = (props: {[key: string]: any }) => {
  var allBuildingsRender = [];
  for (const [buildingID] of Object.entries(buildings)) {
    var currentBuildingRender = (
      <BuildingView
        key={buildingID}
        className={buildingID}
        owned={props[buildingID].owned}
        beersPerSecond={props[buildingID].beersPerSecond}
        cost={props[buildingID].cost}
        canPurchase={props[buildingID].canPurchase}
        purchaseText={props[buildingID].purchaseText}
        description={props[buildingID].description}
      />
    );
    allBuildingsRender.push(currentBuildingRender);
  }
  return (
    <Grid.Column width={4}>
      <Menu className="ui left vertical menu grid container">
        {allBuildingsRender}
      </Menu>
    </Grid.Column>
  );
};

export default Buildings;
