import { ScrollView, StyleSheet, Text, View } from "react-native";
import { stylesInit } from "../company-register/step-one";
import { Input } from "@/components/input";
import { PrimaryButton } from "@/components/primary-button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, userSchema } from "@/utils/types";
import { cpfApplyMask, telNumberMask } from "@/utils/masks";
import { useRouter } from "expo-router";
import { useRegisterForm } from "api/hooks/useRegisterForm";
import { useState } from "react";


export default function RegisterUserStepOne() {
    const router = useRouter();
    const { updateFormData } = useRegisterForm();
    const [confirmPassword, setConfirmPassword] = useState<string | undefined>(undefined);

    const { watch, formState: { errors }, setValue, handleSubmit, control, register, getValues } = useForm<User>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: yupResolver(userSchema)
    })

    function applyMask(value: string, fieldName: 'cpf' | 'phone') {
        const onlyNumbers = value.replace(/[^\d]/g, '')
        if (fieldName === 'cpf') {
            const cpf = cpfApplyMask(onlyNumbers)
            return setValue('cpf', cpf)
        } else if (fieldName === 'phone') {
            const tel = telNumberMask(onlyNumbers)
            return setValue('phone', tel)
        }
    }

    function validationPassword() {
        const { password } = getValues();
        return confirmPassword === password || 'As senhas não coincidem.';
    }

    const onSubmit: SubmitHandler<User> = async (data: any) => {
        const { confirmPassword, ...rest } = data
        updateFormData({ ...rest });
        router.navigate('/user-register/step-two')
    }
    return (
        <ScrollView>
            <View style={stylesInit.componentView}>
                <View style={stylesInit.inputsView}>
                    <View style={stylesInit.logradouroView}>
                        <View style={{ flex: 1 }}>
                            <Input
                                label="Nome"
                                {...register('name')}
                                error={errors.name?.message}
                                icon="user"
                                inputProps={{ placeholder: 'Nome', onChangeText: (value) => setValue('name', value), value: watch('name') }}
                                formProps={{ name: 'name', control: control as any }} />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Input
                                label="Sobrenome"
                                {...register('lastName')}
                                error={errors.lastName?.message}
                                icon="user"
                                inputProps={{ placeholder: 'Sobrenome', onChangeText: (value) => setValue('lastName', value), value: watch('lastName') }}
                                formProps={{ name: 'lastName', control: control as any }} />
                        </View>
                    </View>

                    <Input
                        label="CPF"
                        {...register('cpf')}
                        error={errors.cpf?.message}
                        icon="info"
                        inputProps={{
                            placeholder: 'Digite seu CPF',
                            onChangeText: (value) => applyMask(value, 'cpf'),
                            value: watch('cpf'),
                            keyboardType: 'numeric'
                        }}
                        formProps={{ name: 'cpf', control: control as any }} />
                    <Input
                        label="E-mail"
                        {...register('email')}
                        error={errors.email?.message}
                        icon="mail"
                        inputProps={{
                            placeholder: 'Digite seu e-mail',
                            onChangeText: (value) => setValue('email', value),
                            value: watch('email'),
                            keyboardType: 'email-address'
                        }}
                        formProps={{ name: 'email', control: control as any }} />

                    <Input
                        label="Telefone"
                        {...register('phone')}
                        error={errors.phone?.message}
                        icon="phone"
                        inputProps={{
                            placeholder: 'Digite seu telefone',
                            onChangeText: (value) => applyMask(value, 'phone'),
                            value: watch('phone'),
                            keyboardType: 'phone-pad'
                        }}
                        formProps={{ name: 'telNumber', control: control as any }} />

                    <Input
                        label="Senha"
                        {...register('password')}
                        error={errors.password?.message}
                        icon="lock"
                        inputProps={{ placeholder: 'Digite sua senha', secureTextEntry: true, onChangeText: (value) => setValue('password', value) }}
                        formProps={{ name: 'password', control: control as any }} />

                    <Input
                        icon="lock"
                        inputProps={{ placeholder: 'Confirme sua senha', secureTextEntry: true, onChangeText: (value) => setConfirmPassword(value) }}
                        formProps={{
                            name: 'confirmPassword', control: control as any,
                            rules: { validate: validationPassword, required: 'Confirmação de senha é obrigatória' }
                        }} />

                    <PrimaryButton
                        style={styles.button}
                        onPress={handleSubmit(onSubmit)}
                        title="PRÓXIMO" />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 500
    }
})

