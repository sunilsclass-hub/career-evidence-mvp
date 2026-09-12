export type CompetencyStatusLevel = 'strong' | 'moderate' | 'weak' | 'missing';

export interface CompetencyAssessment {
  skill: string;
  status: CompetencyStatusLevel;
  /** Plain-language reason for the status, referencing source evidence by title. */
  reason: string;
}
