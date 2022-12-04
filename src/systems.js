import toast from "react-hot-toast";
import { Icon, Segment, Header } from "semantic-ui-react";
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

const showBeerClickNumber = (entities, { input }) => {
  if (beerWasClicked(input)) {
    var element =
      document.getElementsByTagName("template")[0].firstElementChild;
    var clone = element.cloneNode(true);
    var beersPerClick = entities.beersPerClick.value;
    clone.textContent = `+ ${beersPerClick}`;
    const { payload } = input.find((x) => x.name === "onMouseDown");
    clone.style.position = "absolute";
    clone.style.color = "#f2f2f2";
    clone.style.fontWeight = "800";
    clone.style.fontSize = "20px";
    clone.style.textShadow = "1px 1px 2px black";
    clone.style.left = `${payload.clientX}px`;
    clone.style.top = `${payload.clientY - 25}px`;
    clone.className = "visible";
    document.body.appendChild(clone);
    setTimeout(() => {
      clone.className = "hidden";
      clone.style.top = `${payload.clientY - 50}px`;
    }, 1);
    setTimeout(() => {
      clone.remove();
    }, 2000);
    const beerClickSound = new Audio("./click.wav");
    beerClickSound.addEventListener("canplaythrough", (event) => {
      beerClickSound.play();
    });
  }
  return { ...entities };
};

const updateAchievements = (entities) => {
  var achievements = entities.achievements;
  for (var index in achievements) {
    if (
      !entities.achievements[index].earned &&
      eval(achievements[index].calculation)
    ) {
      toast.custom(
        <Segment>
          <Header as="h3">
            <Icon name={achievements[index].iconName} />
            {achievements[index].name}
          </Header>
          <em>"{achievements[index].hint}"</em>
        </Segment>
      );
      entities.achievements[index].earned = true;
      const achievementSound = new Audio("./achievement.wav");
      achievementSound.addEventListener("canplaythrough", (event) => {
        /* the audio is now playable; play it if permissions allow */
        achievementSound.play();
      });
    }
  }
  return { ...entities };
};

const updateTotalBuildings = (entities) => {
  var buildings = entities.buildings;
  var totalBuildings = 0;
  for (const [buildingID, buildingObj] of Object.entries(buildings)) {
    if (buildingID !== "renderer") {
      totalBuildings += buildingObj.owned;
    }
  }
  return { ...entities, totalBuildings: { value: totalBuildings } };
};

const updateTotalBeers = (entities, { input }) => {
  const beerClicker = entities.beerClicker;
  var beersGained = 0;
  var totalBeers = beerClicker.totalBeers;
  for (const [buildingID, buildingObj] of Object.entries(entities.buildings)) {
    var fps = entities.fps.value;
    if (buildingID !== "renderer") {
        beersGained += calculateBuildingProfit(buildingObj, fps);
    }
  }
  if (beerWasClicked(input)) {
    beersGained += entities.beersPerClick.value;
  }
  totalBeers += beersGained;
  var lifetimeBeers = beerClicker.lifetimeBeers + beersGained;
  return {
    ...entities,
    beerClicker: {
      ...entities.beerClicker,
      totalBeers: totalBeers,
      lifetimeBeers: lifetimeBeers,
    },
  };
};

function calculateBuildingProfit(building, fps) {
  var perSecondProfit = building.owned * building.beersPerSecond;
  var perFrameProfit = perSecondProfit / fps;
  return perFrameProfit;
}

const updateTotalBeersPerSecond = (entities) => {
  const buildings = entities.buildings;
  var totalBeersPerSecond = 0;
  for (const [buildingID, buildingObj] of Object.entries(buildings)) {
    if (buildingID !== "renderer") {
      totalBeersPerSecond +=
        buildingObj.owned * buildingObj.beersPerSecond;
    }
  }
  return {
    ...entities,
    beerClicker: {
      ...entities.beerClicker,
      totalBeersPerSecond: totalBeersPerSecond,
    },
  };
};

const beerWasClicked = (input) => {
  const { payload } = input.find((x) => x.name === "onMouseDown") || {};
  return (
    payload?.target.nearestViewportElement?.className.baseVal ===
      "beerClicker" || payload?.target.className.baseVal === "beerClicker"
  );
};

const getFps = (entities) => {
  const lastFrameTime = entities.lastFrameTime;
  var thisFrameTime = performance.now();
  var delta = thisFrameTime - lastFrameTime.value; //time passed in milliseconds
  var deltaInSeconds = delta / 1000; //time passed in seconds
  var fps = 1 / deltaInSeconds; // frames / second
  return {
    ...entities,
    fps: { value: fps },
    lastFrameTime: { value: thisFrameTime },
  };
};

const updateCanPurchase = (entities) => {
  var buildings = entities.buildings;
  var wallet = entities.beerClicker.totalBeers;
  var newBuildings = {};
  for (const [buildingID, buildingObj] of Object.entries(buildings)) {
    if (buildingID !== "renderer") {
      var cost = buildingObj.cost;
      if (canPurchase(wallet, cost)) {
        buildingObj.canPurchase = true;
        newBuildings[buildingID] = buildingObj;
      } else {
        buildingObj.canPurchase = false;
        newBuildings[buildingID] = buildingObj;
      }
    }
  }
  const buildingsObj = JSON.parse(JSON.stringify(newBuildings));
  return { ...entities, buildings: {...buildingsObj, renderer: buildings.renderer} };
};

function canPurchase(wallet, cost) {
  return wallet >= cost;
}

const purchaseBuilding = (entities, { input }) => {
  var wallet = entities.beerClicker.totalBeers;
  const { payload } = input.find((x) => x.name === "onMouseDown") || {};
  if (payload) {
    for (var pathItem in payload?.nativeEvent?.path) {
      for (const [buildingID, buildingObj] of Object.entries(entities.buildings)) {
        try {
          var isFound =
            payload.nativeEvent.path[pathItem]?.className?.search(buildingID);
          if (isFound && isFound !== -1) {
            var cost = buildingObj.cost;
            if (canPurchase(wallet, cost)) {
              wallet = spend(wallet, cost);
              buildingObj.owned += 1;
              buildingObj.cost = calculateNextCost(
                buildingObj.baseCost,
                buildingObj.growthRate,
                buildingObj.owned
              );
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
  return {
    ...entities,
    beerClicker: { ...entities.beerClicker, totalBeers: wallet },
  };
};

function calculateNextCost(baseCost, growthRate, owned) {
  var nextCost = baseCost * Math.pow(growthRate, owned);
  return nextCost;
}

function spend(wallet, amountToSpend) {
  return wallet - amountToSpend;
}

export {
  getFps,
  updateCanPurchase,
  updateTotalBeers,
  updateTotalBeersPerSecond,
  purchaseBuilding,
  updateTotalBuildings,
  updateAchievements,
  showBeerClickNumber,
};
