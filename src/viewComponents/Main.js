import React from 'react';
import { Grid, Menu } from 'semantic-ui-react'
import { BeerClicker } from './BeerClicker';

class Main extends React.PureComponent {
    render() {
        return <>
            <Grid.Column width={8} className="container">
                <BeerClicker/>
                <p>Total Beers: {Math.round(this.props.totalBeers)}</p>
                <p>Beers Per Second: {this.props.totalBeersPerSecond}</p>
            </Grid.Column>
            <Grid.Column width={4} className="container">
                <Menu vertical className="ui grid left">
                    <Menu.Item
                        name="Research"
                        as="a" />
                </Menu>
            </Grid.Column>
        </>;
    }
}

export { Main };
