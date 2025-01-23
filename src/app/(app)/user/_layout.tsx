import { colors } from "@/utils/globals";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { CategoryProvider } from "@/contexts/map-filter-context";

export default function UserLayout() {
    return (
        <CategoryProvider>
            <View style={{ height: '100%' }}>
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
                        name="index" />
                    <Tabs.Screen
                        options={{
                            title: 'Pontos de Coleta',
                            tabBarIcon: ({ color, size }) => <Feather name="map-pin" style={{ color, fontSize: size }} />
                        }}
                        name="collect-point" />

                    <Tabs.Screen
                        options={{
                            title: 'Notificações',
                            tabBarIcon: ({ color, size }) => <MaterialIcons name="notifications" style={{ color, fontSize: size }} />
                        }}
                        name="notification" />

                    <Tabs.Screen
                        name="profile" // Referência à rota de perfil compartilhada
                        options={{
                            title: "Perfil",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialIcons name="person" size={size} color={color} />
                            ),
                        }}
                    />
                </Tabs>
            </View>
        </CategoryProvider>
    )
}