import React from "react";
import { ReactComponent as SVG } from "../beer.svg";
import { Grid } from "semantic-ui-react";
import "./BeerClicker.css";

class BeerClicker extends React.PureComponent {
    render() {
        return <Grid.Column width={8} className="container">
                <SVG className="beerClicker"/>
                <p>Total Beers: {Math.floor(this.props.totalBeers)}</p>
                <p>Beers Per Second: {Math.round(this.props.totalBeersPerSecond * 10) / 10}</p>
            </Grid.Column>
    }
}

export { BeerClicker };