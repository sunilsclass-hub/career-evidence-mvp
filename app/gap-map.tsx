import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { CompetencyStatus } from '../src/components/CompetencyStatus';
import { EvidenceLogicBox } from '../src/components/EvidenceLogicBox';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { ReadinessSnapshot } from '../src/components/ReadinessSnapshot';
import { Screen } from '../src/components/Screen';
import { SectionHeader } from '../src/components/SectionHeader';
import { mockGapMap } from '../src/data/mockGapMap';
import { useEvidence } from '../src/state/EvidenceContext';
import { useTargetJob } from '../src/state/TargetJobContext';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';
import type { CompetencyStatusLevel } from '../src/types/competency';
import { buildDemoGapMap, buildReadinessSnapshot } from '../src/utils/buildDemoGapMap';

const groupOrder: { level: CompetencyStatusLevel; label: string }[] = [
  { level: 'strong', label: 'Strong evidence' },
  { level: 'moderate', label: 'Moderate evidence' },
  { level: 'weak', label: 'Weak evidence' },
  { level: 'missing', label: 'Missing evidence' },
];

const statusLabel: Record<CompetencyStatusLevel, string> = {
  strong: 'Strong',
  moderate: 'Moderate',
  weak: 'Weak',
  missing: 'Missing',
};

export default function GapMapScreen() {
  const router = useRouter();
  const { evidence } = useEvidence();
  const { targetJob } = useTargetJob();

  const { gapMap, improvements } = useMemo(
    () => buildDemoGapMap(mockGapMap, evidence),
    [evidence],
  );
  const readinessSnapshot = useMemo(() => buildReadinessSnapshot(gapMap), [gapMap]);

  return (
    <Screen>
      <AppHeader showBack step="Step 3 of 4" />
      <SectionHeader
        title="Your evidence vs. your target role"
        subtitle={`Target: ${targetJob.role}`}
      />

      <View style={styles.demoNotice}>
        <Text style={styles.demoNoticeTitle}>Rule-based demo update</Text>
        <Text style={styles.demoNoticeBody}>
          This map changes when you add local evidence. Real AI verification
          will be added later.
        </Text>
      </View>

      <ReadinessSnapshot snapshot={readinessSnapshot} />

      {improvements.length > 0 ? (
        <View style={styles.improvementsCard}>
          <Text style={styles.improvementsTitle}>
            Updated from your demo evidence
          </Text>
          {improvements.map((improvement) => (
            <Text key={improvement.skill} style={styles.improvementItem}>
              • {improvement.skill} moved from {statusLabel[improvement.from]}{' '}
              to {statusLabel[improvement.to]}
            </Text>
          ))}
          <Text style={styles.improvementsFootnote}>
            This is a rule-based demo update. Real AI evidence analysis will
            be added later.
          </Text>
        </View>
      ) : null}

      <View style={styles.claimBox}>
        <Text style={styles.claimText}>
          Your CV may claim a skill. This map asks: what proof supports it?
        </Text>
      </View>

      {groupOrder.map(({ level, label }) => {
        const items = gapMap.filter((c) => c.status === level);
        if (items.length === 0) return null;
        return (
          <View key={level} style={styles.group}>
            <Text style={styles.groupLabel}>{label.toUpperCase()}</Text>
            {items.map((competency) => (
              <CompetencyStatus key={competency.skill} competency={competency} />
            ))}
          </View>
        );
      })}

      <EvidenceLogicBox />

      <View style={styles.noteBox}>
        <Text style={styles.note}>Claims are not the same as evidence.</Text>
      </View>

      <PrimaryButton
        label="Show Me What To Do Next"
        onPress={() => router.push('/next-action')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  demoNotice: {
    backgroundColor: colors.sampleBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  demoNoticeTitle: {
    ...typography.caption,
    color: colors.sampleText,
    fontWeight: '700',
    marginBottom: 2,
  },
  demoNoticeBody: {
    ...typography.caption,
    color: colors.sampleText,
  },
  improvementsCard: {
    backgroundColor: colors.strongBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  improvementsTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  improvementItem: {
    ...typography.body,
    color: colors.textPrimary,
  },
  improvementsFootnote: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  claimBox: {
    backgroundColor: colors.sampleBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  claimText: {
    ...typography.subtitle,
    color: colors.indigoDark,
    textAlign: 'center',
  },
  group: {
    marginBottom: spacing.lg,
  },
  groupLabel: {
    ...typography.small,
    color: colors.textMuted,
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  noteBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  note: {
    ...typography.subtitle,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
