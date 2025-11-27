import type { ReactNode } from "react";

import ResearchBuildingView from "./ResearchBuildingView";
import prettyPrintNumber from "../helpers/prettyPrintNumber";
import { useResearchBuildings, useHops, useHopsPerSecond } from "../store/selectors";
import { useGameStore } from "../store/gameStore";
import { canPurchaseResearch, shouldShowUnlockHint } from "../game-logic/researchRules";

const Research = () => {
  const researchBuildings = useResearchBuildings();
  const totalHops = useHops();
  const totalHopsPerSecond = useHopsPerSecond();
  const state = useGameStore();

  const displayedHops = prettyPrintNumber(Math.floor(totalHops));
  const displayedHPS = prettyPrintNumber(
    Math.round(totalHopsPerSecond * 10) / 10
  );

  const researchBuildingsRender: ReactNode[] = [];
  Object.entries(researchBuildings).forEach(([researchBuildingId, researchBuilding]) => {
    researchBuildingsRender.push(
      <ResearchBuildingView
        key={researchBuildingId}
        id={researchBuildingId}
        name={researchBuilding.name}
        description={researchBuilding.description}
        hopsPerSecond={researchBuilding.hopsPerSecond}
        owned={researchBuilding.owned}
        cost={researchBuilding.cost}
        unlockHint={researchBuilding.unlockHint}
        canPurchase={canPurchaseResearch(researchBuilding, state)}
        showUnlockHint={shouldShowUnlockHint(researchBuilding, state)}
      />
    );
  });

  return (
    <aside className="fixed right-0 top-0 h-full w-60 flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto">
      <ul className="list-none p-0 m-0">
        <li className="my-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-around">
              <span className="px-3 py-1 bg-primary text-white rounded-full text-sm select-none">
                {displayedHops} hops
              </span>
              <span className="px-3 py-1 bg-primary text-white rounded-full text-sm select-none">
                {displayedHPS} hops per second
              </span>
            </div>
          </div>
        </li>
        {researchBuildingsRender}
      </ul>
    </aside>
  );
};

export default Research;
