import { Input } from "@/components/input";
import { PrimaryButton } from "@/components/primary-button";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, font } from "@/utils/globals";
import { Company, companySchema } from "@/utils/types";
import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthContext } from "api/context/auth";
import { yupResolver } from '@hookform/resolvers/yup'
import { cnpjApplyMask, telNumberMask } from '@/utils/masks'
import { MessageToast } from "@/components/message-toast";
import { useRouter } from "expo-router";
import { register } from "module";

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

    console.log(errors)

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

    const { control } = useForm()

    return (
        <ScrollView>
            <View style={stylesInit.componentView}>
                <View style={stylesInit.inputsView}>
                    <Input
                        error={errors.name?.message}
                        theme="light"
                        label="Nome Fantasia"
                        icon="briefcase"
                        formProps={{ name: "fantasyName", control }}
                        inputProps={{ placeholder: 'Digite o nome da sua empresa' }}
                    />

                    <Input
                        theme="light"
                        label="CNPJ"
                        icon="user"
                        formProps={{ name: "cnpj", control }}
                        inputProps={{ placeholder: 'Digite o CNPJ da sua empresa', keyboardType: 'numeric' }}
                    />

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

                    <Input
                        theme="light"
                        label="Contato"
                        icon="phone"
                        formProps={{ name: "phoneNumber", control }}
                        inputProps={{ placeholder: 'Digite o número da sua empresa', keyboardType: 'phone-pad' }}
                    />

                    <Input
                        theme="light"
                        label="E-mail"
                        icon="mail"
                        formProps={{ name: "email", control }}
                        inputProps={{ placeholder: 'Digite o e-mail da sua empresa', keyboardType: 'email-address' }}
                    />

                    <Input
                        theme="light"
                        label="Senha"
                        formProps={{ name: "fantasyName", control, rules: { required: 'Senha é obrigatória' } }}
                        inputProps={{ placeholder: 'Digite uma senha', secureTextEntry: true }}
                        icon="lock"
                    />

                    <Input
                        theme="light"
                        label="Confirme a senha"
                        formProps={{ name: "fantasyName", control }}
                        inputProps={{ placeholder: 'Digite o nome da sua empresa', secureTextEntry: true }}
                        icon="lock"
                    />
                </View>
                <PrimaryButton onPress={handleSubmit(onSubmit)} title="CADASTRAR" />
                {error ? <MessageToast message={error} type="error" /> : success ? <MessageToast message={success} type="success" /> : null}
            </View>
        </ScrollView>
    )
}

export const stylesInit = StyleSheet.create({
    componentView: {
        gap: 20,
        height: '100%',
        marginHorizontal: 20,
        paddingTop: 24
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
    },
})