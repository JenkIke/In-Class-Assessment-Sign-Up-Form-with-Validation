import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function SignUpScreen() {
  const theme = useTheme();

  const inputStyle = [
    styles.input,
    {
      color: theme.text,
      backgroundColor: theme.backgroundElement,
      borderColor: theme.backgroundSelected,
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoider}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            <ThemedText type="subtitle" style={styles.title}>
              Create Account
            </ThemedText>

            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">First name</ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="Enter your first name"
                placeholderTextColor={theme.textSecondary}
                autoCapitalize="words"
                autoComplete="given-name"
              />
            </ThemedView>

            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">Last name</ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="Enter your last name"
                placeholderTextColor={theme.textSecondary}
                autoCapitalize="words"
                autoComplete="family-name"
              />
            </ThemedView>

            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">Email</ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="you@example.com"
                placeholderTextColor={theme.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
              />
            </ThemedView>

            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">Password</ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="At least 8 characters"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="new-password"
              />
            </ThemedView>

            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">Confirm password</ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="Re-enter your password"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="new-password"
              />
            </ThemedView>

            <Pressable
              accessibilityRole="button"
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
              <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
  },
  keyboardAvoider: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
  },
  title: {
    marginBottom: Spacing.two,
  },
  field: {
    gap: Spacing.one,
  },
  input: {
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + Spacing.one,
    fontSize: 16,
  },
  button: {
    marginTop: Spacing.two,
    backgroundColor: '#3c87f7',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 700,
  },
});
