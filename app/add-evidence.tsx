import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppHeader } from '../src/components/AppHeader';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { Screen } from '../src/components/Screen';
import { SectionHeader } from '../src/components/SectionHeader';
import { useEvidence } from '../src/state/EvidenceContext';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/spacing';
import type { EvidenceType } from '../src/types/evidence';

const evidenceTypes: EvidenceType[] = [
  'Project',
  'Coursework',
  'Presentation',
  'Certificate',
  'Internship output',
  'Other',
];

export default function AddEvidenceScreen() {
  const router = useRouter();
  const { addEvidence } = useEvidence();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<EvidenceType | null>(null);
  const [description, setDescription] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [strengthNote, setStrengthNote] = useState('');
  const [hasOutput, setHasOutput] = useState(false);

  const canSave = useMemo(() => title.trim().length > 0 && type !== null, [title, type]);

  const handleSave = () => {
    if (!canSave || !type) return;
    const skills = skillsInput
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    addEvidence({
      title: title.trim(),
      type,
      description: description.trim(),
      skills,
      strengthNote: strengthNote.trim(),
      hasOutput,
    });

    router.back();
  };

  return (
    <Screen>
      <AppHeader showBack />
      <SectionHeader title="Add evidence" />
      <Text style={styles.explainer}>
        Add work you have genuinely done. Later, AI will help analyse it — but
        it will not invent evidence.
      </Text>

      <View style={styles.field}>
        <Text style={styles.label}>Evidence title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Retail Churn Analysis"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Evidence type</Text>
        <View style={styles.typeGrid}>
          {evidenceTypes.map((option) => {
            const selected = option === type;
            return (
              <Pressable
                key={option}
                onPress={() => setType(option)}
                accessibilityRole="button"
                accessibilityLabel={option}
                style={[styles.typeChip, selected && styles.typeChipSelected]}
              >
                <Text
                  style={[styles.typeChipText, selected && styles.typeChipTextSelected]}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Short description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={description}
          onChangeText={setDescription}
          placeholder="What did you do, and what was the outcome?"
          placeholderTextColor={colors.textMuted}
          multiline
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Skills demonstrated</Text>
        <TextInput
          style={styles.input}
          value={skillsInput}
          onChangeText={setSkillsInput}
          placeholder="e.g. Python, statistics, data cleaning"
          placeholderTextColor={colors.textMuted}
        />
        <Text style={styles.hint}>Separate skills with commas.</Text>
        <Text style={styles.hint}>
          Try adding: Python, statistics, data cleaning, business
          interpretation
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Evidence strength note</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={strengthNote}
          onChangeText={setStrengthNote}
          placeholder="What makes this evidence real? Example: dataset, code, presentation, certificate, faculty feedback, result, link, output."
          placeholderTextColor={colors.textMuted}
          multiline
        />
      </View>

      <Pressable
        onPress={() => setHasOutput((prev) => !prev)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: hasOutput }}
        accessibilityLabel="Is there something you could actually show someone?"
        style={styles.checkboxField}
      >
        <View style={[styles.checkbox, hasOutput && styles.checkboxChecked]}>
          {hasOutput ? <Text style={styles.checkboxMark}>✓</Text> : null}
        </View>
        <View style={styles.checkboxTextGroup}>
          <Text style={styles.checkboxLabel}>
            Is there something you could actually show someone?
          </Text>
          <Text style={styles.checkboxSubLabel}>
            Code, a report, a dashboard, slides, a link, a document.
          </Text>
        </View>
      </Pressable>
      <Text style={styles.hint}>
        Evidence you can show is rated more strongly than evidence you can
        only describe.
      </Text>

      <View style={styles.warningBox}>
        <Text style={styles.warningText}>
          Unsupported claims will remain unverified.
        </Text>
      </View>

      <PrimaryButton
        label="Save Evidence"
        onPress={handleSave}
        disabled={!canSave}
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
    minHeight: 90,
    textAlignVertical: 'top',
  },
  hint: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  typeChip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  typeChipSelected: {
    backgroundColor: colors.indigo,
    borderColor: colors.indigo,
  },
  typeChipText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  typeChipTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },
  checkboxField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.indigo,
    borderColor: colors.indigo,
  },
  checkboxMark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  checkboxTextGroup: {
    flex: 1,
  },
  checkboxLabel: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  checkboxSubLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  warningBox: {
    backgroundColor: colors.weakBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  warningText: {
    ...typography.caption,
    color: colors.weak,
    textAlign: 'center',
    fontWeight: '600',
  },
});
