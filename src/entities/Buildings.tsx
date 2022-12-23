import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import BuildingView from "./BuildingView";
import buildings from "../assets/buildings.json";

const Buildings = (props: { [key: string]: any }) => {
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
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List disablePadding={true} dense={true}>
        {allBuildingsRender}
      </List>
    </Drawer>
  );
};

export default Buildings;
