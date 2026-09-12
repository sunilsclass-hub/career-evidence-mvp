import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { CompetencyStatus } from '../src/components/CompetencyStatus';
import { EvidenceLogicBox } from '../src/components/EvidenceLogicBox';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { ReadinessSnapshot } from '../src/components/ReadinessSnapshot';
import { Screen } from '../src/components/Screen';
import { SectionHeader } from '../src/components/SectionHeader';
import { mockGapMap, mockReadinessSnapshot } from '../src/data/mockGapMap';
import { mockTargetJob } from '../src/data/mockTargetJob';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';
import type { CompetencyStatusLevel } from '../src/types/competency';

const groupOrder: { level: CompetencyStatusLevel; label: string }[] = [
  { level: 'strong', label: 'Strong evidence' },
  { level: 'moderate', label: 'Moderate evidence' },
  { level: 'weak', label: 'Weak evidence' },
  { level: 'missing', label: 'Missing evidence' },
];

export default function GapMapScreen() {
  const router = useRouter();

  return (
    <Screen>
      <AppHeader showBack step="Step 3 of 4" />
      <SectionHeader
        title="Your evidence vs. your target role"
        subtitle={`Target: ${mockTargetJob.role}`}
      />

      <ReadinessSnapshot snapshot={mockReadinessSnapshot} />

      <View style={styles.claimBox}>
        <Text style={styles.claimText}>
          Your CV may claim a skill. This map asks: what proof supports it?
        </Text>
      </View>

      {groupOrder.map(({ level, label }) => {
        const items = mockGapMap.filter((c) => c.status === level);
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
