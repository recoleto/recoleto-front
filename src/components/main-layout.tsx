import { colors, font } from "@/utils/globals";
import { useGetUser } from "api/hooks/useGetUser";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type MainLayoutProps = {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const { user, fetchUser } = useGetUser();

    if(!user){
        fetchUser();
    } 

    return (
        <ScrollView>
            <View style={styles.container}>
                <View id="header" style={styles.header}>
                    <Text style={styles.headerText}>Foto de Perfil</Text>
                    <Image source={require('../../assets/images/user-mock.png')} />
                    <Text style={styles.headerText}>Olá {user?.name} </Text>
                </View>
                <View style={styles.content}>
                    {children}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.green200, // Fundo geral (verde escuro)
    },
    header: {
        flex: 1, // Proporção maior para o cabeçalho
        justifyContent: "space-around",
        alignItems: "center",
        padding: 20,
    },
    headerText: {
        color: colors.white,
        fontSize: font.size.large,
        fontFamily: font.family.semiBold,
    },
    title: {
        fontFamily: font.family.semiBold,
        textDecorationLine: 'underline',
        fontSize: font.size.mediumX,
    },
    content: {
        flex: 3.5, // Proporção para o conteúdo
        backgroundColor: colors.white,
        borderTopLeftRadius: 40, // Borda curva na parte superior
        borderTopRightRadius: 40,
        padding: 20,
        gap: 20
    },
})