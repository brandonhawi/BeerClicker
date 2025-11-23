import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useGameStore } from '../store/gameStore';
import { achievementRules } from '../game-logic/achievementRules';
import Achievement from '../viewComponents/Achievement';

/**
 * Achievement watcher hook
 * Subscribes to state changes and unlocks achievements when conditions are met
 */
export function useAchievementWatcher() {
  useEffect(() => {
    const unsubscribers: Array<() => void> = [];

    // Subscribe to each achievement condition
    Object.entries(achievementRules).forEach(([achievementId, checkCondition]) => {
      const unsubscribe = useGameStore.subscribe(
        (state) => {
          const achievement = state.achievements[achievementId];
          if (!achievement) return false;

          // Only check if not already earned
          if (achievement.earned) return false;

          // Check condition
          return checkCondition(state);
        },
        (shouldUnlock, previousShouldUnlock) => {
          // Only trigger if condition changed from false to true
          if (shouldUnlock && !previousShouldUnlock) {
            const state = useGameStore.getState();
            const achievement = state.achievements[achievementId];

            if (achievement && !achievement.earned) {
              // Unlock achievement
              state.unlockAchievement(achievementId);

              // Show toast notification (always enabled per plan)
              toast.custom(
                () => (
                  <Achievement
                    name={achievement.name}
                    hint={achievement.hint}
                  />
                ),
                {
                  duration: 5000,
                  position: 'bottom-right',
                }
              );

              // Play achievement sound (audio implementation deferred per plan)
              // TODO: Add audio playback
            }
          }
        },
        {
          equalityFn: (a, b) => a === b,
        }
      );

      unsubscribers.push(unsubscribe);
    });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, []);
}
