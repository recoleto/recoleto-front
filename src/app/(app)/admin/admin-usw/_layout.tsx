import { Stack } from "expo-router";
import { View } from "react-native";

export default function AdminUswLayout() {
  return (
    <View style={{ height: '100%' }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="manage-usw" options={{ headerShown: true, headerTitle: '', headerBackVisible: true, headerTransparent: true }}
        />
      </Stack>
    </View>
  )
}