import React from "react";
import { ReactComponent as SVG } from "../beer.svg";
import { Container, Grid, GridColumn, GridRow } from "semantic-ui-react";
import "./BeerClicker.css";
import { prettyPrintNumber } from "../helpers/prettyPrintNumber";

class BeerClicker extends React.PureComponent {
    totalBeers() {
        var beers = this.props.totalBeers;
        beers = Math.floor(beers);
        return prettyPrintNumber(beers);
    }

    totalBeersPerSecond() {
        var bps = this.props.totalBeersPerSecond;
        bps = Math.round(bps * 10) / 10;
        return prettyPrintNumber(bps);
    }

    render() {
        return <Grid.Column width={8}>
            <GridRow style={{height: "80%"}}>
                <SVG className="beerClicker" viewBox="0 0 120 120" width="100%" height="100%"/>
            </GridRow>
            <GridRow style={{height: "20%"}}> 
                <p>Total Beers: {this.totalBeers()}</p>
                <p>Beers Per Second: {this.totalBeersPerSecond()}</p>
            </GridRow>
        </Grid.Column>
    }
}

export { BeerClicker };