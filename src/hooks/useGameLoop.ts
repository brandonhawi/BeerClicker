import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { calculateProduction } from '../game-logic/buildingRules';
import { calculateResearchProduction } from '../game-logic/researchRules';

/**
 * Custom game loop hook using requestAnimationFrame
 * Handles frame-rate independent updates for beer and hops production
 */
export function useGameLoop() {
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const fpsFramesRef = useRef<number[]>([]);

  useEffect(() => {
    let isInitialized = false;

    const gameLoop = (currentTime: number) => {
      try {
        // Handle first frame
        if (lastTimeRef.current === 0) {
          lastTimeRef.current = currentTime;
          rafIdRef.current = requestAnimationFrame(gameLoop);
          return;
        }

        // Calculate delta time in seconds
        const deltaMs = currentTime - lastTimeRef.current;
        const deltaSeconds = deltaMs / 1000;

        // Update last time
        lastTimeRef.current = currentTime;

        // Calculate FPS
        fpsFramesRef.current.push(deltaMs);
        if (fpsFramesRef.current.length > 60) {
          fpsFramesRef.current.shift();
        }
        const avgDelta = fpsFramesRef.current.reduce((a, b) => a + b, 0) / fpsFramesRef.current.length;
        const fps = Math.round(1000 / avgDelta);

        // Get current state
        const state = useGameStore.getState();

        // Calculate beer production
        let beersProduced = 0;
        Object.values(state.buildings).forEach((building) => {
          beersProduced += calculateProduction(building) * deltaSeconds;
        });

        // Calculate hops production
        let hopsProduced = 0;
        Object.values(state.researchBuildings).forEach((research) => {
          hopsProduced += calculateResearchProduction(research) * deltaSeconds;
        });

        // Update state
        if (beersProduced > 0) {
          state.incrementBeers(beersProduced);
        }
        if (hopsProduced > 0) {
          state.incrementHops(hopsProduced);
        }

        // Update performance metrics
        state.updatePerformance(fps, currentTime);

        // Update save time periodically (every 10 seconds)
        const timeSinceLastSave = currentTime - state.lastSaveTime;
        if (timeSinceLastSave >= 10000) {
          useGameStore.setState({ lastSaveTime: currentTime });
        }
      } catch (error) {
        // Graceful error handling - log but continue
        console.error('Game loop error:', error);
      }

      // Continue loop
      rafIdRef.current = requestAnimationFrame(gameLoop);
    };

    // Prevent double initialization in React StrictMode
    if (!isInitialized) {
      isInitialized = true;
      rafIdRef.current = requestAnimationFrame(gameLoop);
    }

    // Cleanup on unmount
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lastTimeRef.current = 0;
      fpsFramesRef.current = [];
    };
  }, []);
}
