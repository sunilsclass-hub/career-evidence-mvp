import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
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
          Your degree shows what you studied.{'\n'}
          Show what you can actually do.
        </Text>

        <Text style={styles.credibility}>
          Built by Dr. D Sunil Kumar, Professor &amp; Dean (Students&apos;
          Welfare), JSS AHER
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
        label="See what I can prove"
        onPress={() => router.push('/target-job')}
      />

      <Text style={styles.privacyNotice}>
        Nothing you enter is saved or sent anywhere. This runs entirely on
        your device.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.xl,
  },
  headline: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  credibility: {
    ...typography.caption,
    color: colors.textMuted,
  },
  steps: {
    gap: spacing.md,
    marginTop: spacing.md,
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
  privacyNotice: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
