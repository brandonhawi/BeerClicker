"use client";

import { useGameLoop } from "./hooks/useGameLoop";
import { useAchievementWatcher } from "./hooks/useAchievementWatcher";
import { useHydration } from "./hooks/useHydration";
import BeerClicker from "./viewComponents/BeerClicker";
import Buildings from "./entities/Buildings";
import Achievements from "./entities/Achievements";
import Research from "./entities/Research";

const Game = () => {
  // Initialize game hooks
  useGameLoop();
  useAchievementWatcher();
  const isHydrated = useHydration();

  // Show loading until hydrated to prevent SSR mismatch
  if (!isHydrated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        outline: "none",
        flex: "",
        alignItems: "start",
      }}
    >
      <BeerClicker />
      <Buildings />
      <Achievements />
      <Research />
    </div>
  );
};

export default Game;
