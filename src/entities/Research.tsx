import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { researchBuilding } from "../types/research";
import ResearchBuildingView from "./ResearchBuildingView";
import { Chip, Grid, ListItem } from "@mui/material";
import prettyPrintNumber from "../helpers/prettyPrintNumber";

type Props = {
  research?: {
    researchBuildings: Map<string, researchBuilding>;
    totalHops: number;
    totalHopsPerSecond: number;
  };
};

const Research = ({ research }: Props) => {
  if (!research) {
    return null;
  }
  const { researchBuildings, totalHops, totalHopsPerSecond } = research;

  const displayedHops = prettyPrintNumber(Math.floor(totalHops!));
  const displayedHPS = prettyPrintNumber(
    Math.round(totalHopsPerSecond! * 10) / 10
  );

  const researchBuildingsRender: JSX.Element[] = [];
  researchBuildings.forEach((researchBuilding, researchBuildingId) => {
    researchBuildingsRender.push(
      <ResearchBuildingView
        id={researchBuildingId}
        key={researchBuildingId}
        {...researchBuilding}
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
