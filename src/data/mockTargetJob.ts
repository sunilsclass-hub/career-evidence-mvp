import { HEALTH_DATA_ANALYST_ROLE_ID } from './roleLibrary';
import type { TargetJob } from '../types/targetJob';

export const mockTargetJob: TargetJob = {
  roleId: HEALTH_DATA_ANALYST_ROLE_ID,
  role: 'Health Data Analyst',
  company: 'Example Consulting Company',
  jobDescription:
    'We are looking for a Health Data Analyst to help our team turn ' +
    'raw health data into clear, actionable insight. You will clean and ' +
    'query data using SQL, build analysis scripts in Python or R, and design ' +
    'dashboards to visualise findings. A solid grasp of statistics is expected, ' +
    'along with the ability to explain findings to non-technical ' +
    'stakeholders while respecting patient data privacy.',
  isSample: true,
};
