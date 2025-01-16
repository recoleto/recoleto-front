import { MainLayout } from "@/components/main-layout";
import { ScrollView } from "react-native-gesture-handler";
import { globalsStyles } from "../globals-styles";
import { Text } from "react-native";

export default function ManageCollectPointsScreen() {
    return (
        <ScrollView>
            <MainLayout>
                <Text style={globalsStyles.title}>Pontos de Coleta:</Text>
                <Text> Aqui você pode visualizar e gerenciar todos os seus pontos de coleta</Text>
            </MainLayout>
        </ScrollView>
    );
}