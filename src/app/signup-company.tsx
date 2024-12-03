import GoBack from "@/globals/back";
import { Input } from "@/globals/input";
import { PrimaryButton } from "@/globals/primary-button";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, font } from "utils/globals";

type CompanyType = {
    name: string;
    cnpj: string;
    logradouro: string;
    number: string;
    telefone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignUpCompany() {
    const [company, setCompany] = useState<CompanyType>({
        name: '',
        cnpj: '',
        logradouro: '',
        number: '',
        telefone: '',
        email: '',
        password: '',
        confirmPassword: ''
    })


    return (
        <View style={styles.componentView}>
            <View style={styles.logoView}>
                <GoBack />
                <Text style={styles.title}>REGISTRO DE EMPRESA</Text>
                <Image style={styles.image} source={require('../../assets/images/logo-w-name.png')} />
                <Text style={styles.text}>Registre-se para usar a plataforma</Text>
            </View>

            <View style={styles.inputsView}>
                <Input
                    color={colors.white}
                    label="Nome Fantasia"
                    type="text"
                    placeholder="Digite o nome da sua empresa"
                    value={company.name}
                    onChangeText={(text) => setCompany({ ...company, name: text })} />
                <Input
                    color={colors.white}
                    label="CNPJ"
                    type="text"
                    placeholder="Digite o CNPJ da sua empresa"
                    value={company.cnpj}
                    onChangeText={(text) => setCompany({ ...company, cnpj: text })} />
                <View style={styles.logradouroView}>
                    <Input viewStyle={{flex: 4}} color={colors.white}
                        label="Logradouro"
                        type="text"
                        placeholder="Digite o logradouro da sua empresa"
                        value={company.logradouro}
                        onChangeText={(text) => setCompany({ ...company, logradouro: text })} />
                    <Input viewStyle={{flex: 1}} color={colors.white}
                        label="Número"
                        type="number"
                        placeholder="n°012"
                        value={company.number}
                        onChangeText={(text) => setCompany({ ...company, number: text })} />
                </View>
                <Input color={colors.white}
                    label="Telefone"
                    type="text"
                    placeholder="Digite o telefone da sua empresa"
                    value={company.telefone}
                    onChangeText={(text) => setCompany({ ...company, telefone: text })} />
                <Input color={colors.white}
                    label="E-mail"
                    type="email"
                    placeholder="Digite o e-mail da sua empresa"
                    value={company.email}
                    onChangeText={(text) => setCompany({ ...company, email: text })} />
                <Input color={colors.white}
                    label="Senha"
                    type="password"
                    placeholder="Digite a senha da sua empresa"
                    value={company.password}
                    onChangeText={(text) => setCompany({ ...company, password: text })} />
            </View>
            <PrimaryButton title="CADASTRAR" />
        </View>
    )
}

const styles = StyleSheet.create({
    componentView: {
        gap: 20
    },
    logoView: {
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    },
    inputsView: {
        height: 'auto',
        display: 'flex',
        gap: 10,
    },
    title: {
        fontFamily: 'Teachers-Medium',
        color: colors.white,
        fontSize: font.size.large,
        marginBottom: 6
    },
    text: {
        color: colors.white,
        fontFamily: 'Teachers-Medium',
    },
    image: {
        width: 180,
        height: 180,
        resizeMode: 'contain'
    },
    goBack: {
        display: 'flex',
        flexDirection: 'row',
    },
    logradouroView: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    }
})