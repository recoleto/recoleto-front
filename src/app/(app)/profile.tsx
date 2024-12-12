import { BaseDialog } from "@/components/dialog";
import { EditableInput } from "@/components/editable-input";
import { PrimaryButton } from "@/components/primary-button";
import { colors, font } from "@/utils/globals";
import { useGetUser } from "api/hooks/useGetUser";
import { CompanyService } from "api/services/CompanyService";
import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ProfileScreen() {
    const { user, role } = useGetUser();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleModal = () => setIsOpen(!isOpen);

    const handleDisableAccount = async () => {
        const companyService = new CompanyService();
        const response = await companyService.disableAccount();
        if (response.statusCode > 200 && response.statusCode < 300) {
            setError(response.reject);
        } else {
            setSuccess("Conta desativada com sucesso");
        }
    }

    return (
        <View style={styles.container}>
            <View id="header" style={styles.header}>
                <Text style={styles.headerText}>Foto de Perfil</Text>
                <Image source={require('../../../assets/images/user-mock.png')} />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Informações do usuário:</Text>
                <Text style={styles.contentText}>
                    <EditableInput value={user?.name} label={role === 'EMPRESA' ? 'Nome Fantasia' : 'Nome'} type="text" placeholder="nome" color={colors.black} />
                    <EditableInput value={user?.email} label="E-mail" type="e-mail" placeholder="email" color={colors.black} />
                    <EditableInput value={
                        role === 'EMPRESA' ? user?.cnpj : user?.cpf
                    } readOnly={true} label={
                        role === 'EMPRESA' ? "CNPJ" : "CPF"
                    } type="text" placeholder="cpf" color={colors.black} />
                </Text>
                <View style={styles.buttons}>
                    <PrimaryButton title="SALVAR" />
                    <PrimaryButton onPress={handleDisableAccount} title="EXCLUIR CONTA" />
                </View>
            </View>
        </View>
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
