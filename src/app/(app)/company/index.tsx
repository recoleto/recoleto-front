import { Card } from "@/components/card";
import { MainLayout } from "@/components/main-layout";
import { globalsStyles } from "@/utils/globals-styles";
import { RelativePathString, router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

function redirectTo(path: string) {
    router.push(path as RelativePathString);
}

export default function Home() {
    return (
        <MainLayout>
            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Pontos de Coleta</Text>
                <View style={styles.cardContainer}>
                    <Card text="Cadastrar Ponto de Coleta" type="ponto-coleta" />
                    <Card text="Ver meus Pontos de Coleta" type="info" onPress={() => router.push('/(app)/company/manage-collect-points')} />
                </View>
            </View>

            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Resíduos</Text>
                <View style={styles.cardContainer}>
                    <Card text="Cadastrar Resíduo" icon="plus-circle" />
                    <Card text="Ver resíduos cadastrados" type="info" />
                </View>
            </View>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12
    },
    carroussel: {
        gap: 12
    }
})