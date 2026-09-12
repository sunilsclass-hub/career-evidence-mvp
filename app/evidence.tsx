import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { EvidenceCard } from '../src/components/EvidenceCard';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { SecondaryButton } from '../src/components/SecondaryButton';
import { SectionHeader } from '../src/components/SectionHeader';
import { mockEvidence } from '../src/data/mockEvidence';
import { colors } from '../src/theme/colors';
import { spacing, typography } from '../src/theme/spacing';

export default function EvidenceVaultScreen() {
  const router = useRouter();

  return (
    <Screen>
      <AppHeader showBack step="Step 2 of 4" />
      <SectionHeader title="What can you prove?" />
      <Text style={styles.explainer}>
        Evidence is work you have actually done — projects, reports,
        presentations, code, certificates or internship outputs.
      </Text>

      {mockEvidence.map((item) => (
        <EvidenceCard key={item.id} evidence={item} />
      ))}

      <View style={styles.addEvidence}>
        <SecondaryButton label="+ Add Evidence" onPress={() => {}} disabled />
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
    marginBottom: spacing.lg,
  },
  addEvidence: {
    marginBottom: spacing.lg,
  },
});
