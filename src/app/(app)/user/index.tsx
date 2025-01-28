import { Card } from "@/components/card";
import { ProfileLayout } from "@/components/profile-layout";
import { StyleSheet, Text, View } from "react-native";
import { globalsStyles } from "../../../utils/globals-styles";
import { router } from "expo-router";
import { UrbanSolidWasteCategory } from "@/utils/types";
import { useCategory } from "@/contexts/map-filter-context";
import { MainLayout } from "@/components/main-layout";

export default function Home() {
    const { setSelectedCategory } = useCategory();
    return (
        <MainLayout>
            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Lixo Eletrônico</Text>
                <View style={styles.cardContainer}>
                    <Card
                        type={'ponto-coleta'}
                        onPress={() => {
                            router.replace('/(app)/user/collect-point');
                            setSelectedCategory(UrbanSolidWasteCategory.LIXO_ELETRONICO);
                        }} />
                    <Card type={'info'} />
                </View>
            </View>

            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Resíduos Contaminantes</Text>
                <View style={styles.cardContainer}>
                    <Card
                        type={'ponto-coleta'}
                        onPress={() => {
                            router.replace('/(app)/user/collect-point');
                            setSelectedCategory(UrbanSolidWasteCategory.RESIDUOS_CONTAMINANTES);
                        }} />
                    <Card type={'info'} />
                </View>
            </View>

            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Resíduos cortantes</Text>
                <View style={styles.cardContainer}>
                    <Card
                        type={'ponto-coleta'}
                        onPress={() => {
                            router.replace('/(app)/user/collect-point');
                            setSelectedCategory(UrbanSolidWasteCategory.RESIDUOS_CORTANTES);
                        }} />
                    <Card type={'info'} />
                </View>
            </View>

            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Óleo de Cozinha</Text>
                <View style={styles.cardContainer}>
                    <Card
                        type={'ponto-coleta'}
                        onPress={() => {
                            router.replace('/(app)/user/collect-point');
                            setSelectedCategory(UrbanSolidWasteCategory.OLEO_DE_COZINHA);
                        }} />
                    <Card type={'info'} />
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