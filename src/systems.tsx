import { Badge, Paper, Typography } from "@mui/material";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import toast from "react-hot-toast";

export function showBeerClickNumber(entities: any, { input }: { input: any }) {
  if (beerWasClicked(input)) {
    var element = (
      document.getElementsByTagName("template")[0] as HTMLTemplateElement
    ).firstElementChild! as HTMLSpanElement;
    var clone = element.cloneNode(true) as HTMLSpanElement;
    var beersPerClick = entities.beersPerClick.value;
    clone.textContent = `+ ${beersPerClick}`;
    const { payload } = input.find((x: any) => x.name === "onMouseDown");
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
}

export function updateAchievements(entities: any) {
  var achievements = entities.achievements;
  for (var index in achievements) {
    if (
      !entities.achievements[index].earned &&
      eval(achievements[index].calculation)
    ) {
      const achievement = (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h5">
            <Badge color="secondary">
              <SportsBarIcon color="primary" fontSize="large" />
            </Badge>
            {achievements[index].name}
          </Typography>
          <Typography component="em">"{achievements[index].hint}"</Typography>
        </Paper>
      );
      toast.custom(achievement);
      entities.achievements[index].earned = true;
      const achievementSound = new Audio("./achievement.wav");
      achievementSound.addEventListener("canplaythrough", (event) => {
        /* the audio is now playable; play it if permissions allow */
        achievementSound.play();
      });
    }
  }
  return { ...entities };
}

export function updateTotalBuildings(entities: any) {
  var buildings = entities.buildings;
  var totalBuildings = 0;
  for (const [buildingID, buildingObj] of Object.entries<any>(buildings)) {
    if (buildingID !== "renderer") {
      totalBuildings += buildingObj.owned;
    }
  }
  return { ...entities, totalBuildings: { value: totalBuildings } };
}

export function updateTotalBeers(entities: any, { input }: { input: any }) {
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
}

export function calculateBuildingProfit(building: any, fps: number) {
  var perSecondProfit = building.owned * building.beersPerSecond;
  var perFrameProfit = perSecondProfit / fps;
  return perFrameProfit;
}

export function updateTotalBeersPerSecond(entities: any) {
  const buildings = entities.buildings;
  var totalBeersPerSecond = 0;
  for (const [buildingID, buildingObj] of Object.entries<any>(buildings)) {
    if (buildingID !== "renderer") {
      totalBeersPerSecond += buildingObj.owned * buildingObj.beersPerSecond;
    }
  }
  return {
    ...entities,
    beerClicker: {
      ...entities.beerClicker,
      totalBeersPerSecond: totalBeersPerSecond,
    },
  };
}

export function beerWasClicked(input: any) {
  const { payload } = input.find((x: any) => x.name === "onMouseDown") || {};
  return (
    payload?.target.nearestViewportElement?.className.baseVal ===
      "beerClicker" || payload?.target.className.baseVal === "beerClicker"
  );
}

export function getFps(entities: any) {
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
}

export function updateCanPurchase(entities: any) {
  var buildings = entities.buildings;
  var wallet = entities.beerClicker.totalBeers;
  var newBuildings: any = {};
  for (const [buildingID, buildingObj] of Object.entries<any>(buildings)) {
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
  return {
    ...entities,
    buildings: { ...buildingsObj, renderer: buildings.renderer },
  };
}

function canPurchase(wallet: number, cost: number) {
  return wallet >= cost;
}

export function purchaseBuilding(entities: any, { input }: { input: any }) {
  var wallet = entities.beerClicker.totalBeers;
  const { payload } = input.find((x: any) => x.name === "onMouseDown") || {};
  if (payload) {
    for (var pathItem in payload?.nativeEvent?.path) {
      for (const [buildingID, buildingObj] of Object.entries<any>(
        entities.buildings
      )) {
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
}

function calculateNextCost(
  baseCost: number,
  growthRate: number,
  owned: number
) {
  var nextCost = baseCost * Math.pow(growthRate, owned);
  return nextCost;
}

function spend(wallet: number, amountToSpend: number) {
  return wallet - amountToSpend;
}
