import toast from "react-hot-toast";
import { BaseSyntheticEvent } from "react";
import { Achievement } from "./types/achievement";
import AchievementView from "./viewComponents/Achievement";
import { Building } from "./types/building";

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
  const achievements = Object.entries<Achievement>(entities.achievements)
    .filter(([id]) => id !== "renderer")
    .map(([, obj]) => obj);
  for (const achievementObj of achievements) {
    if (!achievementObj.earned && eval(achievementObj.calculation)) {
      toast.custom(<AchievementView {...achievementObj} />);
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
  const buildings = Object.entries<Building>(entities.buildings)
    .filter(([id]) => id !== "renderer")
    .map(([, obj]) => obj);
  let totalBuildings = 0;
  for (const buildingObj of buildings) {
    totalBuildings += buildingObj.owned;
  }
  return { ...entities, totalBuildings: { value: totalBuildings } };
}

export function updateTotalBeers(entities: any, { input }: { input: any }) {
  const beerClicker = entities.beerClicker;
  let beersGained = 0;
  let totalBeers = beerClicker.totalBeers;
  const buildings = Object.entries<Building>(entities.buildings)
    .filter(([id]) => id !== "renderer")
    .map(([, obj]) => obj);
  for (const buildingObj of buildings) {
    const fps = entities.fps.value;
    beersGained += calculateBuildingProfit(buildingObj, fps);
  }
  if (beerWasClicked(input)) {
    beersGained += entities.beersPerClick.value;
  }
  totalBeers += beersGained;
  const lifetimeBeers = beerClicker.lifetimeBeers + beersGained;
  return {
    ...entities,
    beerClicker: {
      ...entities.beerClicker,
      totalBeers: totalBeers,
      lifetimeBeers: lifetimeBeers,
    },
  };
}

function calculateBuildingProfit(building: any, fps: number) {
  const perSecondProfit = building.owned * building.beersPerSecond;
  const perFrameProfit = perSecondProfit / fps;
  return perFrameProfit;
}

export function updateTotalBeersPerSecond(entities: any) {
  let totalBeersPerSecond = 0;
  const buildings = Object.entries<Building>(entities.buildings)
    .filter(([id]) => id !== "renderer")
    .map(([, obj]) => obj);
  for (const buildingObj of buildings) {
    totalBeersPerSecond += buildingObj.owned * buildingObj.beersPerSecond;
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
  const thisFrameTime = performance.now();
  const delta = thisFrameTime - lastFrameTime.value; //time passed in milliseconds
  const deltaInSeconds = delta / 1000; //time passed in seconds
  const fps = 1 / deltaInSeconds; // frames / second
  return {
    ...entities,
    fps: { value: fps },
    lastFrameTime: { value: thisFrameTime },
  };
}

export function updateCanPurchase(entities: any) {
  const buildings = entities.buildings;
  const wallet = entities.beerClicker.totalBeers;
  const newBuildings: any = {};
  for (const [buildingID, buildingObj] of Object.entries<any>(buildings).filter(
    ([id]) => id !== "renderer"
  )) {
    const cost = buildingObj.cost;
    if (canPurchase(wallet, cost)) {
      buildingObj.canPurchase = true;
      newBuildings[buildingID] = buildingObj;
    } else {
      buildingObj.canPurchase = false;
      newBuildings[buildingID] = buildingObj;
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
  let wallet = entities.beerClicker.totalBeers;
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
        const cost = buildingObj.cost;
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
  const nextCost = baseCost * Math.pow(growthRate, owned);
  return nextCost;
}

function spend(wallet: number, amountToSpend: number) {
  return wallet - amountToSpend;
}
