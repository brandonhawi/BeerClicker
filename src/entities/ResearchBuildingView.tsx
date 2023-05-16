import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import prettyPrintNumber from "../helpers/prettyPrintNumber";
import { researchBuilding } from "../types/research";
import { useMemo } from "react";

type Props = researchBuilding & { id: string };

const ResearchBuildingView = ({
  name,
  description,
  canPurchase,
  owned,
  hopsPerSecond,
  cost,
  id,
}: Props) => {
  const displayedCost = useMemo(() => {
    return prettyPrintNumber(Math.ceil(cost));
  }, [cost]);
  return (
    <ListItem disablePadding={true} className={id}>
      <Tooltip title={description} placement="right">
        <ListItemButton disabled={!canPurchase} className={id}>
          <Grid container direction="column" className={id}>
            <Grid item xs={12} className={id}>
              {name} [{hopsPerSecond} hops / second]
            </Grid>
            <Grid item xs={12} className={id}>
              Cost: {displayedCost} beers
            </Grid>
            <Grid item xs={12} className={id}>
              Owned: {owned}
            </Grid>
          </Grid>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

export default ResearchBuildingView;