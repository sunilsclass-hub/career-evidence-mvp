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
import { findRoleById } from '../src/data/roleLibrary';
import { useEvidence } from '../src/state/EvidenceContext';
import { useTargetJob } from '../src/state/TargetJobContext';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';
import { competencyStatusLabel, type CompetencyStatusLevel } from '../src/types/competency';
import { buildDemoGapMap, buildReadinessSnapshot } from '../src/utils/buildDemoGapMap';

const groupOrder: CompetencyStatusLevel[] = ['strong', 'moderate', 'weak', 'missing'];

export default function GapMapScreen() {
  const router = useRouter();
  const { evidence } = useEvidence();
  const { targetJob } = useTargetJob();

  const selectedRole = useMemo(() => findRoleById(targetJob.roleId), [targetJob.roleId]);

  const { gapMap, improvements } = useMemo(() => {
    if (!selectedRole) return { gapMap: [], improvements: [] };
    return buildDemoGapMap(selectedRole.competencies, evidence);
  }, [selectedRole, evidence]);

  const readinessSnapshot = useMemo(() => buildReadinessSnapshot(gapMap), [gapMap]);

  if (!selectedRole) {
    return (
      <Screen>
        <AppHeader showBack step="Step 3 of 4" />
        <SectionHeader
          title="Your evidence vs. your target role"
          subtitle={`Target: ${targetJob.role || 'Not set'}`}
        />

        <View style={styles.roleNotice}>
          <Text style={styles.roleNoticeText}>
            This role isn&apos;t in the library yet, so there&apos;s nothing
            to score against. Tell us the role in the feedback form and
            we&apos;ll add it.
          </Text>
        </View>

        <PrimaryButton
          label="Show Me What To Do Next"
          onPress={() => router.push('/next-action')}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <AppHeader showBack step="Step 3 of 4" />
      <SectionHeader
        title="Your evidence vs. your target role"
        subtitle={`Target: ${targetJob.role}`}
      />

      <ReadinessSnapshot snapshot={readinessSnapshot} />

      {improvements.length > 0 ? (
        <View style={styles.improvementsCard}>
          <Text style={styles.improvementsTitle}>
            Updated from your demo evidence
          </Text>
          {improvements.map((improvement) => (
            <Text key={improvement.skill} style={styles.improvementItem}>
              • {improvement.skill} moved from{' '}
              {competencyStatusLabel[improvement.from]} to{' '}
              {competencyStatusLabel[improvement.to]}
            </Text>
          ))}
          <Text style={styles.improvementsFootnote}>
            This assessment uses transparent rules. You can see exactly why
            each skill is rated the way it is.
          </Text>
        </View>
      ) : null}

      <View style={styles.claimBox}>
        <Text style={styles.claimText}>
          Your CV may claim a skill. This map asks: what proof supports it?
        </Text>
      </View>

      {groupOrder.map((level) => {
        const items = gapMap.filter((c) => c.status === level);
        if (items.length === 0) return null;
        return (
          <View key={level} style={styles.group}>
            <Text style={styles.groupLabel}>
              {competencyStatusLabel[level].toUpperCase()}
            </Text>
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
  roleNotice: {
    backgroundColor: colors.sampleBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  roleNoticeText: {
    ...typography.caption,
    color: colors.sampleText,
    textAlign: 'center',
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
