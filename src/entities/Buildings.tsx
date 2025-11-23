import type { ReactNode } from "react";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import BuildingView from "./BuildingView";
import { Button, Grid, ListItem } from "@mui/material";
import { useBuildings, useBeers, useNextBuildingId, useNextBuildingName } from "../store/selectors";
import { useGameStore } from "../store/gameStore";
import { canPurchase } from "../game-logic/buildingRules";

const Buildings = () => {
  const buildings = useBuildings();
  const totalBeers = useBeers();
  const nextBuildingId = useNextBuildingId();
  const nextBuildingName = useNextBuildingName();
  const unlockBuilding = useGameStore((state) => state.unlockBuilding);

  const buildingsRender: ReactNode[] = [];
  Object.entries(buildings).forEach(([buildingId, building]) => {
    if (building.unlocked) {
      buildingsRender.push(
        <BuildingView
          key={buildingId}
          id={buildingId}
          name={building.name}
          owned={building.owned}
          beersPerSecond={building.beersPerSecond}
          cost={building.cost}
          canPurchase={canPurchase(building, totalBeers)}
          purchaseText={building.purchaseText}
          description={building.description}
        />
      );
    }
  });

  const handleUnlockClick = () => {
    if (nextBuildingId) {
      unlockBuilding(nextBuildingId);
    }
  };

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
        {buildingsRender}
        {nextBuildingId && (
          <ListItem disablePadding={true}>
            <Grid container justifyContent="center">
              <Button id={nextBuildingId} onClick={handleUnlockClick}>
                Unlock {nextBuildingName}
              </Button>
            </Grid>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Buildings;
