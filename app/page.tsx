"use client";

import dynamic from "next/dynamic";
import BeerClickNumber from "../src/viewComponents/BeerClickNumber";

const Game = dynamic(() => import("../src/Game"), { ssr: false });

export default function Home() {
  return (
    <>
      <Game />
      <BeerClickNumber />
    </>
  );
}
