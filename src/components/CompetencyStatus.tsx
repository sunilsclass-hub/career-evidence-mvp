import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import type {
  CompetencyAssessment,
  CompetencyStatusLevel,
  EvidenceKind,
} from '../types/competency';

interface CompetencyStatusProps {
  competency: CompetencyAssessment;
}

const statusLabel: Record<CompetencyStatusLevel, string> = {
  strong: 'Strong evidence',
  moderate: 'Moderate evidence',
  weak: 'Weak evidence',
  missing: 'Missing evidence',
};

const statusTone: Record<CompetencyStatusLevel, { bg: string; text: string }> = {
  strong: { bg: colors.strongBg, text: colors.strong },
  moderate: { bg: colors.moderateBg, text: colors.moderate },
  weak: { bg: colors.weakBg, text: colors.weak },
  missing: { bg: colors.missingBg, text: colors.missing },
};

const evidenceKindLabel: Record<EvidenceKind, string> = {
  project: 'Project-based',
  certificate: 'Certificate-based',
  presentation: 'Presentation-based',
  coursework: 'Coursework-based',
  none: 'No evidence yet',
};

export function CompetencyStatus({ competency }: CompetencyStatusProps) {
  const [expanded, setExpanded] = useState(false);
  const tone = statusTone[competency.status];

  return (
    <Pressable
      onPress={() => setExpanded((prev) => !prev)}
      style={styles.row}
      accessibilityRole="button"
      accessibilityLabel={`${competency.skill}, ${statusLabel[competency.status]}`}
    >
      <View style={styles.mainRow}>
        <View style={[styles.dot, { backgroundColor: tone.text }]} />
        <Text style={styles.skill}>{competency.skill}</Text>
        <View style={[styles.pill, { backgroundColor: tone.bg }]}>
          <Text style={[styles.pillText, { color: tone.text }]}>
            {statusLabel[competency.status]}
          </Text>
        </View>
      </View>
      <Text style={styles.evidenceKind}>
        {evidenceKindLabel[competency.evidenceKind]}
        {competency.supportingEvidence ? ` · ${competency.supportingEvidence}` : ''}
      </Text>
      {expanded ? <Text style={styles.reason}>{competency.reason}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  skill: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
    fontWeight: '600',
  },
  pill: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  pillText: {
    ...typography.small,
  },
  evidenceKind: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginLeft: spacing.md + 8,
  },
  reason: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginLeft: spacing.md + 8,
  },
});
