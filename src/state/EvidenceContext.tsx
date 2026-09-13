import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import { mockEvidence } from '../data/mockEvidence';
import { HEALTH_DATA_ANALYST_ROLE_ID } from '../data/roleLibrary';
import type { EvidenceItem, EvidenceType } from '../types/evidence';

export interface NewEvidenceInput {
  title: string;
  type: EvidenceType;
  description: string;
  /** Comma-separated skills, already split and trimmed by the caller. */
  skills: string[];
  strengthNote: string;
  /** Self-declared: is there a shareable output/artefact behind this? */
  hasOutput: boolean;
}

interface EvidenceContextValue {
  /** All evidence, local items first. */
  evidence: EvidenceItem[];
  sampleEvidence: EvidenceItem[];
  localEvidence: EvidenceItem[];
  /** Title of the most recently added local item, for a one-time success message. */
  justAddedTitle: string | null;
  addEvidence: (input: NewEvidenceInput) => void;
  clearJustAdded: () => void;
  /** Discards all local evidence and restores the original sample set. */
  resetDemoEvidence: () => void;
  /**
   * The sample evidence is Health Data Analyst shaped. When the student
   * targets any other role, it stops being relevant, so it's cleared —
   * local (user-added) evidence is never touched by this. Selecting
   * Health Data Analyst again restores it if it isn't already present.
   */
  syncSampleEvidenceForRole: (roleId: string) => void;
}

const EvidenceContext = createContext<EvidenceContextValue | undefined>(undefined);

let localEvidenceCounter = 0;

export function EvidenceProvider({ children }: PropsWithChildren) {
  const [evidence, setEvidence] = useState<EvidenceItem[]>(mockEvidence);
  const [justAddedTitle, setJustAddedTitle] = useState<string | null>(null);

  const addEvidence = useCallback((input: NewEvidenceInput) => {
    localEvidenceCounter += 1;
    const newItem: EvidenceItem = {
      id: `local-${localEvidenceCounter}`,
      title: input.title,
      type: input.type,
      description: input.description || undefined,
      demonstrates: input.skills,
      hasOutput: input.hasOutput,
      strengthNote: input.strengthNote || undefined,
      origin: 'local',
    };
    setEvidence((prev) => [newItem, ...prev]);
    setJustAddedTitle(input.title);
  }, []);

  const clearJustAdded = useCallback(() => setJustAddedTitle(null), []);

  const resetDemoEvidence = useCallback(() => {
    setEvidence(mockEvidence.map((item) => ({ ...item })));
    setJustAddedTitle(null);
  }, []);

  const syncSampleEvidenceForRole = useCallback((roleId: string) => {
    setEvidence((prev) => {
      const localOnly = prev.filter((item) => item.origin === 'local');
      if (roleId === HEALTH_DATA_ANALYST_ROLE_ID) {
        const alreadyHasSample = prev.some((item) => item.origin === 'sample');
        return alreadyHasSample
          ? prev
          : [...mockEvidence.map((item) => ({ ...item })), ...localOnly];
      }
      return localOnly;
    });
  }, []);

  const value = useMemo<EvidenceContextValue>(
    () => ({
      evidence,
      sampleEvidence: evidence.filter((item) => item.origin === 'sample'),
      localEvidence: evidence.filter((item) => item.origin === 'local'),
      justAddedTitle,
      addEvidence,
      clearJustAdded,
      resetDemoEvidence,
      syncSampleEvidenceForRole,
    }),
    [
      evidence,
      justAddedTitle,
      addEvidence,
      clearJustAdded,
      resetDemoEvidence,
      syncSampleEvidenceForRole,
    ],
  );

  return <EvidenceContext.Provider value={value}>{children}</EvidenceContext.Provider>;
}

export function useEvidence() {
  const context = useContext(EvidenceContext);
  if (!context) {
    throw new Error('useEvidence must be used within an EvidenceProvider');
  }
  return context;
}
