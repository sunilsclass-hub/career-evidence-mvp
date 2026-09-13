export interface NextAction {
  projectName: string;
  targets: string[];
  steps: string[];
  whyThisHelps: string[];
  uploadLater: string[];
}

/** How soon the student commits to finishing the recommended action. */
export type ActionCommitment = 'This week' | 'In 2 weeks' | 'This month';
