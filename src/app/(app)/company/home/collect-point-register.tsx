import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { StyleSheet, Text, View } from "react-native"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Input } from "@/components/input"
import { globalsStyles } from "@/globals-styles"
import { useMemo, useState } from "react"
import { RadioButton, RadioGroup } from "react-native-radio-buttons-group"
import { PrimaryButton } from "@/components/primary-button"
import { ScrollView } from "react-native-gesture-handler"
import { useCollectPointCompany } from "api/hooks/useCollectPointCompany"
import { CollectPoint, collectPointSchema, UrbanSolidWasteCategory } from "@/utils/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { StatusCode } from "api/client/IHttpClient"
import Toast from "react-native-toast-message"
import { router } from "expo-router"
import { telNumberMask } from "@/utils/masks"
import { useLocalSearchParams } from "expo-router"
import { formatUrbanSolidWasteCategory } from "@/utils/utils"
import { RadioButtonGroupControlled } from "@/components/radio-button-group-controlled"

export default function CollectPointRegister() {
  const { mode, initialData } = useLocalSearchParams();
  const isEditMode = mode === 'edit';
  const parsedData = initialData ? JSON.parse(initialData as string) : undefined;

  const {
    formState: { errors },
    setValue,
    handleSubmit,
    register,
    control } = useForm<CollectPoint>({
      mode: 'all',
      reValidateMode: 'onChange',
      resolver: yupResolver(collectPointSchema),
      defaultValues: parsedData
    })
  const { registerCollectPoint, updateCollectPoint } = useCollectPointCompany();

  const onSubmit: SubmitHandler<CollectPoint> = async (data: any) => {
    if (!isEditMode) {
      const response = await registerCollectPoint(data);
      if (response.statusCode === StatusCode.Created) {
        Toast.show({
          type: 'success',
          text1: `${response.resolve}`,
          position: 'top',
          visibilityTime: 2000
        })
        setTimeout(() => {
          router.back()
        }, 2000)
      } else {
        Toast.show({
          type: 'error',
          text1: `${response.reject}`,
          position: 'top',
          visibilityTime: 2000
        })
      }
    } else {
      if (parsedData.pointUUID) {
        const response = await updateCollectPoint(parsedData.pointUUID, data);
        if (response.statusCode === StatusCode.Ok) {
          Toast.show({
            type: 'success',
            text1: 'Ponto de coleta atualizado com sucesso.',
            position: 'top',
            visibilityTime: 2000
          })
          setTimeout(() => {
            router.back()
          }, 2000)
        } else {
          Toast.show({
            type: 'error',
            text1: `${response.reject}`,
            position: 'top',
            visibilityTime: 2000
          })
        }
      }
    }
  }

  return (
    <ScrollView>
      <View style={style.container}>
        <Text style={globalsStyles.titlePrimary}> {isEditMode ? 'EDITAR PONTO DE COLETA' : 'CADASTRO DO PONTO DE COLETA'}</Text>

        <View style={style.formView}>
          <View style={style.inputView}>
            <Text style={globalsStyles.text}>Nome do estabelecimento:</Text>
            <Input
              {...register('name')}
              error={errors.name?.message}
              theme="light"
              inputProps={{
                onChangeText: (text) => setValue('name', text),
                placeholder: 'Nome do Ponto de Coleta'
              }}
              formProps={{ name: 'name', control: control as any }} />
          </View>

          <View style={style.inputView}>
            <Text style={globalsStyles.text}>Contato:</Text>
            <Input
              {...register('phone')}
              error={errors.phone?.message}
              theme="light"
              inputProps={{
                onChangeText: (text) => setValue('phone', telNumberMask(text)),
                placeholder: '(00) 00000-0000',
                keyboardType: 'phone-pad'
              }}
              formProps={{ name: 'phone', control: control as any }} />
          </View>

          <View style={style.inputView}>
            <Text style={globalsStyles.text}>Logradouro:</Text>
            <Input
              {...register('street')}
              error={errors.street?.message}
              theme="light"
              inputProps={{
                onChangeText: (text) => setValue('street', text),
                placeholder: 'Endereço do Ponto de Coleta'
              }}
              formProps={{ name: 'street', control: control as any }} />
          </View>

          <View style={style.inputView}>
            <Text style={globalsStyles.text}>Número</Text>
            <Input
              {...register('number')}
              error={errors.number?.message}
              theme="light"
              inputProps={{
                onChangeText: (text) => setValue('number', Number(text)),
                placeholder: 'nº012',
                keyboardType: 'phone-pad'
              }}
              formProps={{ name: 'number', control: control as any }} />
          </View>

          <View style={style.inputView}>
            <Text style={globalsStyles.text}>CEP:</Text>
            <Input
              {...register('cep')}
              error={errors.cep?.message}
              theme="light"
              inputProps={{
                onChangeText: (text) => setValue('cep', text),
                placeholder: '00000-000',
                keyboardType: 'phone-pad'
              }}
              formProps={{ name: 'cep', control: control as any }} />
          </View>

          <View style={style.inputView}>
            <Text style={globalsStyles.text}>Selecione a categoria de resíduos que o ponto de coleta irá receber.</Text>
            <RadioButtonGroupControlled
              control={control}
              name="urbanSolidWaste"
              error={errors.urbanSolidWaste?.message}
              radioGroupType="point" />
          </View>
        </View>

        <PrimaryButton onPress={handleSubmit(onSubmit)} title={isEditMode ? 'ATUALIZAR' : 'CADASTRAR'} />
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 42
  },
  inputView: {
    gap: 6,
    marginBottom: 12
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  formView: {
    marginTop: 12
  }
})