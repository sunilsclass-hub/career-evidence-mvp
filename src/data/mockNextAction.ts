import type { NextAction } from '../types/nextAction';

export const mockNextAction: NextAction = {
  projectName: 'Mini Project: Python Statistics Insight Report',
  targets: ['Python', 'Statistics', 'Business interpretation'],
  steps: [
    'Choose a public dataset',
    'Clean the data in Python',
    'Produce descriptive statistics',
    'Run one statistical test or simple regression',
    'Create 2 charts',
    'Write a 150-word business interpretation',
    'Upload notebook, output and explanation as evidence',
  ],
  whyThisHelps: [
    'It converts Python from certificate-only evidence into project evidence.',
    'It creates first evidence for statistics.',
    'It demonstrates interpretation, not just tool use.',
  ],
  uploadLater: [
    'Code/notebook',
    'Dataset/source link',
    'Charts/output',
    'Written interpretation',
    '2–3 minute explanation',
  ],
};
