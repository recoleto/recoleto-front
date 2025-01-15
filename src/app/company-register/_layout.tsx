import { RegisterProvider } from "@/contexts/user-register-context";
import { colors } from "@/utils/globals";
import { Stack } from "expo-router";

export default function RegisterUserLayout() {
    return (
        <RegisterProvider>
            <Stack screenOptions={{
                headerStyle: { backgroundColor: "#0C3422" },
                headerTintColor: colors.white,
                headerBlurEffect: 'regular',
                contentStyle: { backgroundColor: "transparent" }
            }}>
                <Stack.Screen name="step-one" options={{ title: 'REGISTRO - ETAPA' }} />
                <Stack.Screen name="step-two" options={{ title: 'REGISTRO - ETAPA' }} />
            </Stack>
        </RegisterProvider>
    );
}
