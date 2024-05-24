import { Stack } from "expo-router";

export default function CalendarPageLayout() {
  return (
    <Stack>
      <Stack.Screen name="calendarPage" options={{ headerShown: false }} />
    </Stack>
  );
}
