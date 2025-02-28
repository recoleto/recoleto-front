import { Tabs } from "expo-router";
import { View } from "react-native";
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default function CompanyLayout() {
  return (
    <View style={{ height: '100%' }}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Feather name="home" style={{ color, fontSize: size }} />
          }}
          name="home" />
          
        <Tabs.Screen
          options={{
            title: 'Pontos de Coleta',
            tabBarIcon: ({ color, size }) => <Feather name="map-pin" style={{ color, fontSize: size }} />
          }}
          name="manage-collect-points" />

        <Tabs.Screen options={{
          title: 'Solicitações',
          tabBarIcon: ({ color, size }) => <Feather name="package" style={{ color, fontSize: size }} />
        }} name="discard-requests" />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }} />

      </Tabs>
    </View>
  )
}