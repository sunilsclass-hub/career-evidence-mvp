import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../theme/colors';
import { typography } from '../theme/spacing';

interface TextButtonProps {
  label: string;
  onPress: () => void;
}

export function TextButton({ label, onPress }: TextButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={8}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.caption,
    color: colors.textMuted,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
