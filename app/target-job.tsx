import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { SectionHeader } from '../src/components/SectionHeader';
import { StatusBadge } from '../src/components/StatusBadge';
import { TextButton } from '../src/components/TextButton';
import { mockTargetJob } from '../src/data/mockTargetJob';
import { findRoleById, OTHER_ROLE_ID, roleLibrary } from '../src/data/roleLibrary';
import { useEvidence } from '../src/state/EvidenceContext';
import { useTargetJob } from '../src/state/TargetJobContext';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';

export default function TargetJobScreen() {
  const router = useRouter();
  const { targetJob, setTargetJob } = useTargetJob();
  const { syncSampleEvidenceForRole } = useEvidence();

  const [roleId, setRoleId] = useState(targetJob.roleId);
  const [customRole, setCustomRole] = useState(
    targetJob.roleId === OTHER_ROLE_ID ? targetJob.role : '',
  );
  const [company, setCompany] = useState(targetJob.company ?? '');
  const [jobDescription, setJobDescription] = useState(targetJob.jobDescription);

  const canAnalyse = useMemo(
    () => roleId !== OTHER_ROLE_ID || customRole.trim().length > 0,
    [roleId, customRole],
  );

  const handleResetSample = () => {
    setRoleId(mockTargetJob.roleId);
    setCustomRole('');
    setCompany(mockTargetJob.company ?? '');
    setJobDescription(mockTargetJob.jobDescription);
  };

  const handleAnalyse = () => {
    if (!canAnalyse) return;
    const role =
      roleId === OTHER_ROLE_ID ? customRole.trim() : (findRoleById(roleId)?.label ?? '');

    setTargetJob({
      roleId,
      role,
      company: company.trim() || undefined,
      jobDescription: jobDescription.trim(),
      isSample: false,
    });
    syncSampleEvidenceForRole(roleId);
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
        <View style={styles.roleGrid}>
          {roleLibrary.map((role) => {
            const selected = role.id === roleId;
            return (
              <Pressable
                key={role.id}
                onPress={() => setRoleId(role.id)}
                accessibilityRole="button"
                accessibilityLabel={role.label}
                style={[styles.roleChip, selected && styles.roleChipSelected]}
              >
                <Text
                  style={[styles.roleChipText, selected && styles.roleChipTextSelected]}
                >
                  {role.label}
                </Text>
              </Pressable>
            );
          })}
          <Pressable
            onPress={() => setRoleId(OTHER_ROLE_ID)}
            accessibilityRole="button"
            accessibilityLabel="Other (type your own)"
            style={[styles.roleChip, roleId === OTHER_ROLE_ID && styles.roleChipSelected]}
          >
            <Text
              style={[
                styles.roleChipText,
                roleId === OTHER_ROLE_ID && styles.roleChipTextSelected,
              ]}
            >
              Other (type your own)
            </Text>
          </Pressable>
        </View>

        {roleId === OTHER_ROLE_ID ? (
          <TextInput
            style={[styles.input, styles.customRoleInput]}
            value={customRole}
            onChangeText={setCustomRole}
            placeholder="Type the role you're aiming for"
            placeholderTextColor={colors.textMuted}
          />
        ) : null}
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

      <PrimaryButton
        label="Analyse My Target"
        onPress={handleAnalyse}
        disabled={!canAnalyse}
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
  roleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  roleChip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  roleChipSelected: {
    backgroundColor: colors.indigo,
    borderColor: colors.indigo,
  },
  roleChipText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  roleChipTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },
  customRoleInput: {
    marginTop: spacing.xs,
  },
  resetRow: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
});
