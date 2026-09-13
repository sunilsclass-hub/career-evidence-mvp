import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { competencyStatusLabel, type EvidenceReadinessSnapshot } from '../types/competency';

interface ReadinessSnapshotProps {
  snapshot: EvidenceReadinessSnapshot;
}

export function ReadinessSnapshot({ snapshot }: ReadinessSnapshotProps) {
  const stats: { label: string; value: number; color: string }[] = [
    { label: competencyStatusLabel.strong, value: snapshot.strongCount, color: colors.strong },
    { label: competencyStatusLabel.moderate, value: snapshot.moderateCount, color: colors.moderate },
    { label: competencyStatusLabel.weak, value: snapshot.weakCount, color: colors.weak },
    { label: competencyStatusLabel.missing, value: snapshot.criticalGapCount, color: colors.missing },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Evidence Readiness Snapshot</Text>

      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCell}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.disclaimer}>
        This assessment uses transparent rules, not a validated score.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  statCell: {
    minWidth: '40%',
    flexGrow: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  disclaimer: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});
