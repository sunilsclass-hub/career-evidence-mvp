import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { colors } from '../src/theme/colors';
import { spacing, typography } from '../src/theme/spacing';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen scroll={false}>
      <AppHeader />
      <View style={styles.body}>
        <Text style={styles.headline}>
          Your degree shows what you studied.{'\n'}Show what you can
          actually do.
        </Text>

        <View style={styles.points}>
          <Text style={styles.point}>• Choose the career you want</Text>
          <Text style={styles.point}>
            • Provide genuine evidence of your work
          </Text>
          <Text style={styles.point}>
            • Discover what you can already prove
          </Text>
          <Text style={styles.point}>
            • Identify what evidence is missing
          </Text>
        </View>
      </View>

      <PrimaryButton
        label="Start My Career Evidence"
        onPress={() => router.push('/target-job')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  headline: {
    ...typography.headline,
    color: colors.textPrimary,
  },
  points: {
    gap: spacing.sm,
  },
  point: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
