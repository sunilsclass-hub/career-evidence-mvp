import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import { mockEvidence } from '../data/mockEvidence';
import type { EvidenceItem, EvidenceType } from '../types/evidence';

export interface NewEvidenceInput {
  title: string;
  type: EvidenceType;
  description: string;
  /** Comma-separated skills, already split and trimmed by the caller. */
  skills: string[];
  strengthNote: string;
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
      strengthNote: input.strengthNote || undefined,
      origin: 'local',
    };
    setEvidence((prev) => [newItem, ...prev]);
    setJustAddedTitle(input.title);
  }, []);

  const clearJustAdded = useCallback(() => setJustAddedTitle(null), []);

  const value = useMemo<EvidenceContextValue>(
    () => ({
      evidence,
      sampleEvidence: evidence.filter((item) => item.origin === 'sample'),
      localEvidence: evidence.filter((item) => item.origin === 'local'),
      justAddedTitle,
      addEvidence,
      clearJustAdded,
    }),
    [evidence, justAddedTitle, addEvidence, clearJustAdded],
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
