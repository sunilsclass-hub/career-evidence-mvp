import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { EvidenceCard } from '../src/components/EvidenceCard';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { SecondaryButton } from '../src/components/SecondaryButton';
import { SectionHeader } from '../src/components/SectionHeader';
import { TextButton } from '../src/components/TextButton';
import { useEvidence } from '../src/state/EvidenceContext';
import { useTargetJob } from '../src/state/TargetJobContext';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';

export default function EvidenceVaultScreen() {
  const router = useRouter();
  const {
    evidence,
    sampleEvidence,
    localEvidence,
    justAddedTitle,
    clearJustAdded,
    resetDemoEvidence,
  } = useEvidence();
  const { targetJob, resetAll } = useTargetJob();

  const handleResetEverything = () => {
    resetDemoEvidence();
    resetAll();
  };

  const showResetEverything = localEvidence.length > 0 || !targetJob.isSample;

  useEffect(() => {
    return () => clearJustAdded();
  }, [clearJustAdded]);

  const isEmpty = evidence.length === 0;

  return (
    <Screen>
      <AppHeader showBack step="Step 2 of 4" />
      <SectionHeader title="What can you prove?" />
      <Text style={styles.explainer}>
        Evidence is work you have actually done — projects, reports,
        presentations, code, certificates or internship outputs.
      </Text>

      {!isEmpty ? (
        <Text style={styles.count}>
          {evidence.length} evidence {evidence.length === 1 ? 'item' : 'items'}{' '}
          ({localEvidence.length} yours, {sampleEvidence.length} sample)
        </Text>
      ) : null}

      {justAddedTitle ? (
        <View style={styles.successBox}>
          <Text style={styles.successText}>
            Demo evidence added. Later this will be saved to your account.
          </Text>
        </View>
      ) : null}

      {isEmpty ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No evidence yet. Add the first thing you&apos;ve actually done
            for this role.
          </Text>
        </View>
      ) : (
        <>
          {localEvidence.length > 0 ? (
            <View style={styles.group}>
              <Text style={styles.groupLabel}>YOUR SAVED EVIDENCE</Text>
              {localEvidence.map((item) => (
                <EvidenceCard key={item.id} evidence={item} />
              ))}
            </View>
          ) : null}

          {sampleEvidence.length > 0 ? (
            <View style={styles.group}>
              <Text style={styles.groupLabel}>SAMPLE EVIDENCE</Text>
              {sampleEvidence.map((item) => (
                <EvidenceCard key={item.id} evidence={item} />
              ))}
            </View>
          ) : null}
        </>
      )}

      <View style={styles.addEvidence}>
        <SecondaryButton
          label="+ Add Evidence"
          onPress={() => router.push('/add-evidence')}
        />
      </View>

      {showResetEverything ? (
        <View style={styles.resetRow}>
          <TextButton label="Reset everything" onPress={handleResetEverything} />
        </View>
      ) : null}

      <View style={styles.gapMapNote}>
        <Text style={styles.gapMapNoteText}>
          This assessment uses transparent rules. You can see exactly why
          each skill is rated the way it is.
        </Text>
      </View>

      <PrimaryButton
        label="Build My Evidence Map"
        onPress={() => router.push('/gap-map')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  explainer: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  count: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  successBox: {
    backgroundColor: colors.successBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  successText: {
    ...typography.caption,
    color: colors.success,
    textAlign: 'center',
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  emptyStateText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  group: {
    marginBottom: spacing.md,
  },
  groupLabel: {
    ...typography.small,
    color: colors.textMuted,
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  addEvidence: {
    marginBottom: spacing.lg,
  },
  resetRow: {
    marginBottom: spacing.lg,
  },
  gapMapNote: {
    backgroundColor: colors.sampleBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  gapMapNoteText: {
    ...typography.caption,
    color: colors.sampleText,
    textAlign: 'center',
  },
});
