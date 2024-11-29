import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

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
            <View id="view-antes-stack">
                <Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: "transparent"}}} />
            </View>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
    },
})
