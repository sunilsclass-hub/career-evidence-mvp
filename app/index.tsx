import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { SecondaryButton } from '../src/components/SecondaryButton';
import { colors } from '../src/theme/colors';
import { spacing, typography } from '../src/theme/spacing';

const steps = [
  'Choose a target role',
  'Add genuine evidence',
  'See evidence gaps',
  'Build the next proof',
];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen>
      <AppHeader />
      <View style={styles.body}>
        <Text style={styles.headline}>
          Your degree shows what you studied.{'\n'}Show what you can
          actually do.
        </Text>

        <View style={styles.steps}>
          {steps.map((step, index) => (
            <View key={step} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>

      <PrimaryButton
        label="Start My Career Evidence"
        onPress={() => router.push('/target-job')}
      />

      <View style={styles.facilitatorRow}>
        <SecondaryButton
          label="Open Pilot Guide"
          onPress={() => router.push('/pilot-guide')}
        />
        <Text style={styles.facilitatorHint}>For facilitator</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: spacing.xl,
    paddingVertical: spacing.xl,
  },
  headline: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  steps: {
    gap: spacing.md,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.indigo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '700',
  },
  stepText: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  facilitatorRow: {
    marginTop: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  facilitatorHint: {
    ...typography.small,
    color: colors.textMuted,
  },
});
