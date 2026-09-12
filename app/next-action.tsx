import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { SecondaryButton } from '../src/components/SecondaryButton';
import { SectionHeader } from '../src/components/SectionHeader';
import { mockNextAction } from '../src/data/mockNextAction';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';

export default function NextActionScreen() {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  return (
    <Screen>
      <AppHeader showBack step="Step 4 of 4" />
      <SectionHeader
        title="Build this next"
        subtitle="One small project can strengthen your weakest evidence gaps."
      />

      <View style={styles.projectCard}>
        <Text style={styles.projectLabel}>RECOMMENDED PROJECT</Text>
        <Text style={styles.projectName}>{mockNextAction.projectName}</Text>
        <View style={styles.chipRow}>
          {mockNextAction.targets.map((skill) => (
            <View key={skill} style={styles.targetChip}>
              <Text style={styles.targetChipText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.blockLabel}>THE RECIPE</Text>
      {mockNextAction.steps.map((step, index) => (
        <View key={step} style={styles.stepRow}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}

      <View style={styles.whyCard}>
        <Text style={styles.whyLabel}>Why this helps</Text>
        {mockNextAction.whyThisHelps.map((reason) => (
          <Text key={reason} style={styles.whyItem}>
            • {reason}
          </Text>
        ))}
      </View>

      <Text style={styles.blockLabel}>WHAT TO UPLOAD LATER</Text>
      {mockNextAction.uploadLater.map((item) => (
        <Text key={item} style={styles.listItem}>
          • {item}
        </Text>
      ))}

      <Text style={styles.explainer}>
        When you add this evidence, your Career Evidence Map can be
        reassessed.
      </Text>

      {added ? (
        <View style={styles.successWrapper}>
          <View style={styles.successCard}>
            <Text style={styles.successTitle}>Added to demo action plan</Text>
            <Text style={styles.successBody}>
              Next build step: we will later connect this to a real user
              account and database.
            </Text>
          </View>
          <SecondaryButton
            label="Give Pilot Feedback"
            onPress={() => router.push('/pilot-feedback')}
          />
        </View>
      ) : (
        <PrimaryButton
          label="Add This To My Action Plan"
          onPress={() => setAdded(true)}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  projectCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  projectLabel: {
    ...typography.small,
    color: colors.textMuted,
    letterSpacing: 0.6,
    marginBottom: spacing.xs,
  },
  projectName: {
    ...typography.subtitle,
    color: colors.indigoDark,
    marginBottom: spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  targetChip: {
    backgroundColor: colors.sampleBg,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  targetChipText: {
    ...typography.caption,
    color: colors.sampleText,
    fontWeight: '600',
  },
  blockLabel: {
    ...typography.small,
    color: colors.textMuted,
    letterSpacing: 0.6,
    marginTop: spacing.md,
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
  whyCard: {
    backgroundColor: colors.strongBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  whyLabel: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  whyItem: {
    ...typography.body,
    color: colors.textPrimary,
  },
  listItem: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  explainer: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  successWrapper: {
    gap: spacing.md,
  },
  successCard: {
    backgroundColor: colors.successBg,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  successTitle: {
    ...typography.subtitle,
    color: colors.success,
  },
  successBody: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
