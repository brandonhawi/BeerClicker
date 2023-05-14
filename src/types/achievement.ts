import { entities } from "./entities";

export type Achievement = {
  name: string;
  earned: boolean;
  description: string;
  hint: string;
  calculateEarned: (entites: entities) => boolean;
};
