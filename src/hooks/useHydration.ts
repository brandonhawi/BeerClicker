import { useEffect, useState } from 'react';

/**
 * SSR Hydration hook
 * Returns false on server-side and initial client render,
 * then true after hydration is complete
 * This prevents hydration mismatch errors
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // This is the correct pattern for hydration detection
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
