import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StyleSheet } from "react-native";
import '../../globals-sign.css'
import { colors } from "@/utils/globals";
import { AuthProvider } from "api/context/auth";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

type NotAuthenticatedLayoutProps = {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: NotAuthenticatedLayoutProps) {

  const [loaded, error] = useFonts({
    "Teachers-Bold": require("../../assets/fonts/Teachers-Bold.ttf"),
    "Teachers-Regular": require("../../assets/fonts/Teachers-Regular.ttf"),
    "Teachers-SemiBold": require("../../assets/fonts/Teachers-SemiBold.ttf"),
    "Teachers-Medium": require("../../assets/fonts/Teachers-Medium.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <LinearGradient id="gradient" style={styles.background} colors={["#0C3422", "#249A66"]}>
        <StatusBar />
        <SafeAreaView id="root-safe-area" style={styles.background}>
          <Stack screenOptions={{
            headerStyle: { backgroundColor: "#0C3422" },
            headerTintColor: colors.white,
            headerBlurEffect: 'regular',
            contentStyle: { backgroundColor: "transparent" }
          }} >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="company-register" options={{ headerShown: false }} />
            <Stack.Screen name="user-register" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ title: 'FAÇA SEU LOGIN' }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </LinearGradient>
      <Toast />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
})
