import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import prettyPrintNumber from "../helpers/prettyPrintNumber";
import { useMemo } from "react";

type Props = {
  className: string;
  canPurchase: boolean;
  purchaseText: string;
  beersPerSecond: number;
  owned: number;
  cost: number;
  description: string;
};

const BuildingView = ({
  className,
  canPurchase,
  purchaseText,
  beersPerSecond,
  owned,
  cost,
  description,
}: Props) => {
  const displayedCost = useMemo(() => {
    return prettyPrintNumber(Math.ceil(cost));
  }, [cost]);
  return (
    <ListItem disablePadding={true} className={className}>
      <Tooltip title={description} placement="right">
        <ListItemButton disabled={!canPurchase} className={className}>
          <Grid container direction="column" className={className}>
            <Grid item xs={12} className={className}>
              {purchaseText} [{beersPerSecond} beers / second]
            </Grid>
            <Grid item xs={12} className={className}>
              Cost: {displayedCost} beers
            </Grid>
            <Grid item xs={12} className={className}>
              Owned: {owned}
            </Grid>
          </Grid>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

export default BuildingView;
