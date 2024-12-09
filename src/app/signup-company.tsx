import GoBack from "@/globals/back";
import { Input } from "@/globals/input";
import { PrimaryButton } from "@/globals/primary-button";
import { useContext, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, font } from "utils/globals";
import { Company, companySchema, CompanyType } from "utils/types";
import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthContext } from "context/auth";
import { yupResolver } from '@hookform/resolvers/yup'


export default function SignUpCompany() {
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const auth = useContext(AuthContext)

    const { handleSubmit, watch, formState: { errors }, setValue } = useForm<Company>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: yupResolver(companySchema)
    })

    const onSubmit: SubmitHandler<Company> = async () => {
        const data = {
            name: watch('fantasyName'),
            cnpj: watch('cnpj'),
            street: watch('street'),
            number: watch('number'),
            telNumber: watch('telNumber'),
            email: watch('email'),
            password: watch('password')
        }

        const response = await auth.registerCompany(data as CompanyType)
        if (response.statusCode === 201) {
            setSuccess('Empresa cadastrada com sucesso.')
        } else {
            setError('Algo deu errado.')
        }
    }

    return (
        <View style={stylesInit.componentView}>
            <View style={stylesInit.logoView}>
                <GoBack />
                <Text style={stylesInit.title}>REGISTRO DE EMPRESA</Text>
                <Image style={stylesInit.image} source={require('../../assets/images/logo-w-name.png')} />
                <Text style={stylesInit.text}>Registre-se para usar a plataforma</Text>
            </View>

            <View style={stylesInit.inputsView}>
                <Input
                    color={colors.white}
                    label="Nome Fantasia"
                    type="text"
                    placeholder="Digite o nome da sua empresa"
                    onChangeText={(text) => setValue('fantasyName', text)}
                />
                {errors.fantasyName && <Text style={{ color: 'red' }}>{errors.fantasyName.message}</Text>}

                <Input
                    color={colors.white}
                    label="CNPJ"
                    type="text"
                    placeholder="Digite o CNPJ da sua empresa"
                    onChangeText={(text) => setValue('cnpj', text)} />
                {errors.cnpj && <Text style={{ color: 'red' }}>{errors.cnpj.message}</Text>}

                <View style={stylesInit.logradouroView}>
                    <View style={{flex: 4}}> 
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

                </View>
                <Input color={colors.white}
                    label="Telefone"
                    type="text"
                    placeholder="Digite o telefone da sua empresa"
                    onChangeText={(text) => setValue('telNumber', text)}
                />
                {errors.telNumber && <Text style={{ color: 'red' }}>{errors.telNumber.message}</Text>}
                <Input color={colors.white}
                    label="E-mail"
                    type="email"
                    placeholder="Digite o e-mail da sua empresa"
                    onChangeText={(text) => setValue('email', text)}
                />
                {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                <Input color={colors.white}
                    label="Senha"
                    type="password"
                    secureTextEntry={true}
                    placeholder="Digite a senha da sua empresa"
                    onChangeText={(text) => setValue('password', text)}
                />
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
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : <Text style={{ color: 'green' }}>{success}</Text>}
        </View>
    )
}

export const stylesInit = StyleSheet.create({
    componentView: {
        gap: 20,
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
    },
    errors: {

    }
})