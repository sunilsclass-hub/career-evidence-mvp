import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';

type BadgeTone = 'sample' | 'success';

interface StatusBadgeProps {
  label: string;
  tone?: BadgeTone;
}

const toneStyles: Record<BadgeTone, { bg: string; text: string }> = {
  sample: { bg: colors.sampleBg, text: colors.sampleText },
  success: { bg: colors.successBg, text: colors.success },
};

export function StatusBadge({ label, tone = 'sample' }: StatusBadgeProps) {
  const { bg, text } = toneStyles[tone];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  label: {
    ...typography.small,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
});
