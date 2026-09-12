import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import type { EvidenceItem } from '../types/evidence';
import { StatusBadge } from './StatusBadge';

interface EvidenceCardProps {
  evidence: EvidenceItem;
}

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.type}>{evidence.type.toUpperCase()}</Text>
        {evidence.isSample ? <StatusBadge label="Sample" tone="sample" /> : null}
      </View>
      <Text style={styles.title}>{evidence.title}</Text>
      <Text style={styles.demonstratesLabel}>Demonstrates</Text>
      <View style={styles.chipRow}>
        {evidence.demonstrates.map((skill) => (
          <View key={skill} style={styles.chip}>
            <Text style={styles.chipText}>{skill}</Text>
          </View>
        ))}
      </View>
      {evidence.note ? <Text style={styles.note}>{evidence.note}</Text> : null}
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
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  type: {
    ...typography.small,
    color: colors.textMuted,
    letterSpacing: 0.6,
  },
  title: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  demonstratesLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  chipText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  note: {
    ...typography.caption,
    color: colors.weak,
    marginTop: spacing.sm,
  },
});
