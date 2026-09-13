export type EvidenceType =
  | 'Project'
  | 'Coursework'
  | 'Presentation'
  | 'Certificate'
  | 'Internship output'
  | 'Other';

/** Where this evidence item came from: pre-loaded sample data, or added locally by the user. */
export type EvidenceOrigin = 'sample' | 'local';

export interface EvidenceItem {
  id: string;
  title: string;
  type: EvidenceType;
  /** Short description of the work, in the user's own words. */
  description?: string;
  /** Skills/competencies this evidence demonstrates. */
  demonstrates: string[];
  /**
   * True when this evidence includes a shareable output/artefact (a working
   * dashboard, a report, a repo, a recording) rather than just a claim of
   * having done the work. Defaults to false — Strong tier requires this.
   */
  hasOutput?: boolean;
  /** User's own note on what makes this evidence real (dataset, output, feedback, link, etc). */
  strengthNote?: string;
  /** System-authored caution surfaced for weaker evidence types (e.g. certificates). */
  note?: string;
  origin: EvidenceOrigin;
}
