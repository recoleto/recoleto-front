import { Stack } from "expo-router";

export default function ManageCollectPointsLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
    </Stack>
  )
}