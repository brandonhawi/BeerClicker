import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import BuildingView from "./BuildingView";
import { Building } from "../types/building";
import { Button, Grid, ListItem } from "@mui/material";

type Props = {
  buildings?: {
    buildingData: Map<string, Building>;
  };
  nextBuildingName?: string;
  nextBuildingId?: string;
};

const Buildings = ({ buildings, nextBuildingId, nextBuildingName }: Props) => {
  if (!buildings) {
    return null;
  }
  const { buildingData } = buildings;

  const buildingsRender: JSX.Element[] = [];
  buildingData.forEach(
    (
      {
        owned,
        beersPerSecond,
        cost,
        canPurchase,
        purchaseText,
        description,
        unlocked,
      },
      buildingId
    ) => {
      if (unlocked) {
        buildingsRender.push(
          <BuildingView
            key={buildingId}
            className={buildingId}
            owned={owned}
            beersPerSecond={beersPerSecond}
            cost={cost}
            canPurchase={canPurchase}
            purchaseText={purchaseText}
            description={description}
          />
        );
      }
    }
  );

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
        <ListItem disablePadding={true}>
          <Grid container justifyContent="center">
            <Button id={nextBuildingId}>Unlock {nextBuildingName}</Button>
          </Grid>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Buildings;
