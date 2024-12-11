import { colors } from "@/utils/globals";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ProtectedLayout() {
    return (
        <SafeAreaProvider id="child-safe-area-provider" style={{height: '100%', width: '100%'}}>
            <SafeAreaView id="child-safe-area-view" style={{height: '100%'}}>
                <View style={styles.container}>
                    <Tabs screenOptions={{headerShown: false}} />
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