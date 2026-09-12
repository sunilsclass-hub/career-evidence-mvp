import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';

const principles = [
  'Project evidence is stronger than a certificate alone.',
  'Evidence linked to an output or outcome is stronger than a vague claim.',
  'Recent, specific, role-relevant evidence is stronger.',
  'Unsupported claims remain unverified.',
];

export function EvidenceLogicBox() {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <Pressable
        onPress={() => setExpanded((prev) => !prev)}
        accessibilityRole="button"
        accessibilityLabel="How this demo thinks about evidence"
        style={styles.headerRow}
        hitSlop={8}
      >
        <Text style={styles.title}>How this demo thinks about evidence</Text>
        <Text style={styles.toggle}>{expanded ? '−' : '+'}</Text>
      </Pressable>

      {expanded ? (
        <View style={styles.body}>
          {principles.map((principle) => (
            <Text key={principle} style={styles.principle}>
              • {principle}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.subtitle,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  toggle: {
    ...typography.title,
    color: colors.indigo,
  },
  body: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  principle: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
