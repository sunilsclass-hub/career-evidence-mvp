import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { colors } from '../theme/colors';
import { spacing, typography } from '../theme/spacing';

interface AppHeaderProps {
  showBack?: boolean;
  step?: string;
}

export function AppHeader({ showBack = false, step }: AppHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack && router.canGoBack() ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            hitSlop={12}
            style={styles.backButton}
          >
            <Text style={styles.backText}>‹ Back</Text>
          </Pressable>
        ) : (
          <Text style={styles.brand}>Career Evidence</Text>
        )}
      </View>
      {step ? <Text style={styles.step}>{step}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brand: {
    ...typography.subtitle,
    color: colors.indigo,
  },
  backButton: {
    paddingVertical: spacing.xs,
  },
  backText: {
    ...typography.body,
    color: colors.indigo,
    fontWeight: '600',
  },
  step: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
