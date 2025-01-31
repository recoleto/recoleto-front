import { Stack } from "expo-router";
import { View } from "react-native";

export default function HomeStack() {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="collect-point-register" options={{ headerShown: true, headerTitle: '', headerBackVisible: true, headerTransparent: true }} />
        <Stack.Screen name="urban-solid-waste-info" options={{ headerShown: true, headerTitle: '', headerBackVisible: true, headerTransparent: true }} />
        <Stack.Screen name="urban-solid-waste-register" options={{ headerShown: true, headerTitle: '', headerBackVisible: true, headerTransparent: true }}  />
      </Stack>
    </View>
  )
}