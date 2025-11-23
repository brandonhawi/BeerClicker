import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import prettyPrintNumber from "../helpers/prettyPrintNumber";
import { useMemo } from "react";
import { Typography } from "@mui/material";
import { useGameStore } from "../store/gameStore";

type Props = {
  id: string;
  name: string;
  description: string;
  canPurchase: boolean;
  owned: number;
  hopsPerSecond: number;
  cost: number;
  unlockHint: string;
  showUnlockHint: boolean;
};

const ResearchBuildingView = ({
  id,
  name,
  description,
  canPurchase,
  owned,
  hopsPerSecond,
  cost,
  unlockHint,
  showUnlockHint,
}: Props) => {
  const purchaseResearchBuilding = useGameStore((state) => state.purchaseResearchBuilding);

  const displayedCost = useMemo(() => {
    return prettyPrintNumber(Math.ceil(cost));
  }, [cost]);

  const handleClick = () => {
    if (canPurchase) {
      purchaseResearchBuilding(id);
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
              {name} [{hopsPerSecond} hops / second]
            </Grid>
            <Grid size={12} className={id}>
              Cost: {displayedCost} hops
            </Grid>
            <Grid size={12} className={id}>
              Owned: {owned}
            </Grid>
            {showUnlockHint && (
              <Grid size={12} className={id}>
                <Typography variant="subtitle2" textAlign="center">
                  {unlockHint}
                </Typography>
              </Grid>
            )}
          </Grid>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
};

export default ResearchBuildingView;
