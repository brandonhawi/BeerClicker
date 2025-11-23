import { Achievement } from '../types/gameTypes';

/**
 * Initial achievement definitions
 * All data is serializable (no functions)
 */
export const initialAchievements: Record<string, Achievement> = {
  totalBuilding1: {
    id: 'totalBuilding1',
    name: 'Beerenomics',
    earned: false,
    description: 'Purchase your first building.',
    hint: 'Beer makes the world go round.',
  },
  totalBuilding2: {
    id: 'totalBuilding2',
    name: 'Beerenomics II',
    earned: false,
    description: 'Purchase your 10th building.',
    hint: 'Wealth is in the mind not the pocket.... but what about beer?',
  },
  totalBeers1: {
    id: 'totalBeers1',
    name: 'Brewmatics',
    earned: false,
    description: 'Acquire 1,000 lifetime beers.',
    hint: 'According to my calculations... we have a lot of beer',
  },
  homeBrewKit1: {
    id: 'homeBrewKit1',
    name: 'Party Trick',
    earned: false,
    description: 'Purchase your first Home Brew Kit.',
    hint: "Give a man a beer, he'll waste an hour. Teach him to home brew, he'll waste a lifetime.",
  },
  fellowSapper1: {
    id: 'fellowSapper1',
    name: 'Pyramid Scheme',
    earned: false,
    description: 'Hire your first Fellow Sapper.',
    hint: "Hi, my name's Chad",
  },
  beerTree1: {
    id: 'beerTree1',
    name: 'Rain Dance',
    earned: false,
    description: 'Plant your first Beer Tree.',
    hint: 'Sowing the seeds of a cool Natural Light.',
  },
};

export default initialAchievements;
