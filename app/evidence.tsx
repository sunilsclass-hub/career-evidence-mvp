import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { EvidenceCard } from '../src/components/EvidenceCard';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { SecondaryButton } from '../src/components/SecondaryButton';
import { SectionHeader } from '../src/components/SectionHeader';
import { useEvidence } from '../src/state/EvidenceContext';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';

export default function EvidenceVaultScreen() {
  const router = useRouter();
  const { evidence, sampleEvidence, localEvidence, justAddedTitle, clearJustAdded } =
    useEvidence();

  useEffect(() => {
    return () => clearJustAdded();
  }, [clearJustAdded]);

  return (
    <Screen>
      <AppHeader showBack step="Step 2 of 4" />
      <SectionHeader title="What can you prove?" />
      <Text style={styles.explainer}>
        Evidence is work you have actually done — projects, reports,
        presentations, code, certificates or internship outputs.
      </Text>

      <Text style={styles.count}>
        {evidence.length} evidence {evidence.length === 1 ? 'item' : 'items'}{' '}
        ({localEvidence.length} yours, {sampleEvidence.length} sample)
      </Text>

      {justAddedTitle ? (
        <View style={styles.successBox}>
          <Text style={styles.successText}>
            Demo evidence added. Later this will be saved to your account.
          </Text>
        </View>
      ) : null}

      {localEvidence.length > 0 ? (
        <View style={styles.group}>
          <Text style={styles.groupLabel}>YOUR SAVED EVIDENCE</Text>
          {localEvidence.map((item) => (
            <EvidenceCard key={item.id} evidence={item} />
          ))}
        </View>
      ) : null}

      <View style={styles.group}>
        <Text style={styles.groupLabel}>SAMPLE EVIDENCE</Text>
        {sampleEvidence.map((item) => (
          <EvidenceCard key={item.id} evidence={item} />
        ))}
      </View>

      <View style={styles.addEvidence}>
        <SecondaryButton
          label="+ Add Evidence"
          onPress={() => router.push('/add-evidence')}
        />
      </View>

      <View style={styles.gapMapNote}>
        <Text style={styles.gapMapNoteText}>
          This demo map will update using simple rules based on your local
          evidence. Real AI review comes later.
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
