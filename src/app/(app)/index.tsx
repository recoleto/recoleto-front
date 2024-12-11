import { PrimaryButton } from "@/components/primary-button";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View id="headerr" style={styles.header}>
                <Text style={styles.headerText}>Perfil do Usuário</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.contentText}>
                    Aqui fica o conteúdo principal da tela.
                </Text>
                <View>
                    <PrimaryButton title="SALVAR" />
                    <PrimaryButton title="EXCLUIR" />
                </View>
            </View>
        </View>
    );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0C3422", // Fundo geral (verde escuro)
    },
    header: {
        flex: 1, // Proporção maior para o cabeçalho
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    headerText: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    content: {
        flex: 3.5, // Proporção para o conteúdo
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 40, // Borda curva na parte superior
        borderTopRightRadius: 40,
        padding: 20,
    },
    contentText: {
        fontSize: 16,
        color: "#333",
    },
});
