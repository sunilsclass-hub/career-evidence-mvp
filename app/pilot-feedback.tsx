import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { ChoiceQuestion } from '../src/components/ChoiceQuestion';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { SectionHeader } from '../src/components/SectionHeader';
import { StatusBadge } from '../src/components/StatusBadge';
import { TextButton } from '../src/components/TextButton';
import { useEvidence } from '../src/state/EvidenceContext';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';
import type {
  FeedbackPayer,
  GapMapHelpfulness,
  NextActionUsefulness,
  YesMaybeNo,
} from '../src/types/feedback';

const gapMapOptions: readonly GapMapHelpfulness[] = ['Yes, clearly', 'Somewhat', 'Not yet'];
const nextActionOptions: readonly NextActionUsefulness[] = [
  'Very useful',
  'Somewhat useful',
  'Not useful',
];
const yesMaybeNoOptions: readonly YesMaybeNo[] = ['Yes', 'Maybe', 'No'];
const payerOptions: readonly FeedbackPayer[] = [
  'Student',
  'College/university',
  'Employer/recruiter',
  'Not sure',
];

export default function PilotFeedbackScreen() {
  const { resetDemoEvidence } = useEvidence();
  const [gapMapHelpful, setGapMapHelpful] = useState<GapMapHelpfulness | null>(null);
  const [nextActionUseful, setNextActionUseful] = useState<NextActionUsefulness | null>(
    null,
  );
  const [wouldUploadRealEvidence, setWouldUploadRealEvidence] = useState<YesMaybeNo | null>(
    null,
  );
  const [whoShouldPay, setWhoShouldPay] = useState<FeedbackPayer | null>(null);
  const [targetRoleUseCase, setTargetRoleUseCase] = useState('');
  const [confusedOrMissing, setConfusedOrMissing] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<YesMaybeNo | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = useMemo(
    () =>
      gapMapHelpful !== null &&
      nextActionUseful !== null &&
      wouldUploadRealEvidence !== null &&
      whoShouldPay !== null &&
      wouldRecommend !== null,
    [gapMapHelpful, nextActionUseful, wouldUploadRealEvidence, whoShouldPay, wouldRecommend],
  );

  const handleSubmit = () => {
    if (!canSubmit) return;
    // Local demo only — no network call, no persistence beyond this screen.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Screen scroll={false}>
        <AppHeader showBack />
        <View style={styles.successContainer}>
          <Text style={styles.successTitle}>
            Thank you. Demo feedback recorded locally.
          </Text>
          <Text style={styles.successNote}>
            In the real pilot, this would be securely saved with consent.
          </Text>
          <View style={styles.resetRow}>
            <TextButton label="Reset demo" onPress={resetDemoEvidence} />
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <AppHeader showBack />
      <SectionHeader title="Pilot feedback" />
      <Text style={styles.explainer}>
        Help us understand whether this evidence map would be useful for
        students preparing for placements, internships or early-career
        roles.
      </Text>

      <View style={styles.localBadgeRow}>
        <StatusBadge label="Local demo only" tone="local" />
      </View>

      <ChoiceQuestion
        question="Did the Evidence Gap Map help you understand what you can actually prove?"
        options={gapMapOptions}
        selected={gapMapHelpful}
        onSelect={setGapMapHelpful}
      />

      <ChoiceQuestion
        question="Was the recommended Next Evidence Action useful?"
        options={nextActionOptions}
        selected={nextActionUseful}
        onSelect={setNextActionUseful}
      />

      <ChoiceQuestion
        question="Would you upload your real CV/projects/certificates to get this analysis?"
        options={yesMaybeNoOptions}
        selected={wouldUploadRealEvidence}
        onSelect={setWouldUploadRealEvidence}
      />

      <ChoiceQuestion
        question="Who should pay for this if it becomes real?"
        options={payerOptions}
        selected={whoShouldPay}
        onSelect={setWhoShouldPay}
      />

      <View style={styles.field}>
        <Text style={styles.label}>
          What target role would you personally use this for?
        </Text>
        <TextInput
          style={styles.input}
          value={targetRoleUseCase}
          onChangeText={setTargetRoleUseCase}
          placeholder="e.g. Business Analyst"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>What confused you or felt missing?</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={confusedOrMissing}
          onChangeText={setConfusedOrMissing}
          placeholder="Tell us what felt unclear or incomplete"
          placeholderTextColor={colors.textMuted}
          multiline
        />
      </View>

      <ChoiceQuestion
        question="Would you recommend this to another student?"
        options={yesMaybeNoOptions}
        selected={wouldRecommend}
        onSelect={setWouldRecommend}
      />

      <PrimaryButton
        label="Submit Demo Feedback"
        onPress={handleSubmit}
        disabled={!canSubmit}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  explainer: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  localBadgeRow: {
    marginBottom: spacing.lg,
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  successTitle: {
    ...typography.headline,
    color: colors.success,
    textAlign: 'center',
  },
  successNote: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  resetRow: {
    marginTop: spacing.md,
  },
});
