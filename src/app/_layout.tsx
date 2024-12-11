import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StyleSheet, View } from "react-native";
import '../../globals-sign.css'
import { colors } from "@/utils/globals";
import { AuthProvider } from "api/context/auth";

SplashScreen.preventAutoHideAsync();

type NotAuthenticatedLayoutProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: NotAuthenticatedLayoutProps) {
    const [fontsLoaded] = useFonts({
        "Teachers-Bold": require("../../assets/fonts/Teachers-Bold.ttf"),
        "Teachers-Regular": require("../../assets/fonts/Teachers-Regular.ttf"),
        "Teachers-SemiBold": require("../../assets/fonts/Teachers-SemiBold.ttf"),
        "Teachers-Medium": require("../../assets/fonts/Teachers-Medium.ttf"),
    });

    if (!fontsLoaded) {
        SplashScreen.preventAutoHideAsync();
        return null;
    }

    return (
        <AuthProvider>
            <LinearGradient id="gradient" style={styles.background} colors={["#0C3422", "#249A66"]}>
                <SafeAreaView style={styles.background}>
                    <Stack screenOptions={{
                        headerTransparent: true,
                        headerTintColor: colors.white,
                        contentStyle: { backgroundColor: "transparent !important", marginHorizontal: 24 }
                    }} >
                        <Stack.Screen name="index" options={{headerShown: false }} />
                        <Stack.Screen name="signup-company" options={{title: 'REGISTRO DA EMPRESA'}} />
                        <Stack.Screen name="signup-user" options={{title: 'REGISTRO DO USUÁRIO'}}/>
                        <Stack.Screen name="login" options={{title: 'ENTRE'}}/>
                    </Stack>
                </SafeAreaView>
            </LinearGradient>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',

    },
})
