import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import BuildingView from "./BuildingView";
import { Building } from "../types/building";

type Props = {
  buildings?: {
    buildingData: Map<string, Building>;
  };
};

const Buildings = ({ buildings }: Props) => {
  if (!buildings) {
    return null;
  }
  const { buildingData } = buildings;

  const buildingsRender: JSX.Element[] = [];
  buildingData.forEach(
    (
      { owned, beersPerSecond, cost, canPurchase, purchaseText, description },
      buildingId
    ) => {
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
      </List>
    </Drawer>
  );
};

export default Buildings;
