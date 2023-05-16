import toast from "react-hot-toast";
import { MouseEvent } from "react";
import AchievementView from "./viewComponents/Achievement";
import { Building } from "./types/building";
import { entities } from "./types/entities";
import { input } from "./types/input";
import { researchBuilding } from "./types/research";

export function updateTotalHops(entities: entities) {
  const research = entities.research.research;
  let hopsGained = 0;
  research.researchBuildings.forEach((researchBuilding) => {
    hopsGained += calculatePerFrameResearchProfit(
      researchBuilding,
      entities.fps.value
    );
  });
  research.lifetimeHops += hopsGained;
  research.totalHops += hopsGained;
  return { ...entities };
}

export function updateCanPurchaseResearchBuilding(entities: entities) {
  const researchBuildings = entities.research.research.researchBuildings;
  researchBuildings.forEach((researchBuilding) => {
    if (
      !researchBuilding.canPurchase &&
      researchBuilding.calculateCanPurchase(entities)
    ) {
      researchBuilding.canPurchase = true;
    }
  });
  return { ...entities };
}

export function showBeerClickNumber(
  entities: entities,
  { input }: { input: input[] }
) {
  if (beerWasClicked(input)) {
    const element = document.getElementById("beerClickNumber")!;
    const clone = element.cloneNode(true) as HTMLSpanElement;
    const beersPerClick = entities.beersPerClick.value;
    clone.textContent = `+ ${beersPerClick}`;
    const inputPayload = input.find((x) => x.name === "onMouseDown")!;
    const payload = inputPayload.payload as MouseEvent;
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

export function updateAchievements(entities: entities) {
  const achievementData = entities.achievements.achievements.achievementData;
  achievementData.forEach(
    ({ earned, calculateEarned, name, hint }, achievementId) => {
      if (!earned && calculateEarned(entities)) {
        toast.custom(<AchievementView hint={hint} name={name} />);
        const achievement = achievementData.get(achievementId);
        if (achievement) achievement.earned = true;
        const achievementSound = new Audio("./achievement.wav");
        achievementSound.addEventListener("canplaythrough", (event) => {
          /* the audio is now playable; play it if permissions allow */
          achievementSound.play();
        });
      }
    }
  );
  return { ...entities };
}

export function updateTotalBuildings(entities: entities) {
  let totalBuildings = 0;
  const buildingData = entities.buildings.buildings.buildingData;
  buildingData.forEach((building) => {
    totalBuildings += building.owned;
  });
  return { ...entities, totalBuildings: { value: totalBuildings } };
}

export function updateTotalBeers(
  entities: entities,
  { input }: { input: input[] }
) {
  const beerClicker = entities.beerClicker;
  let beersGained = 0;
  let totalBeers = beerClicker.totalBeers;
  const buildingData = entities.buildings.buildings.buildingData;
  buildingData.forEach((building) => {
    const fps = entities.fps.value;
    beersGained += calculateBuildingProfit(building, fps);
  });
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

function calculateBuildingProfit(building: Building, fps: number) {
  const perSecondProfit = building.owned * building.beersPerSecond;
  const perFrameProfit = perSecondProfit / fps;
  return perFrameProfit;
}

function calculatePerFrameResearchProfit(
  researchBuilding: researchBuilding,
  fps: number
) {
  const perSecondProfit =
    researchBuilding.owned * researchBuilding.hopsPerSecond;
  return perSecondProfit / fps;
}

export function updateTotalBeersPerSecond(entities: entities) {
  let totalBeersPerSecond = 0;
  const buildingData = entities.buildings.buildings.buildingData;
  buildingData.forEach(({ owned, beersPerSecond }) => {
    totalBeersPerSecond += owned * beersPerSecond;
  });
  return {
    ...entities,
    beerClicker: {
      ...entities.beerClicker,
      totalBeersPerSecond: totalBeersPerSecond,
    },
  };
}

export function updateTotalHopsPerSecond(entities: entities) {
  let totalHopsPerSecond = 0;
  const researchBuildings = entities.research.research.researchBuildings;
  researchBuildings.forEach(({ owned, hopsPerSecond }) => {
    totalHopsPerSecond += owned * hopsPerSecond;
  });
  return {
    ...entities,
    research: {
      ...entities.research,
      research: {
        ...entities.research.research,
        totalHopsPerSecond,
      },
    },
  };
}

function beerWasClicked(input: input[]) {
  const { payload } = input.find((x) => x.name === "onMouseDown") || {};
  return (
    payload?.target.nearestViewportElement?.className.baseVal ===
      "beerClicker" || payload?.target.className.baseVal === "beerClicker"
  );
}

export function getFps(entities: entities) {
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

export function updateCanPurchase(entities: entities) {
  const wallet = entities.beerClicker.totalBeers;
  const newBuildings: Map<string, Building> = new Map();
  const buildingData = entities.buildings.buildings.buildingData;
  buildingData.forEach((building, buildingId) => {
    if (canPurchase(wallet, building.cost)) {
      building.canPurchase = true;
      newBuildings.set(buildingId, building);
    } else {
      building.canPurchase = false;
      newBuildings.set(buildingId, building);
    }
  });
  return {
    ...entities,
    buildings: {
      buildings: { buildingData: newBuildings },
      renderer: entities.buildings.renderer,
    },
  };
}

function canPurchase(wallet: number, cost: number) {
  return wallet >= cost;
}

export function purchaseBuilding(
  entities: entities,
  { input }: { input: input[] }
) {
  let wallet = entities.beerClicker.totalBeers;
  const { payload } = input.find((x) => x.name === "onMouseDown") || {};
  if (payload) {
    const buildingData = entities.buildings.buildings.buildingData;
    const newBuildings: Map<string, Building> = new Map();
    buildingData.forEach((building, buildingId) => {
      if (
        payload.target?.classList &&
        Array.from(payload.target.classList).includes(buildingId)
      ) {
        if (canPurchase(wallet, building.cost)) {
          wallet = spend(wallet, building.cost);
          building.owned += 1;
          building.cost = calculateNextCost(
            building.baseCost,
            building.growthRate,
            building.owned
          );
        }
      }
      newBuildings.set(buildingId, building);
    });
    return {
      ...entities,
      buildings: {
        buildings: { buildingData: newBuildings },
        renderer: entities.buildings.renderer,
      },
      beerClicker: { ...entities.beerClicker, totalBeers: wallet },
    };
  }

  return {
    ...entities,
  };
}

export function purchaseResearchBuilding(
  entities: entities,
  { input }: { input: input[] }
) {
  let wallet = entities.beerClicker.totalBeers;
  const { payload } = input.find((x) => x.name === "onMouseDown") || {};
  if (payload) {
    const researchBuildings = entities.research.research.researchBuildings;
    const newBuildings: Map<string, researchBuilding> = new Map();
    researchBuildings.forEach((researchBuilding, researchBuildingId) => {
      if (
        payload.target?.classList &&
        Array.from(payload.target.classList).includes(researchBuildingId)
      ) {
        if (canPurchase(wallet, researchBuilding.cost)) {
          wallet = spend(wallet, researchBuilding.cost);
          researchBuilding.owned += 1;
          researchBuilding.cost = calculateNextCost(
            researchBuilding.baseCost,
            researchBuilding.growthRate,
            researchBuilding.owned
          );
        }
      }
      newBuildings.set(researchBuildingId, researchBuilding);
    });
    return {
      ...entities,
      research: {
        ...entities.research,
        research: {
          ...entities.research.research,
          researchBuildings: newBuildings,
        },
      },
      beerClicker: { ...entities.beerClicker, totalBeers: wallet },
    };
  }

  return {
    ...entities,
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
