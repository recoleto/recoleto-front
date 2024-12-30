import { EditableInput } from "@/components/editable-input";
import { MessageToast } from "@/components/message-toast";
import { PrimaryButton } from "@/components/primary-button";
import { colors, font } from "@/utils/globals";
import { useGetUser } from "api/hooks/useGetUser";
import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { AuthContext } from "api/context/auth";
import { BaseDialog } from "@/components/dialog";
import { router } from "expo-router";
import { MainLayout } from "@/components/main-layout";
import { globalsStyles } from "./globals-styles";

export default function ProfileScreen() {
    const { user, fetchUser, updateUser, role, disableAccount } = useGetUser();
    const { logOut } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Adicionando estados locais para os dados editáveis
    const [name, setName] = useState(user?.name || "");
    const [document, setDocument] = useState(role === 'EMPRESA' ? user?.cnpj : user?.cpf);

    // Atualizando os estados quando os dados do usuário mudam
    useEffect(() => {
        if (!user) {
            fetchUser();
        } else if (user) {
            setName(user.name);
            setDocument(role === 'EMPRESA' ? user.cnpj : user.cpf);
        }
    }, []);

    const handleModal = () => setIsOpen(!isOpen);

    const handleDisableAccount = async () => {
        const response = await disableAccount();
        if (response && response.statusCode > 200 && response.statusCode < 300) {
            setError(response.reject);
            setTimeout(() => setError(null), 2000);
        } else {
            setSuccess("Conta desativada com sucesso");
            setTimeout(() => setSuccess(null), 2000);
            logOut();
        }
    };
    // Função para salvar as alterações feitas
    const handleSave = async () => {
        if (user) {
            const response = await updateUser({
                ...user,
                name,
            });
            if (response && response.statusCode > 200 && response.statusCode < 300) {
                setError(response.reject);
                setTimeout(() => setError(null), 2000);
            } else {
                setSuccess("Dados atualizados com sucesso");
                setTimeout(() => setSuccess(null), 2000);
            }
        }
        fetchUser();
    };

    return (
        <ScrollView>
            <MainLayout>
                <Text style={globalsStyles.title}>Informações do usuário:</Text>
                <EditableInput
                    value={name}
                    onChangeText={setName}
                    label={role === 'EMPRESA' ? 'Nome Fantasia' : 'Nome'}
                    type="text"
                    placeholder="nome"
                    color={colors.black}
                />
                <EditableInput
                    value={user?.email}
                    readOnly={true}
                    label="E-mail"
                    type="email"
                    placeholder="email"
                    color={colors.black}
                />
                <EditableInput
                    value={document}
                    readOnly={true}
                    label={role === 'EMPRESA' ? "CNPJ" : "CPF"}
                    type="text"
                    placeholder="cpf"
                    color={colors.black}
                />
                <View style={styles.buttons}>
                    <PrimaryButton title="SALVAR" onPress={handleSave} />
                    <PrimaryButton onPress={handleModal} title="EXCLUIR CONTA" />
                    <PrimaryButton onPress={logOut} title="SAIR" />
                    <PrimaryButton onPress={() => router.navigate('/(app)/pontos-coleta')} title="TESTE" />
                </View>
                {error ? <MessageToast message={error} type='error' /> : success ? <MessageToast message={success} type='success' /> : null}
                <BaseDialog isOpen={isOpen} setIsOpen={handleModal} onPressAction={handleDisableAccount} title="Desativar conta." message="Você tem certeza que deseja desativar sua conta?" />
            </MainLayout>
        </ScrollView>
    );
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
    content: {
        flex: 3.5, // Proporção para o conteúdo
        backgroundColor: colors.white,
        borderTopLeftRadius: 40, // Borda curva na parte superior
        borderTopRightRadius: 40,
        padding: 20,
        gap: 20
    },
    contentText: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    buttons: {
        display: "flex",
        gap: 10,
    }
});
