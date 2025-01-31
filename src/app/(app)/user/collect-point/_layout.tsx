import { Stack } from "expo-router";
import { View } from "react-native";

export default function collectPointLayout() {
    return (
        <View style={{ height: '100%' }}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen options={{ headerShown: true, headerTitle: '', headerBackVisible: true, headerTransparent: true }} name="discard-request" />
            </Stack>
        </View>
    )
}