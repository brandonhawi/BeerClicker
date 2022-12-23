import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import prettyPrintNumber from "../helpers/prettyPrintNumber";

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
  const displayedCost = () => {
    cost = Math.ceil(cost);
    return prettyPrintNumber(cost);
  };
  return (
    <ListItem disablePadding={true}>
      <Tooltip title={description} placement="right">
        <ListItemButton disabled={!canPurchase} className={className}>
          <Grid container direction="column">
            <Grid item xs={12}>
              {purchaseText} [{beersPerSecond} beers / second]
            </Grid>
            <Grid item xs={12}>
              Cost: {displayedCost()}
            </Grid>
            <Grid item xs={12}>
              Owned: {owned}
            </Grid>
          </Grid>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

export default BuildingView;
