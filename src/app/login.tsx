import { Input } from "@/components/input";
import { Image, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { stylesInit } from "./company-register/step-one";
import { PrimaryButton } from "@/components/primary-button";
import { useContext, useState } from "react";
import { StatusCode } from "api/client/IHttpClient";
import { AuthContext } from "api/context/auth";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

export default function Login() {
    const { control } = useForm();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useContext(AuthContext)

    async function onSubmit() {
        const response = await auth.login({ password, email })

        if (response.statusCode === StatusCode.NotFound) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Usuário não encontrado.',
                autoHide: true,
                visibilityTime: 2000
            })
        } else if (response.statusCode === StatusCode.Ok) {
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Usuário logado com sucesso.',
                autoHide: true,
                visibilityTime: 2000
            })
            setTimeout(() => {
                router.replace('/profile')
            }, 2000)
        }
    }

    return (
        <KeyboardAvoidingView style={styles.keyboardView}>
            <ScrollView>
                <View style={styles.componentView}>
                    <View style={styles.logoView}>
                        <Image style={styles.image} source={require('../../assets/images/logo-w-name.png')} />
                        <Text style={stylesInit.text}>Entre para utilizar a plataforma.</Text>
                    </View>
                    <View style={styles.inputsView}>
                        <Input
                            icon='mail'
                            inputProps={{
                                placeholder: 'Digite seu e-mail',
                                onChangeText: setEmail,
                                keyboardType: 'email-address',
                            }}
                            formProps={{ name: 'email', control }} />
                        <Input
                            icon='lock'
                            inputProps={{
                                placeholder: 'Digite sua senha',
                                onChangeText: setPassword,
                                secureTextEntry: true
                            }}
                            formProps={{ name: 'password', control }} />
                        <PrimaryButton onPress={onSubmit} title="ENTRAR" />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    componentView: {
        justifyContent: 'space-around',
        height: '100%',
        position: 'relative'
    },
    inputsView: {
        gap: 10,
        paddingTop: 16
    },
    logoView: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 24,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain'
    },
    keyboardView: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    }
})