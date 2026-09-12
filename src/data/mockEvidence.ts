import type { EvidenceItem } from '../types/evidence';

export const mockEvidence: EvidenceItem[] = [
  {
    id: 'ev-sales-dashboard',
    title: 'Sales Dashboard Project',
    type: 'Project',
    demonstrates: ['Power BI', 'Data cleaning', 'Presentation'],
    isSample: true,
  },
  {
    id: 'ev-customer-db',
    title: 'Customer Database Assignment',
    type: 'Coursework',
    demonstrates: ['SQL', 'Database querying'],
    isSample: true,
  },
  {
    id: 'ev-business-presentation',
    title: 'Business Presentation',
    type: 'Presentation',
    demonstrates: ['Communication', 'Teamwork'],
    isSample: true,
  },
  {
    id: 'ev-python-certificate',
    title: 'Python Basics Certificate',
    type: 'Certificate',
    demonstrates: ['Python'],
    note: 'A certificate alone is weaker evidence than a demonstrated project.',
    isSample: true,
  },
];
