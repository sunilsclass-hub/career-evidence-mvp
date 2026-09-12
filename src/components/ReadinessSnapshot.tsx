import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import type { EvidenceReadinessSnapshot } from '../types/competency';
import { StatusBadge } from './StatusBadge';

interface ReadinessSnapshotProps {
  snapshot: EvidenceReadinessSnapshot;
}

export function ReadinessSnapshot({ snapshot }: ReadinessSnapshotProps) {
  const stats: { label: string; value: number; color: string }[] = [
    { label: 'Strongly evidenced', value: snapshot.strongCount, color: colors.strong },
    { label: 'Partially evidenced', value: snapshot.moderateCount, color: colors.moderate },
    { label: 'Weakly evidenced', value: snapshot.weakCount, color: colors.weak },
    { label: 'Critical gaps', value: snapshot.criticalGapCount, color: colors.missing },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Evidence Readiness Snapshot</Text>
        <StatusBadge label="Demo analysis" tone="sample" />
      </View>

      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCell}>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.disclaimer}>
        This is a demo analysis of sample data, not a validated or scientific
        score.
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  title: {
    ...typography.subtitle,
    color: colors.textPrimary,
    flexShrink: 1,
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
