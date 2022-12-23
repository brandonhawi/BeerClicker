import { ReactComponent as SVG } from "../beer.svg";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import "./BeerClicker.css";
import prettyPrintNumber from "../helpers/prettyPrintNumber";

type Props = {
  totalBeers?: number;
  totalBeersPerSecond?: number;
};

const BeerClicker = ({
  totalBeers,
  totalBeersPerSecond,
}: Props): JSX.Element => {
  const displayedBeers = prettyPrintNumber(Math.floor(totalBeers!));
  const displayedBPS = prettyPrintNumber(
    Math.round(totalBeersPerSecond! * 10) / 10
  );

  return (
    <Grid container justifyContent={"space-around"}>
      <Grid container justifyContent="center" sx={{ height: "80%" }}>
        <SVG
          className="beerClicker"
          viewBox="-20 -20 160 160"
          width="320px"
          height="320px"
        />
      </Grid>
      <Grid item>
        <Stack spacing={2}>
          <Chip label="Beers" />
          <Chip label={displayedBeers} />
        </Stack>
      </Grid>
      <Grid item>
        <Stack spacing={2}>
          <Chip label="Beers Per Second" />
          <Chip label={displayedBPS} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BeerClicker;
