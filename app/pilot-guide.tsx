import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { Screen } from '../src/components/Screen';
import { SectionHeader } from '../src/components/SectionHeader';
import { StatusBadge } from '../src/components/StatusBadge';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';

const scriptSteps = [
  'Ask the student to think of one target role.',
  'Let them walk through the sample Data Analyst demo.',
  'Ask them to add one real or imagined evidence item.',
  'Ask them to observe how the Gap Map changes.',
  'Ask them to open the Next Evidence Action.',
  'Ask them to submit Pilot Feedback.',
];

const observationQuestions = [
  'Did the student understand "evidence" without extra explanation?',
  'Did they notice the difference between certificate and project evidence?',
  'Did the Gap Map create curiosity or confusion?',
  'Did the Next Evidence Action feel practical?',
  'Did they hesitate at uploading real documents?',
];

export default function PilotGuideScreen() {
  return (
    <Screen>
      <AppHeader showBack />
      <SectionHeader title="Pilot guide" />
      <View style={styles.badgeRow}>
        <StatusBadge label="For facilitator" tone="local" />
      </View>
      <Text style={styles.explainer}>
        This screen is for you, the person running the demo — not for the
        student. Use it to keep each session short and consistent.
      </Text>

      <Text style={styles.blockLabel}>5-MINUTE TESTING SCRIPT</Text>
      {scriptSteps.map((step, index) => (
        <View key={step} style={styles.stepRow}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}

      <Text style={styles.blockLabel}>FACILITATOR OBSERVATION QUESTIONS</Text>
      <View style={styles.observationCard}>
        {observationQuestions.map((question) => (
          <Text key={question} style={styles.observationItem}>
            • {question}
          </Text>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  badgeRow: {
    marginBottom: spacing.md,
  },
  explainer: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  blockLabel: {
    ...typography.small,
    color: colors.textMuted,
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  stepNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.indigo,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumberText: {
    ...typography.small,
    color: colors.white,
  },
  stepText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  observationCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  observationItem: {
    ...typography.body,
    color: colors.textPrimary,
  },
});
