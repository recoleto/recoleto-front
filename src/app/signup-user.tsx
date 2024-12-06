import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { stylesInit } from "./signup-company";
import { Input } from "@/globals/input";
import { colors } from "utils/globals";
import GoBack from "@/globals/back";
import { PrimaryButton } from "@/globals/primary-button";

export default function SignUpUser() {
    return (
            <View style={styles.componentView}>
                <View style={styles.logoView}>
                    <GoBack />
                    <Text style={stylesInit.title}>REGISTRO DO USUÁRIO</Text>
                    <Image style={stylesInit.image} source={require('../../assets/images/logo-w-name.png')} />
                    <Text style={stylesInit.text}>Registre-se para usar essa plataforma</Text>
                </View>
                <View style={stylesInit.inputsView}>
                    <Input label="Nome Completo" type="text" placeholder="Digite seu nome" color={colors.white} />
                    <Input label="CPF" type="text" placeholder="123.456.789-00" color={colors.white} />
                    <View style={stylesInit.logradouroView}>
                        <Input label="Logradouro" type="text" placeholder="Digite seu logradouro" viewStyle={{ flex: 4 }} color={colors.white} />
                        <Input label="Número" type="text" placeholder="n°012" viewStyle={{ flex: 1 }} color={colors.white} />
                    </View>
                    <Input label="E-mail" type="email" placeholder="Digite seu e-mail" color={colors.white} />
                    <Input label="Senha" type="password" placeholder="Digite sua senha" color={colors.white} />
                    <PrimaryButton title="REGISTRAR" />
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    componentView: {
        display: 'flex',
        gap: 100,
        height: '100%'
    },
    logoView: {
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    }
})