// Import Statements
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { Stack } from "expo-router/stack";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

// Splash Screen hiding
// Keep the splash screen visible until the app is ready
SplashScreen.preventAutoHideAsync();

// Stack navigator and settings for the pages loaded from it
// Root layout that wraps every screen in the app
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {/* Stack navigator: each new screen slides on top of the last */}
      <Stack>
        {/* Sign-up form, header hidden because it has its own title */}
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Sign Up" }}
        />
        {/* Confirmation screen with a header and back arrow */}
        <Stack.Screen name="confirmation" options={{ title: "Confirmation" }} />
      </Stack>
    </ThemeProvider>
  );
}
