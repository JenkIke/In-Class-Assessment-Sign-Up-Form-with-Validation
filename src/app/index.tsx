// Import Statements
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { signUpSchema, type SignUpFormData } from "@/schemas/sign-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sign Up Screen logic, handles colour, form control, submitting the form, style, confirmation of name and email
// Sign-up form screen
export default function SignUpScreen() {
  const theme = useTheme();

  // Set up react-hook-form and validate it with the Zod schema
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Runs only when the form is valid: log name and email, then go to confirmation
  const onSubmit = (data: SignUpFormData) => {
    console.log({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
    router.push({
      pathname: "/confirmation",
      params: { firstName: data.firstName },
    });
  };

  // Shared input style using the current theme colours
  const inputStyle = [
    styles.input,
    {
      color: theme.text,
      backgroundColor: theme.backgroundElement,
      borderColor: theme.backgroundSelected,
    },
  ];

  // Layout, keeps content inside safe area, heading, IOS subtle annoyances, scrollable
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Keeps the keyboard from covering the inputs and lets the form scroll */}
        <KeyboardAvoidingView
          style={styles.keyboardAvoider}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <ThemedText type="subtitle" style={styles.title}>
              Create Account
            </ThemedText>

            {/* First name input, with its error message shown below if invalid */}
            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">First name</ThemedText>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[inputStyle, errors.firstName && styles.inputError]}
                    placeholder="Enter your first name"
                    placeholderTextColor={theme.textSecondary}
                    autoCapitalize="words"
                    autoComplete="given-name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.firstName && (
                <ThemedText type="small" style={styles.errorText}>
                  {errors.firstName.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Last name input */}
            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">Last name</ThemedText>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[inputStyle, errors.lastName && styles.inputError]}
                    placeholder="Enter your last name"
                    placeholderTextColor={theme.textSecondary}
                    autoCapitalize="words"
                    autoComplete="family-name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.lastName && (
                <ThemedText type="small" style={styles.errorText}>
                  {errors.lastName.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Email input with the email keyboard */}
            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">Email</ThemedText>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[inputStyle, errors.email && styles.inputError]}
                    placeholder="you@example.com"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.email && (
                <ThemedText type="small" style={styles.errorText}>
                  {errors.email.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Password input, text hidden */}
            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">Password</ThemedText>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[inputStyle, errors.password && styles.inputError]}
                    placeholder="At least 8 characters"
                    placeholderTextColor={theme.textSecondary}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="new-password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.password && (
                <ThemedText type="small" style={styles.errorText}>
                  {errors.password.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Confirm password input, text hidden */}
            <ThemedView style={styles.field}>
              <ThemedText type="smallBold">Confirm password</ThemedText>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      inputStyle,
                      errors.confirmPassword && styles.inputError,
                    ]}
                    placeholder="Re-enter your password"
                    placeholderTextColor={theme.textSecondary}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="new-password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.confirmPassword && (
                <ThemedText type="small" style={styles.errorText}>
                  {errors.confirmPassword.message}
                </ThemedText>
              )}
            </ThemedView>

            {/* Sign Up button: validates the form and submits if valid */}
            <Pressable
              accessibilityRole="button"
              onPress={() => handleSubmit(onSubmit)()}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
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
    flexDirection: "row",
    justifyContent: "center",
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
    paddingBottom: Spacing.four,
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
  // Red border and text for invalid fields
  inputError: {
    borderColor: "#cc0000",
  },
  errorText: {
    color: "#cc0000",
  },
  // Sign Up button styles
  button: {
    marginTop: Spacing.two,
    backgroundColor: "#0000cc",
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: 700,
  },
});
