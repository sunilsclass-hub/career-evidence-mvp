import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { SectionHeader } from '../src/components/SectionHeader';
import { StatusBadge } from '../src/components/StatusBadge';
import { mockTargetJob } from '../src/data/mockTargetJob';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';

export default function TargetJobScreen() {
  const router = useRouter();

  return (
    <Screen>
      <AppHeader showBack step="Step 1 of 4" />
      <SectionHeader title="What role are you aiming for?" />

      {mockTargetJob.isSample ? (
        <View style={styles.sampleRow}>
          <StatusBadge label="Sample data" tone="sample" />
        </View>
      ) : null}

      <View style={styles.field}>
        <Text style={styles.label}>Target role</Text>
        <TextInput
          style={styles.input}
          defaultValue={mockTargetJob.role}
          editable={false}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Company (optional)</Text>
        <TextInput
          style={styles.input}
          defaultValue={mockTargetJob.company}
          editable={false}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Job description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          defaultValue={mockTargetJob.jobDescription}
          editable={false}
          multiline
        />
      </View>

      <PrimaryButton
        label="Analyse My Target"
        onPress={() => router.push('/evidence')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  sampleRow: {
    marginBottom: spacing.md,
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  multiline: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
});
