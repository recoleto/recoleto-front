import { Stack } from "expo-router";
import { View } from "react-native";

export default function HomeStack() {
    <View style={{ height: '100%', width: '100%'}}>
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="collect-point-register" />
        </Stack>
    </View>
}