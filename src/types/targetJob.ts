export interface TargetJob {
  role: string;
  company?: string;
  jobDescription: string;
  /** True while this record is demo/sample data rather than user-entered. */
  isSample: boolean;
}
