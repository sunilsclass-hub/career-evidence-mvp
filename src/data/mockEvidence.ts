import type { EvidenceItem } from '../types/evidence';

export const mockEvidence: EvidenceItem[] = [
  {
    id: 'ev-sales-dashboard',
    title: 'Sales Dashboard Project',
    type: 'Project',
    demonstrates: ['Data visualisation and dashboards', 'Data cleaning'],
    hasOutput: true,
    origin: 'sample',
  },
  {
    id: 'ev-customer-db',
    title: 'Customer Database Assignment',
    type: 'Coursework',
    demonstrates: ['SQL'],
    origin: 'sample',
  },
  {
    id: 'ev-business-presentation',
    title: 'Business Presentation',
    type: 'Presentation',
    demonstrates: ['Interpretation and communication of findings'],
    origin: 'sample',
  },
  {
    id: 'ev-python-certificate',
    title: 'Python Basics Certificate',
    type: 'Certificate',
    demonstrates: ['Python or R'],
    note: 'A certificate alone is weaker evidence than a demonstrated project.',
    origin: 'sample',
  },
];
