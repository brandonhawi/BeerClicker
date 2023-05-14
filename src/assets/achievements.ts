import { Achievement } from "../types/achievement";

const achievementData: Map<string, Achievement> = new Map([
  [
    "totalBuilding1",
    {
      name: "Beerenomics",
      earned: false,
      description: "Purchase your first building.",
      hint: "Beer makes the world go round.",
      calculation: "entities.totalBuildings.value >= 1",
      iconName: "chart line",
    },
  ],
  [
    "totalBuilding2",
    {
      name: "Beerenomics II",
      earned: false,
      description: "Purchase your 10th building.",
      hint: "Wealth is in the mind not the pocket.... but what about beer?",
      calculation: "entities.totalBuildings.value >= 10",
      iconName: "chart line",
    },
  ],
  [
    "totalBeers1",
    {
      name: "Brewmatics",
      earned: false,
      description: "Acquire 1,000 lifetime beers.",
      hint: "According to my calculations... we have a lot of beer",
      calculation: "entities.beerClicker.lifetimeBeers >= 1000",
      iconName: "plus icon",
    },
  ],
  [
    "homeBrewKit1",
    {
      name: "Party Trick",
      earned: false,
      description: "Purchase your first Home Brew Kit.",
      hint: "Give a man a beer, he'll waste an hour. Teach him to home brew, he'll waste a lifetime.",
      calculation:
        'entities.buildings.buildings.buildingData.get("brewKit").owned >= 1',
      iconName: "clock outline",
    },
  ],
  [
    "fellowSapper1",
    {
      name: "Pyramid Scheme",
      earned: false,
      description: "Hire your first Fellow Sapper.",
      hint: "Hi, my name's Chad",
      calculation:
        'entities.buildings.buildings.buildingData.get("fellowSapper").owned >= 1',
      iconName: "caret square up",
    },
  ],
  [
    "beerTree1",
    {
      name: "Rain Dance",
      earned: false,
      description: "Plant your first Beer Tree.",
      hint: "Sowing the seeds of a cool Natural Light.",
      calculation:
        'entities.buildings.buildings.buildingData.get("beerTree").owned >= 1',
      iconName: "tree",
    },
  ],
]);

export default achievementData;
