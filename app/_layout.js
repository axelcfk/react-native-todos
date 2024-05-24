import React from "react";
import { Stack } from "expo-router";
import { TaskProvider } from "../TaskContext";
export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="task" options={{ headerShown: false }} />
        <Stack.Screen name="calendar" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </TaskProvider>
  );
}
