import { Badge, Paper, Typography } from "@mui/material";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import toast from "react-hot-toast";
import { BaseSyntheticEvent } from "react";
import { Achievement } from "./types/achievement";

export function showBeerClickNumber(entities: any, { input }: { input: any }) {
  if (beerWasClicked(input)) {
    const element: HTMLSpanElement =
      document.getElementById("beerClickNumber")!;
    const clone = element.cloneNode(true) as HTMLSpanElement;
    const beersPerClick = entities.beersPerClick.value;
    clone.textContent = `+ ${beersPerClick}`;
    const { payload } = input.find((x: any) => x.name === "onMouseDown");
    clone.style.left = `${payload.clientX}px`;
    clone.style.top = `${payload.clientY - 25}px`;
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
  const achievements = entities.achievements;
  for (const achievementObj of Object.values<Achievement>(achievements)) {
    if (!achievementObj.earned && eval(achievementObj.calculation)) {
      const achievement = (
        <Paper variant="outlined" sx={{ p: 2, userSelect: "none" }}>
          <Typography variant="h5">
            <Badge color="secondary">
              <SportsBarIcon color="primary" fontSize="large" />
            </Badge>
            {achievementObj.name}
          </Typography>
          <Typography component="em">"{achievementObj.hint}"</Typography>
        </Paper>
      );
      toast.custom(achievement);
      achievementObj.earned = true;
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

function beerWasClicked(input: any) {
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
  const { payload }: { payload: BaseSyntheticEvent } =
    input.find((x: any) => x.name === "onMouseDown") || {};
  if (payload) {
    for (const [buildingID, buildingObj] of Object.entries<any>(
      entities.buildings
    )) {
      if (
        payload.target?.classList &&
        Array.from(payload.target.classList).includes(buildingID)
      ) {
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
