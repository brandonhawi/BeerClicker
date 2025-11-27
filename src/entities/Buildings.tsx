import type { ReactNode } from "react";

import BuildingView from "./BuildingView";
import { useBuildings, useBeers, useNextBuildingId, useNextBuildingName } from "../store/selectors";
import { useGameStore } from "../store/gameStore";
import { canPurchase } from "../game-logic/buildingRules";

const Buildings = () => {
  const buildings = useBuildings();
  const totalBeers = useBeers();
  const nextBuildingId = useNextBuildingId();
  const nextBuildingName = useNextBuildingName();
  const unlockBuilding = useGameStore((state) => state.unlockBuilding);

  const buildingsRender: ReactNode[] = [];
  Object.entries(buildings).forEach(([buildingId, building]) => {
    if (building.unlocked) {
      buildingsRender.push(
        <BuildingView
          key={buildingId}
          id={buildingId}
          name={building.name}
          owned={building.owned}
          beersPerSecond={building.beersPerSecond}
          cost={building.cost}
          canPurchase={canPurchase(building, totalBeers)}
          purchaseText={building.purchaseText}
          description={building.description}
        />
      );
    }
  });

  const handleUnlockClick = () => {
    if (nextBuildingId) {
      unlockBuilding(nextBuildingId);
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-60 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
      <ul className="list-none p-0 m-0">
        {buildingsRender}
        {nextBuildingId && (
          <li className="flex justify-center p-2">
            <button
              id={nextBuildingId}
              onClick={handleUnlockClick}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            >
              Unlock {nextBuildingName}
            </button>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Buildings;
