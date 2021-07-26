import React from "react";
import { ReactComponent as SVG } from "../beer.svg";
import { Grid } from "semantic-ui-react";
import "./BeerClicker.css";
import { prettyPrintNumber } from "../helpers/prettyPrintNumber";

class BeerClicker extends React.PureComponent {
    totalBeers(){
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
        return <Grid.Column width={8} className="container">
                <SVG className="beerClicker"/>
                <p>Total Beers: {this.totalBeers()}</p>
                <p>Beers Per Second: {this.totalBeersPerSecond()}</p>
            </Grid.Column>
    }
}

export { BeerClicker };