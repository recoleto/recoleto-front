import { Input } from "@/components/input";
import { Image, StyleSheet, View, Text } from "react-native";
import { colors } from "@/utils/globals";
import { stylesInit } from "./signup-company";
import { PrimaryButton } from "@/components/primary-button";
import GoBack from "@/components/back";
import { useState } from "react";
import { AuthService } from "api/services/AuthService";
import { ErrorToast, SuccessToast } from 'react-native-toast-message'
import { StatusCode } from "api/client/IHttpClient";
import { MessageToast } from "@/components/message-toast";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function onSubmit() {
        const authService = new AuthService()
        const response = await authService.loginUser({ password, email })

        if (response.statusCode === StatusCode.NotFound) {
            setError(response.reject)
        } else if (response.statusCode === StatusCode.Accepted || StatusCode.Ok) {
            setSuccess(response.resolve)
        }
    }

    return (
        <View style={styles.componentView}>
            <View style={styles.logoView}>
                <GoBack />
                <Text style={stylesInit.title}>FAÇA SEU LOGIN</Text>
                <Image style={styles.image} source={require('../../assets/images/logo-w-name.png')} />
                <Text style={stylesInit.text}>Entre para utilizar a plataforma</Text>
            </View>
            <View style={styles.inputsView}>
                <Input onChangeText={(email) => setEmail(email)} label='Email' type='email' placeholder='Digite seu email' color={colors.white} />
                <Input onChangeText={(password) => setPassword(password)} label='Senha' type='password' placeholder='Digite sua senha' color={colors.white} secureTextEntry={true} />
                <PrimaryButton onPress={onSubmit} title="ENTRAR" />
            </View>

            {error ? <MessageToast message={error} type='error' /> : <MessageToast message={success} type='success' />}
        </View>
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
    }
})