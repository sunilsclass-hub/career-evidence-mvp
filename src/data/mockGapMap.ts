import type { CompetencyAssessment } from '../types/competency';

export const mockGapMap: CompetencyAssessment[] = [
  {
    skill: 'Power BI',
    status: 'strong',
    reason: 'Supported by: Sales Dashboard Project',
  },
  {
    skill: 'SQL',
    status: 'strong',
    reason: 'Supported by: Customer Database Assignment',
  },
  {
    skill: 'Communication',
    status: 'strong',
    reason: 'Supported by: Business Presentation',
  },
  {
    skill: 'Data cleaning',
    status: 'moderate',
    reason: 'Supported by: Sales Dashboard Project (single project only)',
  },
  {
    skill: 'Teamwork',
    status: 'moderate',
    reason: 'Supported by: Business Presentation (claim, not a team deliverable)',
  },
  {
    skill: 'Python',
    status: 'weak',
    reason: 'Supported only by: Python Basics Certificate. No demonstrated project evidence yet.',
  },
  {
    skill: 'Statistics',
    status: 'missing',
    reason: 'No supporting evidence found.',
  },
  {
    skill: 'Business impact',
    status: 'missing',
    reason: 'No supporting evidence found.',
  },
];
