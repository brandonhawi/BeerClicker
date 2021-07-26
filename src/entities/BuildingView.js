import React from 'react';
import { Grid, Menu, Popup } from 'semantic-ui-react';
import { prettyPrintNumber } from '../helpers/prettyPrintNumber';
import "./Building.css";

class BuildingView extends React.PureComponent {
    owned() {
        return prettyPrintNumber(this.props.owned);
    }

    cost() {
        var cost = this.props.cost;
        cost = Math.ceil(cost);
        return prettyPrintNumber(cost);
    }

    render() {
        return (this.props.canPurchase ?
            <Popup
                trigger={
                    <Menu.Item as="a" className={this.props.className}>
                        <Grid.Row>
                            <Grid.Column>
                                {this.props.purchaseText} [{this.props.beersPerSecond} beers / second]
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="owned">
                            <Grid.Column>
                                Owned: {this.owned()}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="cost">
                            <Grid.Column>
                                Cost: {this.cost()}
                            </Grid.Column>
                        </Grid.Row>
                    </Menu.Item>
                }
                content={this.props.description}
                position="right center"
            />
            :
            <Popup
                trigger={
                    <Menu.Item as="a" className={this.props.className} disabled>
                        <Grid.Row>
                            <Grid.Column>
                                {this.props.purchaseText} [{this.props.beersPerSecond} beers / second]
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="owned">
                            <Grid.Column>
                                Owned: {this.owned()}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="cost">
                            <Grid.Column>
                                Cost: {this.cost()}
                            </Grid.Column>
                        </Grid.Row>
                    </Menu.Item>
                }
                content={this.props.description}
                position="right center"
            />

        );
    }

}

export { BuildingView };