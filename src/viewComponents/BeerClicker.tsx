import { ReactComponent as SVG } from "../beer.svg";
import { Grid, GridRow, Statistic, StatisticGroup } from "semantic-ui-react";
import "./BeerClicker.css";
import { prettyPrintNumber } from "../helpers/prettyPrintNumber";

type Props = {
  totalBeers?: number;
  totalBeersPerSecond?: number;
}

const BeerClicker = ({totalBeers, totalBeersPerSecond}: Props) => {
  const displayedBeers = prettyPrintNumber(Math.floor(totalBeers!));
  const displayedBPS = prettyPrintNumber(Math.round(totalBeersPerSecond! * 10) / 10);

  return (
    <Grid.Column width={8}>
      <GridRow style={{ height: "80%" }}>
        <SVG
          className="beerClicker"
          viewBox="0 0 120 120"
          width="100%"
          height="100%"
        />
      </GridRow>
      <GridRow style={{ height: "20%" }}>
        <StatisticGroup size="mini" widths="two">
          <Statistic>
            <Statistic.Label>Beers</Statistic.Label>
            <Statistic.Value>{displayedBeers}</Statistic.Value>
          </Statistic>
          <Statistic>
            <Statistic.Label>Beers Per Second</Statistic.Label>
            <Statistic.Value>{displayedBPS}</Statistic.Value>
          </Statistic>
        </StatisticGroup>
      </GridRow>
    </Grid.Column>
  );
};

export default BeerClicker;
