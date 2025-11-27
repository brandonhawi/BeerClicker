import type { ReactElement } from "react";

import SVG from "../beer.svg";
import "./BeerClicker.css";
import prettyPrintNumber from "../helpers/prettyPrintNumber";
import { useBeers, useBeersPerSecond } from "../store/selectors";
import { useGameStore } from "../store/gameStore";

const BeerClicker = (): ReactElement => {
  const totalBeers = useBeers();
  const totalBeersPerSecond = useBeersPerSecond();
  const clickBeer = useGameStore((state) => state.clickBeer);

  const displayedBeers = prettyPrintNumber(Math.floor(totalBeers));
  const displayedBPS = prettyPrintNumber(
    Math.round(totalBeersPerSecond * 10) / 10
  );

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    clickBeer(e.clientX, e.clientY);
  };

  return (
    <div className="flex flex-col justify-around gap-4">
      <div className="flex justify-center h-4/5">
        <SVG
          className="beerClicker"
          viewBox="-20 -20 160 160"
          width="320px"
          height="320px"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="px-3 py-1 bg-primary text-white rounded-full text-sm select-none">
          Beers
        </span>
        <span className="px-3 py-1 bg-primary text-white rounded-full text-sm select-none">
          {displayedBeers}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="px-3 py-1 bg-primary text-white rounded-full text-sm select-none">
          Beers Per Second
        </span>
        <span className="px-3 py-1 bg-primary text-white rounded-full text-sm select-none">
          {displayedBPS}
        </span>
      </div>
    </div>
  );
};

export default BeerClicker;
