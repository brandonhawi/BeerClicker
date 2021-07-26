import React from 'react';
import { Grid, Menu, Popup } from 'semantic-ui-react';
import "./Building.css";

class BuildingView extends React.PureComponent {
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
                                Owned: {this.props.owned}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="cost">
                            <Grid.Column>
                                Cost: {Math.ceil(this.props.cost)}
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
                                Owned: {this.props.owned}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className="cost">
                            <Grid.Column>
                                Cost: {Math.ceil(this.props.cost)}
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