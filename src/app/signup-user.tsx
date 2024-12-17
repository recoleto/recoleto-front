import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { stylesInit } from "./signup-company";
import { Input } from "@/components/input";
import { colors } from "@/utils/globals";
import GoBack from "@/components/back";
import { PrimaryButton } from "@/components/primary-button";
import { MessageToast } from "@/components/message-toast";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, userSchema } from "@/utils/types";
import { cpfApplyMask, telNumberMask } from "@/utils/masks";
import { useRouter } from "expo-router";
import { AuthContext } from "api/context/auth";
import FormLayout from "../components/form-layout";

export default function SignUpUser() {
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const auth = useContext(AuthContext)

    const { watch, formState: { errors }, setValue, handleSubmit } = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: yupResolver(userSchema)
    })

    function applyMask(value: string, fieldName: 'cpf' | 'telNumber') {
        const onlyNumbers = value.replace(/[^\d]/g, '')
        if (fieldName === 'cpf') {
            const cpf = cpfApplyMask(onlyNumbers)
            return setValue('cpf', cpf)
        } else if (fieldName === 'telNumber') {
            const tel = telNumberMask(onlyNumbers)
            return setValue('telNumber', tel)
        }
    }

    const onSubmit: SubmitHandler<User> = async () => {
        const data = {
            name: watch('name'),
            lastName: watch('lastName'),
            telNumber: watch('telNumber'),
            cpf: watch('cpf'),
            // street: watch('street'),
            // number: watch('number'),
            email: watch('email'),
            password: watch('password')
        }
        const response = await auth.registerUser({ ...data })
        console.log(response)
        if (response.statusCode === 201) {
            setError(null)
            setSuccess('Usuário cadastrado com sucesso.')
            setTimeout(() => {
                router.replace('/')
            }, 2000)
        } else {
            setSuccess(null)
            setError(response.reject)
        }
    }

    return (
        <ScrollView>
            <FormLayout>
                <View style={styles.componentView}>
                    <View style={stylesInit.inputsView}>
                        <View style={stylesInit.logradouroView}>
                            <View style={{ flex: 1 }}>
                                <Input
                                    onChangeText={(value) => setValue('name', value)}
                                    label="Nome Completo"
                                    type="text"
                                    placeholder="Digite seu nome"
                                    color={colors.white} />
                                {errors.name && <Text style={{ color: colors.white }}>{errors.name.message}</Text>}
                            </View>

                            <View style={{ flex: 1 }}>
                                <Input
                                    onChangeText={(value) => setValue('lastName', value)}
                                    label="Sobrenome"
                                    type="text"
                                    placeholder="Digite seu sobrenome"
                                    color={colors.white} />
                                {errors.lastName && <Text style={{ color: colors.white }}>{errors.lastName.message}</Text>}
                            </View>
                        </View>

                        <Input
                            onChangeText={(value) => applyMask(value, 'cpf')}
                            label="CPF"
                            value={watch('cpf')}
                            type="text"
                            placeholder="123.456.789-00"
                            color={colors.white} />
                        {errors.cpf && <Text style={{ color: colors.white }}>{errors.cpf.message}</Text>}
                        {/* <View style={stylesInit.logradouroView}>
                    <Input label="Logradouro" type="text" placeholder="Digite seu logradouro" viewStyle={{ flex: 4 }} color={colors.white} />
                    <Input label="Número" type="text" placeholder="n°012" viewStyle={{ flex: 1 }} color={colors.white} />
                    </View> */}
                        <Input
                            onChangeText={(value) => setValue('email', value)}
                            value={watch('email')}
                            label="E-mail"
                            type="email"
                            placeholder="Digite seu e-mail"
                            color={colors.white} />
                        {errors.email && <Text style={{ color: colors.white }}>{errors.email.message}</Text>}

                        <Input
                            onChangeText={(value) => applyMask(value, 'telNumber')}
                            value={watch('telNumber')}
                            label="Telefone"
                            type="text"
                            placeholder="(00) 00000-0000"
                            color={colors.white} />

                        <Input
                            onChangeText={(value) => setValue('password', value)}
                            secureTextEntry={true}
                            value={watch('password')}
                            label="Senha"
                            type="password"
                            placeholder="Digite sua senha"
                            color={colors.white} />
                        {errors.password && <Text style={{ color: colors.white }}>{errors.password.message}</Text>}

                        <Input
                            onChangeText={(value) => setValue('confirmPassword', value)}
                            secureTextEntry={true}
                            value={watch('confirmPassword')}
                            label="Confirme a senha"
                            type="password"
                            placeholder="Confirme sua senha"
                            color={colors.white} />
                        {errors.confirmPassword && <Text style={{ color: colors.white }}>{errors.confirmPassword.message}</Text>}

                        <PrimaryButton style={styles.button} onPress={handleSubmit(onSubmit)} title="REGISTRAR" />
                    </View>
                    {error ? <MessageToast message={error} type="error" /> : success ? <MessageToast message={success} type="success" /> : null}
                </View>
            </FormLayout>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    componentView: {
        display: 'flex',
        gap: 50,
        height: '100%'
    },
    logoView: {
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    },
    button: {
        marginBottom: 500
    }
})

