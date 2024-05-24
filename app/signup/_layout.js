import { Stack } from "expo-router";

export default function SignupPageLayout() {
  return (
    <Stack>
      <Stack.Screen name="signupPage" options={{ headerShown: false }} />
    </Stack>
  );
}
