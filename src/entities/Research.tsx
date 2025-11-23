import type { ReactNode } from "react";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ResearchBuildingView from "./ResearchBuildingView";
import { Chip, Grid, ListItem } from "@mui/material";
import prettyPrintNumber from "../helpers/prettyPrintNumber";
import { useResearchBuildings, useHops, useHopsPerSecond } from "../store/selectors";
import { useGameStore } from "../store/gameStore";
import { canPurchaseResearch, shouldShowUnlockHint } from "../game-logic/researchRules";

const Research = () => {
  const researchBuildings = useResearchBuildings();
  const totalHops = useHops();
  const totalHopsPerSecond = useHopsPerSecond();
  const state = useGameStore();

  const displayedHops = prettyPrintNumber(Math.floor(totalHops));
  const displayedHPS = prettyPrintNumber(
    Math.round(totalHopsPerSecond * 10) / 10
  );

  const researchBuildingsRender: ReactNode[] = [];
  Object.entries(researchBuildings).forEach(([researchBuildingId, researchBuilding]) => {
    researchBuildingsRender.push(
      <ResearchBuildingView
        key={researchBuildingId}
        id={researchBuildingId}
        name={researchBuilding.name}
        description={researchBuilding.description}
        hopsPerSecond={researchBuilding.hopsPerSecond}
        owned={researchBuilding.owned}
        cost={researchBuilding.cost}
        unlockHint={researchBuilding.unlockHint}
        canPurchase={canPurchaseResearch(researchBuilding, state)}
        showUnlockHint={shouldShowUnlockHint(researchBuilding, state)}
      />
    );
  });

  return (
    <Drawer
      variant="persistent"
      anchor="right"
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
        <ListItem disablePadding={true} sx={{ marginY: 2 }}>
          <Grid container direction="column">
            <Grid container justifyContent="space-around">
              <Chip label={`${displayedHops} hops`} />
              <Chip label={`${displayedHPS} hops per second`} />
            </Grid>
          </Grid>
        </ListItem>
        {researchBuildingsRender}
      </List>
    </Drawer>
  );
};

export default Research;
