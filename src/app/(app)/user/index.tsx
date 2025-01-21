import { Card } from "@/components/card";
import { MainLayout } from "@/components/main-layout";
import { StyleSheet, Text, View } from "react-native";
import { globalsStyles } from "../../../utils/globals-styles";
import { router } from "expo-router";
import { UrbanSolidWasteCategory } from "@/utils/types";

export default function Home() {
    return (
        <MainLayout>
            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Lixo Eletrônico</Text>
                <View style={styles.cardContainer}>
                    <Card
                        type={'ponto-coleta'}
                        onPress={() => router.navigate({
                            pathname: '/user/collect-point',
                            params: { category: UrbanSolidWasteCategory.LIXO_ELETRONICO }
                        }
                        )} />
                    <Card type={'info'} />
                </View>
            </View>

            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Resíduos Contaminantes</Text>
                <View style={styles.cardContainer}>
                    <Card
                        type={'ponto-coleta'}
                        onPress={() => router.navigate({
                            pathname: '/user/collect-point',
                            params: { category: UrbanSolidWasteCategory.RESIDUOS_CONTAMINANTES }
                        })} />
                    <Card type={'info'} />
                </View>
            </View>

            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Resíduos cortantes</Text>
                <View style={styles.cardContainer}>
                    <Card
                        type={'ponto-coleta'}
                        onPress={() => router.navigate({
                            pathname: '/user/collect-point',
                            params: { category: UrbanSolidWasteCategory.RESIDUOS_CORTANTES }
                        })} />
                    <Card type={'info'} />
                </View>
            </View>

            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Óleo de Cozinha</Text>
                <View style={styles.cardContainer}>
                    <Card
                        type={'ponto-coleta'}
                        onPress={() => router.navigate({
                            pathname: '/user/collect-point',
                            params: { category: UrbanSolidWasteCategory.OLEO_DE_COZINHA }
                        })} />
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