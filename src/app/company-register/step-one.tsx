import { Input } from "@/components/input";
import { PrimaryButton } from "@/components/primary-button";
import { ScrollView, StyleSheet, View } from "react-native";
import { colors, font } from "@/utils/globals";
import { Company, companySchema } from "@/utils/types";
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { cnpjApplyMask, telNumberMask } from '@/utils/masks'
import { useRouter } from "expo-router";
import { useRegisterForm } from "api/hooks/useRegisterForm";
import { useState } from "react";

export default function SignUpCompany() {
    const router = useRouter();
    const { updateFormData } = useRegisterForm();
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>(undefined);

    const { handleSubmit, watch, formState: { errors }, setValue, control, register, getValues } = useForm<Company>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: yupResolver(companySchema)
    })


    function validationPassword() {
        const { password } = getValues();
        return confirmPassword === password || 'As senhas não coincidem.';
    }


    function applyMask(value: string, fieldName: 'cnpj' | 'phone') {
        const onlyNumbers = value.replace(/[^\d]/g, '')
        if (fieldName === 'cnpj') {
            const cnpj = cnpjApplyMask(onlyNumbers)
            return setValue('cnpj', cnpj)
        } else if (fieldName === 'phone') {
            const phone = telNumberMask(onlyNumbers)
            return setValue('phone', phone)
        }
    }
    
    const onSubmit: SubmitHandler<Company> = async (data: any) => {
        const { confirmPassword, ...rest } = data
        updateFormData({ ...rest });
        router.navigate('/company-register/step-two')
    }


    return (
        <ScrollView>
            <View style={stylesInit.componentView}>
                <View style={stylesInit.inputsView}>
                    <Input
                        {...register('name')}
                        error={errors.name?.message}
                        theme="light"
                        label="Nome Fantasia"
                        icon="briefcase"
                        formProps={{ name: "name", control: control as any }}
                        inputProps={{ 
                            placeholder: 'Digite o nome da sua empresa', 
                            onChangeText: (value) => setValue('name', value),
                            value: watch('name') }}
                    />

                    <Input
                        {...register('cnpj')}
                        error={errors.cnpj?.message}
                        theme="light"
                        label="CNPJ"
                        icon="user"
                        formProps={{ name: "cnpj", control: control as any }}
                        inputProps={{
                            placeholder: 'Digite o CNPJ da sua empresa',
                            keyboardType: 'numeric',
                            onChangeText: (value) => applyMask(value, 'cnpj'),
                            value: watch('cnpj')
                        }}
                    />

                    <Input
                        {...register('phone')}
                        error={errors.phone?.message}
                        theme="light"
                        label="Contato"
                        icon="phone"
                        formProps={{ name: "phone", control: control as any }}
                        inputProps={{
                            placeholder: 'Digite o número da sua empresa',
                            keyboardType: 'phone-pad',
                            onChangeText: (value) => applyMask(value, 'phone'),
                            value: watch('phone')
                        }}
                    />

                    <Input
                        {...register('email')}
                        error={errors.email?.message}
                        theme="light"
                        label="E-mail"
                        icon="mail"
                        formProps={{ name: "email", control: control as any }}
                        inputProps={{ 
                            placeholder: 'Digite o e-mail da sua empresa', 
                            keyboardType: 'email-address', 
                            value: watch('email'),
                            onChangeText: (value) => setValue('email', value) }}
                    />

                    <Input
                        {...register('password')}
                        error={errors.password?.message}
                        theme="light"
                        label="Senha"
                        formProps={{ name: "password", control: control as any, rules: { required: 'Senha é obrigatória' } }}
                        inputProps={{
                            placeholder: 'Digite uma senha',
                            secureTextEntry: true,
                            value: watch('password'),
                            onChangeText: (value) => setValue('password', value)
                        }}
                        icon="lock"
                    />

                    <Input
                        icon="lock"
                        inputProps={{ placeholder: 'Confirme sua senha', secureTextEntry: true, onChangeText: (value) => setConfirmPassword(value) }}
                        formProps={{
                            name: 'confirmPassword', control: control as any,
                            rules: { validate: validationPassword, required: 'Confirmação de senha é obrigatória' }
                        }} />

                </View>
                <PrimaryButton onPress={handleSubmit(onSubmit)} title="PRÓXIMO" />
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