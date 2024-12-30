import { Input } from "@/components/input";
import { Image, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { colors } from "@/utils/globals";
import { stylesInit } from "./signup-company";
import { PrimaryButton } from "@/components/primary-button";
import { useContext, useState } from "react";
import { StatusCode } from "api/client/IHttpClient";
import { MessageToast } from "@/components/message-toast";
import { AuthContext } from "api/context/auth";
import { router } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const auth = useContext(AuthContext)

    async function onSubmit() {
        const response = await auth.login({ password, email })

        if (response.statusCode === StatusCode.NotFound) {
            setError(response.reject)
        } else if (response.statusCode === StatusCode.Ok) {
            setSuccess(response.resolve)
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
                        <Text style={stylesInit.text}>Entre para utilizar a plataforma</Text>
                    </View>
                    <View style={styles.inputsView}>
                        <Input onChangeText={(email) => setEmail(email)} label='Email' type='email' placeholder='Digite seu email' color={colors.white} />
                        <Input onChangeText={(password) => setPassword(password)} label='Senha' type='password' placeholder='Digite sua senha' color={colors.white} secureTextEntry={true} />
                        <PrimaryButton onPress={onSubmit} title="ENTRAR" />
                    </View>

                    {error ? <MessageToast message={error} type='error' /> : success ? <MessageToast message={success} type='success' /> : null}
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
    },
    logoView: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
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