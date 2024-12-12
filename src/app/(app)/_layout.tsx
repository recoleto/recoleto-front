import { colors } from "@/utils/globals";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';

export default function ProtectedLayout() {
    return (
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
                                title: 'Perfil',
                                tabBarIcon: ({ color, size }) => <MaterialIcons name="person" style={{ color, fontSize: size }} />
                            }}
                            name="profile" />
                    </Tabs>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: colors.green200
    }
})