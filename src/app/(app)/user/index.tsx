import { Card } from "@/components/card";
import { MainLayout } from "@/components/main-layout";
import { StyleSheet, Text, View } from "react-native";
import { globalsStyles } from "../globals-styles";

export default function Home() {
    return (
        <MainLayout>
            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Lixo Eletrônico</Text>
                <View style={styles.cardContainer}>
                    <Card type={'ponto-coleta'} />
                    <Card type={'info'} />
                </View>
            </View>

            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Material Contaminado</Text>
                <View style={styles.cardContainer}>
                    <Card type={'ponto-coleta'} />
                    <Card type={'info'} />
                </View>
            </View>

            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Material perfuro-cortante</Text>
                <View style={styles.cardContainer}>
                    <Card type={'ponto-coleta'} />
                    <Card type={'info'} />
                </View>
            </View>

            <View style={styles.carroussel}>
                <Text style={globalsStyles.title}>Óleo de Cozinha</Text>
                <View style={styles.cardContainer}>
                    <Card type={'ponto-coleta'} />
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