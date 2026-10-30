// Import Statements
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { Stack } from "expo-router/stack";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

// Splash Screen hiding until app is ready
SplashScreen.preventAutoHideAsync();

// Root Layout and wrapping for the pages
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Sign Up" }}
        />
        <Stack.Screen name="confirmation" options={{ title: "Confirmation" }} />
      </Stack>
    </ThemeProvider>
  );
}
