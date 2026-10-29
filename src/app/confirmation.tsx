import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

export default function ConfirmationScreen() {
  const { firstName } = useLocalSearchParams<{ firstName: string }>();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.centered}>
        Account created for {firstName}!
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.centered}>
        Your sign-up form was submitted successfully.
      </ThemedText>
    </ThemedView>
  );
}

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
});
