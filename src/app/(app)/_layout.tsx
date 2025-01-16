import { colors } from "@/utils/globals";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useGetUser } from "api/hooks/useGetUser"

export default function ProtectedLayout() {
    const { role } = useGetUser();
    var redirectRoute = "";
    if (role === "EMPRESA") {
        redirectRoute = "company";
    } else if (role === "admin") {
        redirectRoute = "ADMIN";
    } else {
        redirectRoute = "user";
    }
    return (
        <GestureHandlerRootView>
            <SafeAreaProvider id="child-safe-area-provider" style={{ height: '100%', width: '100%' }}>
                <SafeAreaView id="child-safe-area-view" style={{ height: '100%' }}>
                    <View style={styles.container}>
                        <Stack screenOptions={{ headerShown: false }}>
                            <Stack.Screen name='user' />
                            <Stack.Screen name='company' />
                            {/* <Stack.Screen name='admin' /> */}
                        </Stack>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: colors.green200
    }
})