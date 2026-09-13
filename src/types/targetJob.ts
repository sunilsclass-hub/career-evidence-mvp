export interface TargetJob {
  /** A roleLibrary id, or OTHER_ROLE_ID when the student typed their own role. */
  roleId: string;
  /** Display name for the role — the library label, or the custom text for "Other". */
  role: string;
  company?: string;
  jobDescription: string;
  /** True while this record is demo/sample data rather than user-entered. */
  isSample: boolean;
}
