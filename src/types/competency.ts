export type CompetencyStatusLevel = 'strong' | 'moderate' | 'weak' | 'missing';

/** What kind of evidence (if any) backs this competency. */
export type EvidenceKind =
  | 'project'
  | 'certificate'
  | 'presentation'
  | 'coursework'
  | 'internship'
  | 'other'
  | 'none';

export interface CompetencyAssessment {
  skill: string;
  status: CompetencyStatusLevel;
  evidenceKind: EvidenceKind;
  /** Title of the supporting evidence item, if any. */
  supportingEvidence?: string;
  /** Plain-language reason for the status, referencing source evidence by title. */
  reason: string;
}

export interface EvidenceReadinessSnapshot {
  strongCount: number;
  moderateCount: number;
  weakCount: number;
  criticalGapCount: number;
}
