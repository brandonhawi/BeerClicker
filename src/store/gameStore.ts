import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { GameStore, GameState } from '../types/gameTypes';
import { initialBuildings } from '../assets/initialBuildings';
import { initialAchievements } from '../assets/initialAchievements';
import { initialResearchBuildings } from '../assets/initialResearchBuildings';
import { calculateNextCost } from '../game-logic/buildingRules';
import { calculateNextResearchCost } from '../game-logic/researchRules';

// Initial state
const initialState: GameState = {
  // Resources
  totalBeers: 0,
  lifetimeBeers: 0,
  beersPerClick: 1,
  totalHops: 0,
  lifetimeHops: 0,

  // Collections
  buildings: { ...initialBuildings },
  achievements: { ...initialAchievements },
  researchBuildings: { ...initialResearchBuildings },

  // UI State
  nextBuildingId: 'fellowSapper',
  nextBuildingName: 'Fellow Sapper',

  // Performance
  lastFrameTime: 0,
  fps: 0,

  // Game Control
  isRunning: false,
  lastSaveTime: Date.now(),
};

/**
 * Main game store with Zustand
 * Middleware stack: devtools -> persist -> subscribeWithSelector -> immer -> store
 */
export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((set, get) => ({
          ...initialState,

          // Resource Actions
          incrementBeers: (amount: number) => {
            set((state) => {
              state.totalBeers += amount;
              state.lifetimeBeers += amount;
            });
          },

          spendBeers: (amount: number) => {
            const state = get();
            if (state.totalBeers >= amount) {
              set((draft) => {
                draft.totalBeers -= amount;
              });
              return true;
            }
            return false;
          },

          incrementHops: (amount: number) => {
            set((state) => {
              state.totalHops += amount;
              state.lifetimeHops += amount;
            });
          },

          clickBeer: (clientX: number, clientY: number) => {
            const state = get();
            const beersToAdd = state.beersPerClick;

            // Increment beers
            state.incrementBeers(beersToAdd);

            // Side effects: floating number animation and sound
            if (typeof window !== 'undefined') {
              // Floating number animation
              const template = document.getElementById('beer-click-number-template');
              if (template) {
                const clone = template.cloneNode(true) as HTMLElement;
                clone.id = '';
                clone.style.left = `${clientX}px`;
                clone.style.top = `${clientY}px`;
                clone.style.display = 'block';
                clone.textContent = `+${beersToAdd}`;
                document.body.appendChild(clone);

                setTimeout(() => {
                  clone.remove();
                }, 1000);
              }

              // Play click sound (audio implementation deferred per plan)
              // TODO: Add audio playback
            }
          },

          // Building Actions
          purchaseBuilding: (id: string) => {
            const state = get();
            const building = state.buildings[id];

            if (!building) return;

            if (state.spendBeers(building.cost)) {
              set((draft) => {
                const draftBuilding = draft.buildings[id];
                draftBuilding.owned += 1;
                draftBuilding.cost = calculateNextCost(draftBuilding);
              });
            }
          },

          unlockBuilding: (id: string) => {
            set((draft) => {
              const building = draft.buildings[id];
              if (building) {
                building.unlocked = true;

                // Find next locked building
                const buildingIds = Object.keys(draft.buildings);
                const currentIndex = buildingIds.indexOf(id);
                let nextId: string | null = null;
                let nextName: string | null = null;

                for (let i = currentIndex + 1; i < buildingIds.length; i++) {
                  const nextBuilding = draft.buildings[buildingIds[i]];
                  if (!nextBuilding.unlocked) {
                    nextId = buildingIds[i];
                    nextName = nextBuilding.name;
                    break;
                  }
                }

                draft.nextBuildingId = nextId;
                draft.nextBuildingName = nextName;
              }
            });
          },

          // Research Actions
          purchaseResearchBuilding: (id: string) => {
            const state = get();
            const research = state.researchBuildings[id];

            if (!research) return;

            if (state.totalHops >= research.cost) {
              set((draft) => {
                draft.totalHops -= research.cost;
                const draftResearch = draft.researchBuildings[id];
                draftResearch.owned += 1;
                draftResearch.cost = calculateNextResearchCost(draftResearch);
              });
            }
          },

          // Achievement Actions
          unlockAchievement: (id: string) => {
            set((draft) => {
              const achievement = draft.achievements[id];
              if (achievement && !achievement.earned) {
                achievement.earned = true;
                achievement.earnedAt = Date.now();
              }
            });
          },

          // Performance Actions
          updatePerformance: (fps: number, frameTime: number) => {
            set((draft) => {
              draft.fps = fps;
              draft.lastFrameTime = frameTime;
            });
          },

          // Game Control
          resetGame: () => {
            set(initialState);
          },
        }))
      ),
      {
        name: 'beer-clicker-storage',
        version: 1,
        partialize: (state) => ({
          // Only persist game progress
          totalBeers: state.totalBeers,
          lifetimeBeers: state.lifetimeBeers,
          beersPerClick: state.beersPerClick,
          totalHops: state.totalHops,
          lifetimeHops: state.lifetimeHops,
          buildings: state.buildings,
          achievements: state.achievements,
          researchBuildings: state.researchBuildings,
          nextBuildingId: state.nextBuildingId,
          nextBuildingName: state.nextBuildingName,
          lastSaveTime: state.lastSaveTime,
        }),
      }
    ),
    { name: 'BeerClickerStore' }
  )
);
