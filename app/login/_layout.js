import { Stack } from "expo-router";

export default function LoginPageLayout() {
  return (
    <Stack>
      <Stack.Screen name="loginPage" options={{ headerShown: false }} />
    </Stack>
  );
}
