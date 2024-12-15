import { Input } from "@/components/input";
import { PrimaryButton } from "@/components/primary-button";
import { useContext, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, font } from "@/utils/globals";
import { Company, companySchema, CompanyType } from "@/utils/types";
import { useForm, SubmitHandler, set } from 'react-hook-form'
import { AuthContext } from "api/context/auth";
import { yupResolver } from '@hookform/resolvers/yup'
import { cnpjApplyMask, telNumberMask } from '@/utils/masks'
import { MessageToast } from "@/components/message-toast";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FormLayout from "@/components/form-layout";

export default function SignUpCompany() {
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const auth = useContext(AuthContext)

    const router = useRouter();

    const { handleSubmit, watch, formState: { errors }, setValue } = useForm<Company>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: yupResolver(companySchema)
    })

    function applyMask(value: string, fieldName: 'cnpj' | 'telNumber') {
        const onlyNumbers = value.replace(/[^\d]/g, '')
        if (fieldName === 'cnpj') {
            const cnpj = cnpjApplyMask(onlyNumbers)
            return setValue('cnpj', cnpj)
        } else if (fieldName === 'telNumber') {
            const telNumber = telNumberMask(onlyNumbers)
            return setValue('telNumber', telNumber)
        }
    }

    const onSubmit: SubmitHandler<Company> = async () => {
        const data = {
            name: watch('name'),
            cnpj: watch('cnpj'),
            // street: watch('street'),
            // number: watch('number'),
            telNumber: watch('telNumber'),
            email: watch('email'),
            password: watch('password')
        }
        const response = await auth.registerCompany({ ...data })
        if (response.statusCode === 201) {
            setError(null)
            setSuccess('Empresa cadastrada com sucesso.')
            setTimeout(() => {
                router.replace('/login')
            }, 2000)
        } else {
            setSuccess(null)
            setError(response.reject)
        }
    }

    return (
        <FormLayout>
            <View style={stylesInit.componentView}>
                <View style={stylesInit.inputsView}>
                    <Input
                        color={colors.white}
                        label="Nome Fantasia"
                        type="text"
                        placeholder="Digite o nome da sua empresa"
                        onChangeText={(text) => setValue('name', text)}
                    />
                    {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}

                    <Input
                        color={colors.white}
                        label="CNPJ"
                        type="text"
                        placeholder="Digite o CNPJ da sua empresa"
                        value={watch('cnpj')}
                        onChangeText={(value) => applyMask(value, 'cnpj')} />
                    {errors.cnpj && <Text style={{ color: 'red' }}>{errors.cnpj.message}</Text>}

                    {/* <View style={stylesInit.logradouroView}>
                    <View style={{ flex: 4 }}>
                    <Input color={colors.white}
                    label="Logradouro"
                    type="text"
                            placeholder="Digite o logradouro da sua empresa"
                            onChangeText={(text) => setValue('street', text)}
                        />
                        {errors.street && <Text style={{ color: 'red' }}>{errors.street.message}</Text>}
                        </View>
                        
                        <View style={{ flex: 1 }}>
                        <Input color={colors.white}
                            label="Número"
                            type="number"
                            placeholder="n°012"
                            onChangeText={(text) => setValue('number', parseInt(text))}
                        />
                        {errors.number && <Text style={{ color: 'red' }}>{errors.number.message}</Text>}
                    </View>
                </View> */}

                    <Input color={colors.white}
                        label="Telefone"
                        type="text"
                        placeholder="Digite o telefone da sua empresa"
                        onChangeText={(value) => applyMask(value, 'telNumber')}
                        value={watch('telNumber')} />
                    {errors.telNumber && <Text style={{ color: 'red' }}>{errors.telNumber.message}</Text>}

                    <Input color={colors.white}
                        label="E-mail"
                        type="email"
                        placeholder="Digite o e-mail da sua empresa"
                        onChangeText={(text) => setValue('email', text)} />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

                    <Input color={colors.white}
                        label="Senha"
                        type="password"
                        secureTextEntry={true}
                        placeholder="Digite a senha da sua empresa"
                        onChangeText={(text) => setValue('password', text)} />
                    {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}

                    <Input color={colors.white}
                        label="Confirmação de senha"
                        type="password"
                        secureTextEntry={true}
                        placeholder="Confirme sua senha"
                        onChangeText={(text) => setValue('confirmPassword', text)} />
                    {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword.message}</Text>}
                </View>
                <PrimaryButton onPress={handleSubmit(onSubmit)} title="CADASTRAR" />
                {error ? <MessageToast message={error} type="error" /> : success ? <MessageToast message={success} type="success" /> : null}
            </View>
        </FormLayout>
    )
}

export const stylesInit = StyleSheet.create({
    componentView: {
        gap: 20,
        height: '100%',
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
        marginTop: 80
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
    },
})