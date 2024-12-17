import { EditableInput } from "@/components/editable-input";
import { MessageToast } from "@/components/message-toast";
import { PrimaryButton } from "@/components/primary-button";
import { colors, font } from "@/utils/globals";
import { useGetUser } from "api/hooks/useGetUser";
import { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AuthContext } from "api/context/auth";

export default function ProfileScreen() {
    const { user, refetchUser, updateUser, role, disableAccount } = useGetUser();
    const { logOut } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Adicionando estados locais para os dados editáveis
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [document, setDocument] = useState(role === 'EMPRESA' ? user?.cnpj : user?.cpf);

    // Atualizando os estados quando os dados do usuário mudam
    useEffect(() => {
        // console.log('chegou aqiu papai')
        // console.log('passou do refetch papai')
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setDocument(role === 'EMPRESA' ? user.cnpj : user.cpf);
        }
    }, [user, role]);

    const handleModal = () => setIsOpen(!isOpen);

    const handleDisableAccount = async () => {
        const response = await disableAccount();
        if (response && response.statusCode > 200 && response.statusCode < 300) {
            setError(response.reject);
        } else {
            setSuccess("Conta desativada com sucesso");
            logOut();
        }
    };
    // Função para salvar as alterações feitas
    const handleSave = () => {
        if(user) {
            updateUser({
                ...user,
                name,
                email,
            });
        }
        refetchUser();
    };

    return (
        <View style={styles.container}>
            <View id="header" style={styles.header}>
                <Text style={styles.headerText}>Foto de Perfil</Text>
                <Image source={require('../../../assets/images/user-mock.png')} />
                <Text style={styles.headerText}>Olá {user?.name} </Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Informações do usuário:</Text>
                {/* <EditableInput 
                    value={name} 
                    onChangeText={setName} 
                    label={role === 'EMPRESA' ? 'Nome Fantasia' : 'Nome'} 
                    type="text" 
                    placeholder="nome" 
                    color={colors.black} 
                />
                <EditableInput 
                    value={email} 
                    onChangeText={setEmail} 
                    label="E-mail" 
                    type="email" 
                    placeholder="email" 
                    color={colors.black} 
                /> */}
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
                    <PrimaryButton onPress={handleDisableAccount} title="EXCLUIR CONTA" />
                    <PrimaryButton onPress={logOut} title="SAIR" />
                </View>
            </View>
            {error ? <MessageToast message={error} type='error' /> : success ? <MessageToast message={success} type='success' /> : null}
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
