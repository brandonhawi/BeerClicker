import { Achievement } from "../types/achievement";
import { entities } from "../types/entities";

const achievementData: Map<string, Achievement> = new Map([
  [
    "totalBuilding1",
    {
      name: "Beerenomics",
      earned: false,
      description: "Purchase your first building.",
      hint: "Beer makes the world go round.",
      calculateEarned: (entities: entities) =>
        entities.totalBuildings.value >= 1,
    },
  ],
  [
    "totalBuilding2",
    {
      name: "Beerenomics II",
      earned: false,
      description: "Purchase your 10th building.",
      hint: "Wealth is in the mind not the pocket.... but what about beer?",
      calculateEarned: (entities: entities) =>
        entities.totalBuildings.value >= 10,
    },
  ],
  [
    "totalBeers1",
    {
      name: "Brewmatics",
      earned: false,
      description: "Acquire 1,000 lifetime beers.",
      hint: "According to my calculations... we have a lot of beer",
      calculateEarned: (entities: entities) =>
        entities.beerClicker.lifetimeBeers >= 1000,
    },
  ],
  [
    "homeBrewKit1",
    {
      name: "Party Trick",
      earned: false,
      description: "Purchase your first Home Brew Kit.",
      hint: "Give a man a beer, he'll waste an hour. Teach him to home brew, he'll waste a lifetime.",
      calculateEarned: (entities: entities) => {
        const brewKit =
          entities.buildings.buildings.buildingData.get("brewKit");
        return brewKit ? brewKit.owned >= 1 : false;
      },
    },
  ],
  [
    "fellowSapper1",
    {
      name: "Pyramid Scheme",
      earned: false,
      description: "Hire your first Fellow Sapper.",
      hint: "Hi, my name's Chad",
      calculateEarned: (entities: entities) => {
        const fellowSapper =
          entities.buildings.buildings.buildingData.get("fellowSapper");
        return fellowSapper ? fellowSapper.owned >= 1 : false;
      },
    },
  ],
  [
    "beerTree1",
    {
      name: "Rain Dance",
      earned: false,
      description: "Plant your first Beer Tree.",
      hint: "Sowing the seeds of a cool Natural Light.",
      calculateEarned: (entities: entities) => {
        const beerTree =
          entities.buildings.buildings.buildingData.get("beerTree");
        return beerTree ? beerTree.owned >= 1 : false;
      },
    },
  ],
]);

export default achievementData;
