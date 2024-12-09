import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StyleSheet, View } from "react-native";
import '../../globals-sign.css'
import { colors } from "utils/globals";

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
        <LinearGradient id="gradient" style={styles.background} colors={["#0C3422", "#249A66"]}>
            <SafeAreaView style={styles.background}>
                <Stack screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "transparent !important", marginHorizontal: 24 }
                }} />
            </SafeAreaView>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',

    },
})
