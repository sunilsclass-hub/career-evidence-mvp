import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import { mockTargetJob } from '../data/mockTargetJob';
import type { TargetJob } from '../types/targetJob';

interface TargetJobContextValue {
  targetJob: TargetJob;
  setTargetJob: (targetJob: TargetJob) => void;
  resetTargetJob: () => void;
}

const TargetJobContext = createContext<TargetJobContextValue | undefined>(undefined);

export function TargetJobProvider({ children }: PropsWithChildren) {
  const [targetJob, setTargetJobState] = useState<TargetJob>(mockTargetJob);

  const setTargetJob = useCallback((next: TargetJob) => {
    setTargetJobState(next);
  }, []);

  const resetTargetJob = useCallback(() => {
    setTargetJobState({ ...mockTargetJob });
  }, []);

  const value = useMemo<TargetJobContextValue>(
    () => ({ targetJob, setTargetJob, resetTargetJob }),
    [targetJob, setTargetJob, resetTargetJob],
  );

  return <TargetJobContext.Provider value={value}>{children}</TargetJobContext.Provider>;
}

export function useTargetJob() {
  const context = useContext(TargetJobContext);
  if (!context) {
    throw new Error('useTargetJob must be used within a TargetJobProvider');
  }
  return context;
}
