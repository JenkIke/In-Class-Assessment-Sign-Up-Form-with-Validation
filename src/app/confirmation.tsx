// Import Statements
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

// Confirmation screen shown after a successful sign-up
export default function ConfirmationScreen() {
  const theme = useTheme();

  // Read the first name passed from the sign-up form
  const { firstName } = useLocalSearchParams<{ firstName?: string }>();

  if (!firstName) {
    return <Redirect href="/" />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.centered}>
        Account created for {firstName}!
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.centered}>
        Your sign-up form was submitted successfully.
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.replace("/")}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: theme.primary },
          pressed && styles.buttonPressed,
        ]}
      >
        <ThemedText style={styles.buttonText}>Back to sign up</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

// Centre the content on the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.four,
    gap: Spacing.three,
  },
  centered: {
    textAlign: "center",
  },
  button: {
    marginTop: Spacing.two,
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
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
