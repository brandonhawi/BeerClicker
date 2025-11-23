import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import prettyPrintNumber from "../helpers/prettyPrintNumber";
import { useMemo } from "react";
import { useGameStore } from "../store/gameStore";

type Props = {
  id: string;
  name: string;
  canPurchase: boolean;
  purchaseText: string;
  beersPerSecond: number;
  owned: number;
  cost: number;
  description: string;
};

const BuildingView = ({
  id,
  canPurchase,
  purchaseText,
  beersPerSecond,
  owned,
  cost,
  description,
}: Props) => {
  const purchaseBuilding = useGameStore((state) => state.purchaseBuilding);

  const displayedCost = useMemo(() => {
    return prettyPrintNumber(Math.ceil(cost));
  }, [cost]);

  const handleClick = () => {
    if (canPurchase) {
      purchaseBuilding(id);
    }
  };

  return (
    <ListItem disablePadding={true} className={id}>
      <Tooltip title={description} placement="right">
        <ListItemButton
          disabled={!canPurchase}
          className={id}
          onClick={handleClick}
        >
          <Grid container direction="column" className={id}>
            <Grid size={12} className={id}>
              {purchaseText} [{beersPerSecond} beers / second]
            </Grid>
            <Grid size={12} className={id}>
              Cost: {displayedCost} beers
            </Grid>
            <Grid size={12} className={id}>
              Owned: {owned}
            </Grid>
          </Grid>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

export default BuildingView;
