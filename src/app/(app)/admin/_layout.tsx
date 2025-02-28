import { Tabs } from "expo-router";
import { View } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function AdminLayout() {
  return (
    <View style={{ height: '100%' }}>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen options={{
          title: 'Users',
          tabBarIcon: ({ color, size }) => <Feather name="users" style={{ color, fontSize: size }} />
        }} name="users" />

        <Tabs.Screen options={{
          title: 'Companies',
          tabBarIcon: ({ color, size }) => <Feather name="briefcase" style={{ color, fontSize: size }} />
        }} name="companies" />

        <Tabs.Screen options={{
          title: 'Resíduos',
          tabBarIcon: ({ color, size }) => <Feather name="package" style={{ color, fontSize: size }} />
        }} name="admin-usw" />

        <Tabs.Screen options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Feather name="user" style={{ color, fontSize: size }} />
        }} name="profile" />
      </Tabs>
    </View>
  )
}