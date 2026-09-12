import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { SectionHeader } from '../src/components/SectionHeader';
import { StatusBadge } from '../src/components/StatusBadge';
import { mockNextAction } from '../src/data/mockNextAction';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';

export default function NextActionScreen() {
  const [added, setAdded] = useState(false);

  return (
    <Screen>
      <AppHeader showBack step="Step 4 of 4" />
      <SectionHeader title="Your best next move" />

      <View style={styles.card}>
        <Text style={styles.headline}>{mockNextAction.headline}</Text>
      </View>

      <Text style={styles.blockLabel}>PROJECT</Text>
      <Text style={styles.body}>{mockNextAction.project}</Text>

      <Text style={styles.blockLabel}>DEMONSTRATE</Text>
      {mockNextAction.demonstrate.map((item) => (
        <Text key={item} style={styles.listItem}>
          • {item}
        </Text>
      ))}

      <Text style={styles.blockLabel}>UPLOAD AS EVIDENCE</Text>
      {mockNextAction.uploadAs.map((item) => (
        <Text key={item} style={styles.listItem}>
          • {item}
        </Text>
      ))}

      <Text style={styles.explainer}>
        When you add this evidence, your Career Evidence Map can be
        reassessed.
      </Text>

      <View style={styles.strengthensCard}>
        <Text style={styles.strengthensLabel}>This action strengthens:</Text>
        <View style={styles.chipRow}>
          {mockNextAction.strengthens.map((skill) => (
            <View key={skill} style={styles.chip}>
              <Text style={styles.chipText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      {added ? (
        <View style={styles.successRow}>
          <StatusBadge label="Added to your demo action plan" tone="success" />
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  headline: {
    ...typography.subtitle,
    color: colors.indigoDark,
  },
  blockLabel: {
    ...typography.small,
    color: colors.textMuted,
    letterSpacing: 0.6,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  body: {
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
  strengthensCard: {
    backgroundColor: colors.strongBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  strengthensLabel: {
    ...typography.caption,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  chipText: {
    ...typography.caption,
    color: colors.strong,
    fontWeight: '600',
  },
  successRow: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
});
