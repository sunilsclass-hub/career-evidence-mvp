export type CompetencyStatusLevel = 'strong' | 'moderate' | 'weak' | 'missing';

/**
 * The single canonical label for each tier. Every screen and component must
 * import this instead of inventing its own wording (e.g. "Strongly
 * evidenced" vs "Strong evidence") so the same four words are used
 * everywhere a tier is shown.
 */
export const competencyStatusLabel: Record<CompetencyStatusLevel, string> = {
  strong: 'Strong',
  moderate: 'Moderate',
  weak: 'Weak',
  missing: 'Missing',
};

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
  /** Plain-language reason for the status, derived from the tiering rule. */
  reason: string;
}

export interface EvidenceReadinessSnapshot {
  strongCount: number;
  moderateCount: number;
  weakCount: number;
  criticalGapCount: number;
}
