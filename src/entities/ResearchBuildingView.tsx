import Tooltip from "../components/Tooltip";
import prettyPrintNumber from "../helpers/prettyPrintNumber";
import { useMemo } from "react";
import { useGameStore } from "../store/gameStore";

type Props = {
  id: string;
  name: string;
  description: string;
  canPurchase: boolean;
  owned: number;
  hopsPerSecond: number;
  cost: number;
  unlockHint: string;
  showUnlockHint: boolean;
};

const ResearchBuildingView = ({
  id,
  name,
  description,
  canPurchase,
  owned,
  hopsPerSecond,
  cost,
  unlockHint,
  showUnlockHint,
}: Props) => {
  const purchaseResearchBuilding = useGameStore((state) => state.purchaseResearchBuilding);

  const displayedCost = useMemo(() => {
    return prettyPrintNumber(Math.ceil(cost));
  }, [cost]);

  const handleClick = () => {
    if (canPurchase) {
      purchaseResearchBuilding(id);
    }
  };

  return (
    <li className={id}>
      <Tooltip title={description} placement="right">
        <button
          disabled={!canPurchase}
          className={`${id} w-full text-left px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
          onClick={handleClick}
        >
          <div className={`${id} flex flex-col`}>
            <div className={id}>
              {name} [{hopsPerSecond} hops / second]
            </div>
            <div className={id}>Cost: {displayedCost} hops</div>
            <div className={id}>Owned: {owned}</div>
            {showUnlockHint && (
              <div className={`${id} text-sm text-center text-gray-600`}>
                {unlockHint}
              </div>
            )}
          </div>
        </button>
      </Tooltip>
    </li>
  );
};

export default ResearchBuildingView;
