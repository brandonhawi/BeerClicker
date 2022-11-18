import buildingsJSON from "./assets/buildings.json";
import toast from 'react-hot-toast';
import { Icon, Segment, Header } from 'semantic-ui-react';
// const MoveBox = (entities, { input }) => {
//     //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
//     //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
//     //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
//     //-- That said, it's probably worth considering performance implications in either case.

//     const { payload } = input.find(x => x.name === "onMouseDown") || {};

//     if (payload) {
//         const box1 = entities["box1"];

//         box1.x = payload.pageX;
//         box1.y = payload.pageY;
//     }

//     return entities;
// };

const updateAchievements = (entities) => {
    // entities.counter.value += 1;
    // if (Math.floor(entities.counter.value / entities.fps.value) == 10) {
    //     toast('Test Toast');
    //     entities.counter.value = 0;
    // }
    var achievements = entities.achievements;
    for (var index in achievements) {
        //console.log(eval(achievements[index].calculation));
        //console.log(entities.achievements);
        //console.log(entities.totalBuildings);
        if (!entities.achievements[index].earned && eval(achievements[index].calculation)) {
            toast.custom(
                <Segment>
                    <Header as="h3">
                        <Icon name={achievements[index].iconName}/>
                        {achievements[index].name}
                    </Header>
                    <em>"{achievements[index].hint}"</em>
                </Segment>
            );
            //toast(`${achievements[index].name}: ${achievements[index].hint}`);
            entities.achievements[index].earned = true;
        }
    }
    return { ...entities };
};

const updateTotalBuildings = (entities) => {
    var buildings = entities.buildings;
    var totalBuildings = 0;
    for (var index in buildings) {
        if (index !== "renderer") {
            totalBuildings += buildings[index].owned;
        }
    }
    return { ...entities, totalBuildings: { value: totalBuildings } };
};

const updateTotalBeers = (entities, { input }) => {
    const beerClicker = entities.beerClicker;
    var totalBeers = beerClicker.totalBeers;
    var buildings = buildingsJSON["buildings"];
    for (var index in buildings) {
        var buildingID = buildings[index].buildingID;
        var building = entities.buildings[buildingID];
        var fps = entities.fps.value;
        totalBeers = calculateBuildingProfit(building, totalBeers, fps);
    }
    if (beerWasClicked(input)) {
        totalBeers += 1;
    }
    return { ...entities, beerClicker: { ...entities.beerClicker, totalBeers: totalBeers } };
};

function calculateBuildingProfit(building, totalBeers, fps) {
    var perSecondProfit = building.owned * building.beersPerSecond;
    var perFrameProfit = perSecondProfit / fps;
    return totalBeers + perFrameProfit;
}

const updateTotalBeersPerSecond = (entities) => {
    const buildings = entities.buildings;
    var totalBeersPerSecond = 0;
    for (var building in buildings) {
        if (building !== "renderer") {
            totalBeersPerSecond += (buildings[building].owned * buildings[building].beersPerSecond);
        }
    }
    return { ...entities, beerClicker: { ...entities.beerClicker, totalBeersPerSecond: totalBeersPerSecond } };
};

const beerWasClicked = (input) => {
    const { payload } = input.find(x => x.name === "onMouseDown") || {};
    return payload?.target.nearestViewportElement?.className.baseVal === 'beerClicker' ||
        payload?.target.className.baseVal === 'beerClicker';
};

const getFps = (entities) => {
    const lastFrameTime = entities.lastFrameTime;
    var thisFrameTime = performance.now();
    var delta = (thisFrameTime - lastFrameTime.value); //time passed in milliseconds
    var deltaInSeconds = delta / 1000; //time passed in seconds 
    var fps = 1 / deltaInSeconds; // frames / second
    return { ...entities, fps: { value: fps }, lastFrameTime: { value: thisFrameTime } };
};

const updateCanPurchase = (entities) => {
    var buildings = { ...entities.buildings };
    var wallet = entities.beerClicker.totalBeers;
    var newBuildings = { ...buildings };
    for (const building in buildings) {
        var buildingObj = { ...buildings[building] };
        if (building !== "renderer") {
            var cost = buildingObj.cost;
            if (canPurchase(wallet, cost)) {
                buildingObj.canPurchase = true;
                newBuildings[building] = buildingObj;
            }
            else {
                buildingObj.canPurchase = false;
                newBuildings[building] = buildingObj;
            }
        }
    }
    return { ...entities, buildings: newBuildings };
};

function canPurchase(wallet, cost) {
    return wallet >= cost;
}

const purchaseBuilding = (entities, { input }) => {
    var wallet = entities.beerClicker.totalBeers;
    const { payload } = input.find(x => x.name === "onMouseDown") || {};
    if (payload) {
        for (var pathItem in payload?.nativeEvent?.path) {
            var buildings = buildingsJSON["buildings"];
            for (var index in buildings) {
                try {
                    var buildingID = buildings[index].buildingID;
                    var isFound = payload.nativeEvent.path[pathItem]?.className?.search(buildingID);
                    if (isFound && isFound !== -1) {
                        var cost = entities.buildings[buildingID].cost;
                        if (canPurchase(wallet, cost)) {
                            var baseCost = entities.buildings[buildingID].baseCost;
                            wallet = spend(wallet, cost);
                            entities.buildings[buildingID].owned += 1;
                            var owned = entities.buildings[buildingID].owned;
                            var growthRate = entities.buildings[buildingID].growthRate;
                            entities.buildings[buildingID].cost = calculateNextCost(baseCost, growthRate, owned);
                        }
                    }
                }
                catch { }
            }
        }
    }
    return { ...entities, beerClicker: { ...entities.beerClicker, totalBeers: wallet } };
}

function calculateNextCost(baseCost, growthRate, owned) {
    var nextCost = baseCost * Math.pow(growthRate, owned);
    return nextCost;
}

function spend(wallet, amountToSpend) {
    return wallet - amountToSpend;
}

export {
    getFps, updateCanPurchase, updateTotalBeers,
    updateTotalBeersPerSecond, purchaseBuilding,
    updateTotalBuildings, updateAchievements
};
