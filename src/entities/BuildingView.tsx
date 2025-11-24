import Tooltip from "../components/Tooltip";
import prettyPrintNumber from "../helpers/prettyPrintNumber";
import { useMemo } from "react";
import { useGameStore } from "../store/gameStore";

type Props = {
  id: string;
  name: string;
  canPurchase: boolean;
  purchaseText: string;
  beersPerSecond: number;
  owned: number;
  cost: number;
  description: string;
};

const BuildingView = ({
  id,
  canPurchase,
  purchaseText,
  beersPerSecond,
  owned,
  cost,
  description,
}: Props) => {
  const purchaseBuilding = useGameStore((state) => state.purchaseBuilding);

  const displayedCost = useMemo(() => {
    return prettyPrintNumber(Math.ceil(cost));
  }, [cost]);

  const handleClick = () => {
    if (canPurchase) {
      purchaseBuilding(id);
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
              {purchaseText} [{beersPerSecond} beers / second]
            </div>
            <div className={id}>Cost: {displayedCost} beers</div>
            <div className={id}>Owned: {owned}</div>
          </div>
        </button>
      </Tooltip>
    </li>
  );
};

export default BuildingView;
