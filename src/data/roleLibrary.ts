export interface DemoRole {
  id: string;
  label: string;
  competencies: string[];
}

/**
 * Hand-curated roles this demo can score evidence against. No role
 * inference or keyword extraction from a job description — a role is only
 * ever assessed if it's one of these four, picked explicitly by the
 * student. Anything else falls back to "Other" (see target-job.tsx and
 * gap-map.tsx), which is shown honestly rather than guessed at.
 */
export const roleLibrary: DemoRole[] = [
  {
    id: 'hospital-quality',
    label: 'Hospital Quality / Administration',
    competencies: [
      'NABH standards and accreditation requirements',
      'Quality indicator data collection and reporting',
      'Clinical audit',
      'Root cause analysis and CAPA',
      'Infection control practice',
      'SOP and policy documentation',
      'Patient safety incident reporting',
      'Staff training and stakeholder communication',
    ],
  },
  {
    id: 'clinical-research',
    label: 'Clinical Research Associate / Coordinator',
    competencies: [
      'ICH-GCP principles',
      'Informed consent process',
      'Protocol adherence and study documentation',
      'Case Report Form completion and data entry',
      'Ethics committee and regulatory submission',
      'Source data verification and monitoring',
      'Adverse event reporting',
      'Participant recruitment and retention',
    ],
  },
  {
    id: 'public-health',
    label: 'Public Health Programme Officer',
    competencies: [
      'Epidemiological data interpretation',
      'Field survey and data collection',
      'National health programme knowledge',
      'Health education and community mobilisation',
      'Monitoring and evaluation indicators',
      'Basic biostatistics',
      'Programme report writing',
      'Inter-agency and stakeholder coordination',
    ],
  },
  {
    id: 'health-data-analyst',
    label: 'Health Data Analyst',
    competencies: [
      'Spreadsheet analysis',
      'SQL',
      'Python or R',
      'Data cleaning',
      'Descriptive and inferential statistics',
      'Data visualisation and dashboards',
      'Health data privacy and de-identification',
      'Interpretation and communication of findings',
    ],
  },
];

/** The only role the current sample evidence is shaped for. */
export const HEALTH_DATA_ANALYST_ROLE_ID = 'health-data-analyst';

/** Sentinel id for a role typed in by the student, not picked from the library. */
export const OTHER_ROLE_ID = 'other';

export function findRoleById(roleId: string): DemoRole | undefined {
  return roleLibrary.find((role) => role.id === roleId);
}
