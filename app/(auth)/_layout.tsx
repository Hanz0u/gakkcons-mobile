import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="SignUpPage" options={{ headerShown: false }} />
      <Stack.Screen name="SignUpPage2" options={{ headerShown: false }} />
      <Stack.Screen name="SignUpPage3" options={{ headerShown: false }} />
    </Stack>
  );
}