import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastProvider } from "react-native-toast-notifications";
import { Text } from "react-native";

import { Viewport } from "@/styles/styles";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Montserrat: require("../assets/fonts/montserrat/Montserrat-Regular.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider
        icon={<Text>👋</Text>}
        style={{ top: Viewport.height * 0.03 }}
      >
        <Stack
          initialRouteName="(auth)"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="tabs" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ToastProvider>
    </QueryClientProvider>
  );
}
