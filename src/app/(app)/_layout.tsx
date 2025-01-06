import { colors } from "@/utils/globals";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ProtectedLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider id="child-safe-area-provider" style={{ height: '100%', width: '100%' }}>
                <SafeAreaView id="child-safe-area-view" style={{ height: '100%' }}>
                    <View style={styles.container}>
                        <Tabs screenOptions={{
                            headerShown: false,
                            tabBarActiveTintColor: colors.white,
                            tabBarActiveBackgroundColor: colors.green200,
                            tabBarHideOnKeyboard: true,
                        }} >
                            <Tabs.Screen
                                options={{
                                    title: 'Home',
                                    tabBarIcon: ({ color, size }) => <MaterialIcons name="home" style={{ color, fontSize: size }} />
                                }}
                                name="home" />
                            <Tabs.Screen
                                options={{
                                    title: 'Pontos de Coleta'
                                }}
                                name="collect-point" />

                            <Tabs.Screen
                                options={{
                                    title: 'Notificações',
                                    tabBarIcon: ({ color, size }) => <MaterialIcons name="notifications" style={{ color, fontSize: size }} />
                                }}
                                name="notification" />

                            <Tabs.Screen
                                options={{
                                    title: 'Perfil',
                                    tabBarIcon: ({ color, size }) => <MaterialIcons name="person" style={{ color, fontSize: size }} />
                                }}
                                name="profile" />

                        </Tabs>
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