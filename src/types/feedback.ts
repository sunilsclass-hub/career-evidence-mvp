export type GapMapHelpfulness = 'Yes, clearly' | 'Somewhat' | 'Not yet';
export type NextActionUsefulness = 'Very useful' | 'Somewhat useful' | 'Not useful';
export type YesMaybeNo = 'Yes' | 'Maybe' | 'No';
export type FeedbackPayer = 'Student' | 'College/university' | 'Employer/recruiter' | 'Not sure';

export interface PilotFeedback {
  gapMapHelpful: GapMapHelpfulness;
  nextActionUseful: NextActionUsefulness;
  wouldUploadRealEvidence: YesMaybeNo;
  whoShouldPay: FeedbackPayer;
  targetRoleUseCase: string;
  confusedOrMissing: string;
  wouldRecommend: YesMaybeNo;
  willCompleteIn14Days: YesMaybeNo;
  /** Optional — only if the student is happy to be followed up with. Not submitted anywhere in this demo. */
  contactInfo: string;
}
