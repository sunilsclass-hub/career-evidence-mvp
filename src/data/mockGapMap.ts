import type { CompetencyAssessment, EvidenceReadinessSnapshot } from '../types/competency';

export const mockGapMap: CompetencyAssessment[] = [
  {
    skill: 'Power BI',
    status: 'strong',
    evidenceKind: 'project',
    supportingEvidence: 'Sales Dashboard Project',
    reason: 'A full project shows you can build and present a working dashboard, not just describe one.',
  },
  {
    skill: 'SQL',
    status: 'strong',
    evidenceKind: 'coursework',
    supportingEvidence: 'Customer Database Assignment',
    reason: 'Coursework shows real querying against a database schema, with a graded outcome.',
  },
  {
    skill: 'Communication',
    status: 'strong',
    evidenceKind: 'presentation',
    supportingEvidence: 'Business Presentation',
    reason: 'A delivered presentation demonstrates structuring and explaining a finding to an audience.',
  },
  {
    skill: 'Data cleaning',
    status: 'moderate',
    evidenceKind: 'project',
    supportingEvidence: 'Sales Dashboard Project',
    reason: 'Shown once, inside a single project — not yet repeated across different datasets.',
  },
  {
    skill: 'Teamwork',
    status: 'moderate',
    evidenceKind: 'presentation',
    supportingEvidence: 'Business Presentation',
    reason: 'The presentation implies collaboration, but there is no team deliverable confirming your specific role.',
  },
  {
    skill: 'Python',
    status: 'weak',
    evidenceKind: 'certificate',
    supportingEvidence: 'Python Basics Certificate',
    reason: 'Supported only by a certificate. No demonstrated project evidence yet — a certificate confirms exposure, not applied ability.',
  },
  {
    skill: 'Statistics',
    status: 'missing',
    evidenceKind: 'none',
    reason: 'No supporting evidence found. Nothing in your vault shows a statistical method being applied.',
  },
  {
    skill: 'Business impact',
    status: 'missing',
    evidenceKind: 'none',
    reason: 'No supporting evidence found. Nothing yet shows an outcome, decision, or result you influenced.',
  },
];

export const mockReadinessSnapshot: EvidenceReadinessSnapshot = {
  strongCount: 3,
  moderateCount: 2,
  weakCount: 1,
  criticalGapCount: 2,
};
