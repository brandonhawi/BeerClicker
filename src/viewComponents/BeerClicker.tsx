import type { ReactElement } from "react";

import SVG from "../beer.svg";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import "./BeerClicker.css";
import prettyPrintNumber from "../helpers/prettyPrintNumber";
import { useBeers, useBeersPerSecond } from "../store/selectors";
import { useGameStore } from "../store/gameStore";

const BeerClicker = (): ReactElement => {
  const totalBeers = useBeers();
  const totalBeersPerSecond = useBeersPerSecond();
  const clickBeer = useGameStore((state) => state.clickBeer);

  const displayedBeers = prettyPrintNumber(Math.floor(totalBeers));
  const displayedBPS = prettyPrintNumber(
    Math.round(totalBeersPerSecond * 10) / 10
  );

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    clickBeer(e.clientX, e.clientY);
  };

  return (
    <Grid container justifyContent={"space-around"}>
      <Grid container justifyContent="center" sx={{ height: "80%" }}>
        <SVG
          className="beerClicker"
          viewBox="-20 -20 160 160"
          width="320px"
          height="320px"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
      </Grid>
      <Grid>
        <Stack spacing={2}>
          <Chip label="Beers" />
          <Chip label={displayedBeers} />
        </Stack>
      </Grid>
      <Grid>
        <Stack spacing={2}>
          <Chip label="Beers Per Second" />
          <Chip label={displayedBPS} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BeerClicker;
