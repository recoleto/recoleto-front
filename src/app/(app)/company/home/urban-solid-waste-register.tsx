import { Input } from "@/components/input";
import { PrimaryButton } from "@/components/primary-button";
import { RadioButtonGroupControlled } from "@/components/radio-button-group-controlled";
import { globalsStyles } from "@/globals-styles";
import { urbanSolidWasteSchema, UrbanSolidWaste, UrbanSolidWasteType } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { StatusCode } from "api/client/IHttpClient";
import { useUrbanSolidWaste } from "api/hooks/useUrbanSolidWaste";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function RegisterUrbanSolidWaste() {
    const { control, register, handleSubmit, formState: { errors }, setValue } = useForm<UrbanSolidWaste>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: yupResolver(urbanSolidWasteSchema),
    });

    const { registerUrbanSolidWaste } = useUrbanSolidWaste();

    const onSubmit: SubmitHandler<UrbanSolidWaste> = async (data) => {
        const response = await registerUrbanSolidWaste(data as UrbanSolidWasteType);
        if (response.statusCode === StatusCode.Created) {
            Toast.show({
                type: 'success',
                text1: 'Resíduo cadastrado com sucesso!',
                visibilityTime: 3000
            })
            setTimeout(() => {
                setValue('name', '');
                setValue('points', 0);
                setValue('type', '');
                
            }, 3000)
        } else {
            Toast.show({
                type: 'error',
                text1: 'Erro ao cadastrar resíduo',
                visibilityTime: 3000
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={globalsStyles.titlePrimary}>CADASTRO DE RESÍDUOS SÓLIDOS URBANOS</Text>

            <View style={styles.inputView}>
                <View>
                    <Text style={globalsStyles.text}>Nome do resíduo:</Text>
                    <Input
                        error={errors.name?.message}
                        {...register('name')}
                        formProps={{
                            name: 'name',
                            control: control as any
                        }}
                        inputProps={{
                            placeholder: 'Nome do resíduo',
                            onChangeText: (text) => setValue('name', text)
                        }} />
                </View>

                <View>
                    <Text style={globalsStyles.text}>Pontos do resíduo:</Text>
                    <Input
                        error={errors.points?.message}
                        {...register('points')}
                        formProps={{
                            name: 'points',
                            control: control as any
                        }}
                        inputProps={{
                            placeholder: 'Quantos pontos esse resíduo vale',
                            keyboardType: 'numeric',
                            onChangeText: (text) => setValue('points', Number(text))
                        }} />
                </View>

                <View>
                    <Text style={globalsStyles.text}>Selecione a categoria que o resíduo pertence.</Text>
                    <RadioButtonGroupControlled
                        error={errors.type?.message as string}
                        radioGroupType="urban-solid-waste"
                        control={control}
                        {...register('type')} />
                </View>

                <PrimaryButton
                    title="CADASTRAR"
                    onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 42,
    },
    inputView: {
        paddingHorizontal: 24,
        gap: 12
    }
})