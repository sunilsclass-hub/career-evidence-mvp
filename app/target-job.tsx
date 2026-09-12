import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { SectionHeader } from '../src/components/SectionHeader';
import { StatusBadge } from '../src/components/StatusBadge';
import { TextButton } from '../src/components/TextButton';
import { mockTargetJob } from '../src/data/mockTargetJob';
import { useTargetJob } from '../src/state/TargetJobContext';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';

export default function TargetJobScreen() {
  const router = useRouter();
  const { targetJob, setTargetJob } = useTargetJob();

  const [role, setRole] = useState(targetJob.role);
  const [company, setCompany] = useState(targetJob.company ?? '');
  const [jobDescription, setJobDescription] = useState(targetJob.jobDescription);

  const handleResetSample = () => {
    setRole(mockTargetJob.role);
    setCompany(mockTargetJob.company ?? '');
    setJobDescription(mockTargetJob.jobDescription);
  };

  const handleAnalyse = () => {
    setTargetJob({
      role: role.trim(),
      company: company.trim() || undefined,
      jobDescription: jobDescription.trim(),
      isSample: false,
    });
    router.push('/evidence');
  };

  return (
    <Screen>
      <AppHeader showBack step="Step 1 of 4" />
      <SectionHeader title="What role are you aiming for?" />

      <View style={styles.sampleRow}>
        <StatusBadge label="Prefilled with sample data" tone="sample" />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Target role</Text>
        <TextInput
          style={styles.input}
          value={role}
          onChangeText={setRole}
          placeholder="e.g. Data Analyst"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Company (optional)</Text>
        <TextInput
          style={styles.input}
          value={company}
          onChangeText={setCompany}
          placeholder="e.g. Example Consulting Company"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Job description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={jobDescription}
          onChangeText={setJobDescription}
          placeholder="Paste or write the job description"
          placeholderTextColor={colors.textMuted}
          multiline
        />
      </View>

      <View style={styles.resetRow}>
        <TextButton label="Reset Sample" onPress={handleResetSample} />
      </View>

      <PrimaryButton label="Analyse My Target" onPress={handleAnalyse} />
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
  resetRow: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
});
