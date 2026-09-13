export interface DemoRole {
  id: string;
  label: string;
  faculty: string;
  competencies: string[];
}

/**
 * The order faculties are shown in (Target Job screen's first picker step).
 */
export const facultyOrder: string[] = [
  'Medicine & Public Health',
  'Pharmacy',
  'Life Sciences',
  'Biomedical & Laboratory Sciences',
  'Dentistry',
  'Health Management',
  'Yoga & Wellness',
  'Research & Academic Pathway',
];

/**
 * Hand-curated roles this demo can score evidence against, covering the
 * faculties of JSS AHER, Mysuru. No role inference or keyword extraction
 * from a job description — a role is only ever assessed if it's one of
 * these, picked explicitly by the student. Anything else falls back to
 * "Other" (see target-job.tsx and gap-map.tsx), which is shown honestly
 * rather than guessed at.
 */
export const roleLibrary: DemoRole[] = [
  // Medicine & Public Health
  {
    id: 'public-health',
    label: 'Public Health Programme Officer',
    faculty: 'Medicine & Public Health',
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
    id: 'epidemiology-surveillance',
    label: 'Epidemiology & Surveillance Officer',
    faculty: 'Medicine & Public Health',
    competencies: [
      'Outbreak investigation steps',
      'Disease surveillance data handling',
      'Study design selection',
      'Sampling and case definition',
      'Descriptive epidemiological analysis',
      'Data quality checks and validation',
      'Field investigation reporting',
      'Communicating findings to programme staff',
    ],
  },
  {
    id: 'clinical-research',
    label: 'Clinical Research Associate / Coordinator',
    faculty: 'Medicine & Public Health',
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
    id: 'hospital-quality',
    label: 'Hospital Quality & Accreditation Officer',
    faculty: 'Medicine & Public Health',
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
    id: 'medical-writer',
    label: 'Medical Writer',
    faculty: 'Medicine & Public Health',
    competencies: [
      'Literature searching and appraisal',
      'Structured abstract and manuscript drafting',
      'Referencing and citation management',
      'Regulatory or clinical document formats',
      'Plain-language summary writing',
      'Plagiarism and research integrity standards',
      'Editing to journal or sponsor guidelines',
      'Working to a brief and deadline',
    ],
  },

  // Pharmacy
  {
    id: 'pharmacovigilance-associate',
    label: 'Pharmacovigilance Associate',
    faculty: 'Pharmacy',
    competencies: [
      'Adverse drug reaction case intake',
      'Causality assessment',
      'Seriousness and expectedness classification',
      'Safety database data entry',
      'Regulatory reporting timelines',
      'Signal detection basics',
      'Medical terminology and coding dictionaries',
      'Quality review of case narratives',
    ],
  },
  {
    id: 'regulatory-affairs-associate',
    label: 'Regulatory Affairs Associate',
    faculty: 'Pharmacy',
    competencies: [
      'Regulatory submission dossier structure',
      'CDSCO and international regulatory pathways',
      'Product labelling requirements',
      'Document version control and change management',
      'Responding to regulatory queries',
      'Good documentation practice',
      'Cross-functional coordination',
      'Tracking regulatory timelines',
    ],
  },
  {
    id: 'clinical-hospital-pharmacist',
    label: 'Clinical / Hospital Pharmacist',
    faculty: 'Pharmacy',
    competencies: [
      'Prescription review and dispensing accuracy',
      'Drug interaction and dose checking',
      'Patient counselling on medication',
      'Antimicrobial stewardship principles',
      'Ward round participation and drug history taking',
      'Medication error reporting',
      'Inventory and storage standards',
      'Therapeutic guideline application',
    ],
  },
  {
    id: 'pharma-quality-assurance-analyst',
    label: 'Pharmaceutical Quality Assurance Analyst',
    faculty: 'Pharmacy',
    competencies: [
      'Good Manufacturing Practice principles',
      'Analytical method execution',
      'Instrument handling and calibration',
      'Batch record review',
      'Deviation and CAPA documentation',
      'Stability study procedures',
      'Standard operating procedure writing',
      'Audit readiness and traceability',
    ],
  },

  // Life Sciences
  {
    id: 'bioinformatics-analyst',
    label: 'Bioinformatics Analyst',
    faculty: 'Life Sciences',
    competencies: [
      'Sequence data handling',
      'Command-line and scripting (Python, R or shell)',
      'Public biological database use',
      'Alignment and variant analysis pipelines',
      'Statistical interpretation of omics data',
      'Reproducible workflow documentation',
      'Data visualisation',
      'Communicating results to wet-lab colleagues',
    ],
  },
  {
    id: 'clinical-nutritionist-dietitian',
    label: 'Clinical Nutritionist / Dietitian',
    faculty: 'Life Sciences',
    competencies: [
      'Nutritional assessment methods',
      'Diet planning for clinical conditions',
      'Dietary recall and food frequency tools',
      'Counselling and behaviour change communication',
      'Nutrition screening in hospital settings',
      'Community nutrition programme knowledge',
      'Food safety and hygiene standards',
      'Documentation of dietary intervention and outcome',
    ],
  },
  {
    id: 'microbiology-analyst',
    label: 'Microbiology Analyst',
    faculty: 'Life Sciences',
    competencies: [
      'Aseptic technique',
      'Culture, isolation and identification',
      'Antimicrobial susceptibility testing',
      'Sample handling and chain of custody',
      'Biosafety practice',
      'Quality control of media and reagents',
      'Result interpretation and reporting',
      'Laboratory record keeping',
    ],
  },
  {
    id: 'environmental-water-health-officer',
    label: 'Environmental & Water Health Officer',
    faculty: 'Life Sciences',
    competencies: [
      'Water and environmental sample collection',
      'Water quality testing procedures',
      'Sanitation and hygiene assessment',
      'Environmental risk assessment',
      'Regulatory standards and permissible limits',
      'Field survey and community engagement',
      'Data recording and reporting',
      'Intervention planning and follow-up',
    ],
  },
  {
    id: 'counselling-mental-health-associate',
    label: 'Counselling / Mental Health Associate',
    faculty: 'Life Sciences',
    competencies: [
      'Basic counselling skills and active listening',
      'Psychological assessment tools',
      'Confidentiality and ethical boundaries',
      'Referral pathways and escalation',
      'Session documentation and case notes',
      'Psychoeducation delivery',
      'Group facilitation',
      'Supervision and reflective practice',
    ],
  },

  // Biomedical & Laboratory Sciences
  {
    id: 'medical-laboratory-scientist',
    label: 'Medical Laboratory Scientist',
    faculty: 'Biomedical & Laboratory Sciences',
    competencies: [
      'Specimen collection and pre-analytical handling',
      'Routine analyser operation',
      'Internal quality control',
      'External quality assurance participation',
      'Result validation and critical value reporting',
      'Laboratory safety and waste handling',
      'Equipment maintenance records',
      'Laboratory information system use',
    ],
  },
  {
    id: 'biomedical-research-associate',
    label: 'Biomedical / Life Sciences Research Associate',
    faculty: 'Biomedical & Laboratory Sciences',
    competencies: [
      'Experimental design and controls',
      'Core laboratory techniques',
      'Laboratory notebook and record keeping',
      'Data analysis and statistics',
      'Literature review',
      'Reagent and sample management',
      'Research ethics and biosafety compliance',
      'Presenting results to a lab group',
    ],
  },

  // Dentistry
  {
    id: 'dental-clinician',
    label: 'Dental Clinician (Early Career)',
    faculty: 'Dentistry',
    competencies: [
      'Patient history and clinical examination',
      'Diagnosis and treatment planning',
      'Infection control and sterilisation protocol',
      'Restorative and preventive procedures',
      'Radiographic interpretation',
      'Patient communication and consent',
      'Clinical record keeping',
      'Community dental outreach',
    ],
  },

  // Health Management
  {
    id: 'hospital-administration-executive',
    label: 'Hospital Administration Executive',
    faculty: 'Health Management',
    competencies: [
      'Hospital department workflow understanding',
      'Patient flow and capacity management',
      'Staffing and duty roster planning',
      'Procurement and inventory processes',
      'Healthcare regulation and licensing',
      'Budget and cost awareness',
      'Grievance and service quality handling',
      'Management reporting',
    ],
  },
  {
    id: 'health-insurance-claims-associate',
    label: 'Health Insurance & Claims Associate',
    faculty: 'Health Management',
    competencies: [
      'Insurance scheme and package knowledge',
      'Pre-authorisation processes',
      'Medical coding familiarity',
      'Claims documentation and submission',
      'Denial analysis and appeals',
      'Revenue cycle understanding',
      'Fraud and compliance awareness',
      'Coordination between clinical and billing teams',
    ],
  },

  // Yoga & Wellness
  {
    id: 'yoga-therapist-wellness-officer',
    label: 'Yoga Therapist / Wellness Programme Officer',
    faculty: 'Yoga & Wellness',
    competencies: [
      'Asana and pranayama instruction',
      'Client assessment and contraindication screening',
      'Programme design for specific conditions',
      'Group session facilitation',
      'Lifestyle and behaviour change counselling',
      'Outcome measurement and progress tracking',
      'Safety and referral awareness',
      'Session documentation',
    ],
  },

  // Research & Academic Pathway
  {
    id: 'academic-research-pathway',
    label: 'Academic & Research Pathway (PG, residency, fellowship)',
    faculty: 'Research & Academic Pathway',
    competencies: [
      'Formulating a research question',
      'Protocol and ethics submission',
      'Data collection and record keeping',
      'Statistical analysis of own data',
      'Manuscript preparation and submission',
      'Conference abstract and poster presentation',
      'Literature review and critical appraisal',
      'Research integrity and authorship standards',
    ],
  },
  {
    id: 'health-data-analyst',
    label: 'Health Data Analyst',
    faculty: 'Research & Academic Pathway',
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
  {
    id: 'digital-health-informatics',
    label: 'Digital Health / Health Informatics Associate',
    faculty: 'Research & Academic Pathway',
    competencies: [
      'Health data standards and interoperability',
      'Electronic health record workflows',
      'Requirements gathering from clinical users',
      'Data privacy and DPDP compliance',
      'Dashboard and report building',
      'Usability testing with end users',
      'Documentation of system workflows',
      'Training and supporting non-technical users',
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

export function rolesByFaculty(faculty: string): DemoRole[] {
  return roleLibrary.filter((role) => role.faculty === faculty);
}
