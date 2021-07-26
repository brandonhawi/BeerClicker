import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import { BuildingView } from './BuildingView';
import buildingsJSON from "../assets/buildings.json";

class Buildings extends React.PureComponent {
    generateAllBuildingRenders() {
        var buildings = buildingsJSON["buildings"];
        var totalRender = [];
        for (var index in buildings) {
            var buildingID = buildings[index].buildingID;
            var currentBuildingRender =
                <BuildingView
                    key={buildingID}
                    className={buildingID}
                    owned={this.props[buildingID].owned}
                    beersPerSecond={this.props[buildingID].beersPerSecond}
                    cost={this.props[buildingID].cost}
                    canPurchase={this.props[buildingID].canPurchase}
                    purchaseText={this.props[buildingID].purchaseText}
                    description={this.props[buildingID].description}
                />
            totalRender.push(currentBuildingRender);
        }
        return totalRender;

    }

    render() {
        var allBuildingsRender = this.generateAllBuildingRenders();
        return (
            <Grid.Column width={4}>
                <Menu className="ui left vertical menu grid container">
                    {allBuildingsRender}
                </Menu>
            </Grid.Column>
        );
    }
}

export { Buildings };