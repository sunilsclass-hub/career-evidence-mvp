export type EvidenceType = 'Project' | 'Coursework' | 'Presentation' | 'Certificate';

export interface EvidenceItem {
  id: string;
  title: string;
  type: EvidenceType;
  /** Skills/competencies this evidence demonstrates. */
  demonstrates: string[];
  /** Optional note surfaced for weaker evidence types (e.g. certificates). */
  note?: string;
  /** All evidence in this prototype is fictional demo data. */
  isSample: boolean;
}
