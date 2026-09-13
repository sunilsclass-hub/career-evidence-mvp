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
import type { ActionCommitment } from '../types/nextAction';

interface ActionPlanState {
  added: boolean;
  commitment: ActionCommitment | null;
  finished: boolean;
}

const initialActionPlan: ActionPlanState = {
  added: false,
  commitment: null,
  finished: false,
};

interface TargetJobContextValue {
  targetJob: TargetJob;
  setTargetJob: (targetJob: TargetJob) => void;
  actionPlan: ActionPlanState;
  setActionAdded: (added: boolean) => void;
  setActionCommitment: (commitment: ActionCommitment | null) => void;
  setActionFinished: (finished: boolean) => void;
  /** Clears the target job (role/company/description) and the action plan
   * back to the original sample state — used by "Reset everything" so a
   * facilitator can hand the phone to the next student cleanly. */
  resetAll: () => void;
}

const TargetJobContext = createContext<TargetJobContextValue | undefined>(undefined);

export function TargetJobProvider({ children }: PropsWithChildren) {
  const [targetJob, setTargetJobState] = useState<TargetJob>(mockTargetJob);
  const [actionPlan, setActionPlan] = useState<ActionPlanState>(initialActionPlan);

  const setTargetJob = useCallback((next: TargetJob) => {
    setTargetJobState(next);
  }, []);

  const setActionAdded = useCallback((added: boolean) => {
    setActionPlan((prev) => ({ ...prev, added }));
  }, []);

  const setActionCommitment = useCallback((commitment: ActionCommitment | null) => {
    setActionPlan((prev) => ({ ...prev, commitment }));
  }, []);

  const setActionFinished = useCallback((finished: boolean) => {
    setActionPlan((prev) => ({ ...prev, finished }));
  }, []);

  const resetAll = useCallback(() => {
    setTargetJobState({ ...mockTargetJob });
    setActionPlan(initialActionPlan);
  }, []);

  const value = useMemo<TargetJobContextValue>(
    () => ({
      targetJob,
      setTargetJob,
      actionPlan,
      setActionAdded,
      setActionCommitment,
      setActionFinished,
      resetAll,
    }),
    [
      targetJob,
      setTargetJob,
      actionPlan,
      setActionAdded,
      setActionCommitment,
      setActionFinished,
      resetAll,
    ],
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
