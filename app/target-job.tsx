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
import {
  facultyOrder,
  findRoleById,
  OTHER_ROLE_ID,
  rolesByFaculty,
} from '../src/data/roleLibrary';
import { useEvidence } from '../src/state/EvidenceContext';
import { useTargetJob } from '../src/state/TargetJobContext';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';

const NO_ROLE_YET = '';

export default function TargetJobScreen() {
  const router = useRouter();
  const { targetJob, setTargetJob } = useTargetJob();
  const { syncSampleEvidenceForRole } = useEvidence();

  const initialFaculty =
    targetJob.roleId === OTHER_ROLE_ID
      ? null
      : (findRoleById(targetJob.roleId)?.faculty ?? null);

  const [faculty, setFaculty] = useState<string | null>(initialFaculty);
  const [roleId, setRoleId] = useState<string>(targetJob.roleId || NO_ROLE_YET);
  const [customRole, setCustomRole] = useState(
    targetJob.roleId === OTHER_ROLE_ID ? targetJob.role : '',
  );
  const [company, setCompany] = useState(targetJob.company ?? '');
  const [jobDescription, setJobDescription] = useState(targetJob.jobDescription);

  const rolesInFaculty = useMemo(
    () => (faculty ? rolesByFaculty(faculty) : []),
    [faculty],
  );

  const canAnalyse = useMemo(() => {
    if (roleId === OTHER_ROLE_ID) return customRole.trim().length > 0;
    return roleId !== NO_ROLE_YET;
  }, [roleId, customRole]);

  const selectFaculty = (nextFaculty: string) => {
    setFaculty(nextFaculty);
    setRoleId(NO_ROLE_YET);
  };

  const selectOther = () => {
    setFaculty(null);
    setRoleId(OTHER_ROLE_ID);
  };

  const handleResetSample = () => {
    setFaculty(findRoleById(mockTargetJob.roleId)?.faculty ?? null);
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
        <Text style={styles.label}>Faculty</Text>
        <View style={styles.chipGrid}>
          {facultyOrder.map((option) => {
            const selected = faculty === option && roleId !== OTHER_ROLE_ID;
            return (
              <Pressable
                key={option}
                onPress={() => selectFaculty(option)}
                accessibilityRole="button"
                accessibilityLabel={option}
                style={[styles.chip, selected && styles.chipSelected]}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                  {option}
                </Text>
              </Pressable>
            );
          })}
          <Pressable
            onPress={selectOther}
            accessibilityRole="button"
            accessibilityLabel="Other (type your own)"
            style={[styles.chip, roleId === OTHER_ROLE_ID && styles.chipSelected]}
          >
            <Text
              style={[styles.chipText, roleId === OTHER_ROLE_ID && styles.chipTextSelected]}
            >
              Other (type your own)
            </Text>
          </Pressable>
        </View>
      </View>

      {faculty && roleId !== OTHER_ROLE_ID ? (
        <View style={styles.field}>
          <Text style={styles.label}>Role</Text>
          <View style={styles.chipGrid}>
            {rolesInFaculty.map((role) => {
              const selected = role.id === roleId;
              return (
                <Pressable
                  key={role.id}
                  onPress={() => setRoleId(role.id)}
                  accessibilityRole="button"
                  accessibilityLabel={role.label}
                  style={[styles.chip, selected && styles.chipSelected]}
                >
                  <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                    {role.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : null}

      {roleId === OTHER_ROLE_ID ? (
        <View style={styles.field}>
          <Text style={styles.label}>Your target role</Text>
          <TextInput
            style={styles.input}
            value={customRole}
            onChangeText={setCustomRole}
            placeholder="Type the role you're aiming for"
            placeholderTextColor={colors.textMuted}
          />
        </View>
      ) : null}

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
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chipSelected: {
    backgroundColor: colors.indigo,
    borderColor: colors.indigo,
  },
  chipText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  chipTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },
  resetRow: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
});
