// Import Statements
import { FormField } from "@/components/form-field";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { signUpSchema, type SignUpFormData } from "@/schemas/sign-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sign Up Screen logic, handles colour, form control, submitting the form, style, confirmation of name and email
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
    router.replace({
      pathname: "/confirmation",
      params: { firstName: data.firstName },
    });
  };

  // Layout, keeps content inside safe area, heading, pushes content above the keyboard on iOS, scrollable, form input
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
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

            <FormField
              control={control}
              name="firstName"
              label="First name"
              error={errors.firstName?.message}
              placeholder="Enter your first name"
              autoCapitalize="words"
              autoComplete="given-name"
            />

            <FormField
              control={control}
              name="lastName"
              label="Last name"
              error={errors.lastName?.message}
              placeholder="Enter your last name"
              autoCapitalize="words"
              autoComplete="family-name"
            />

            <FormField
              control={control}
              name="email"
              label="Email"
              error={errors.email?.message}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
            />

            <FormField
              control={control}
              name="password"
              label="Password"
              error={errors.password?.message}
              placeholder="At least 8 characters"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
            />

            <FormField
              control={control}
              name="confirmPassword"
              label="Confirm password"
              error={errors.confirmPassword?.message}
              placeholder="Re-enter your password"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
            />

            <Pressable
              accessibilityRole="button"
              onPress={() => handleSubmit(onSubmit)()}
              style={({ pressed }) => [
                styles.button,
                { backgroundColor: theme.primary },
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
  // Sign Up button styles
  button: {
    marginTop: Spacing.two,
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
