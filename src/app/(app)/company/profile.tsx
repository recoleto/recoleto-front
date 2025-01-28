import { ScrollView } from "react-native-gesture-handler";
import { MainLayout } from "@/components/main-layout";
import { StyleSheet, Text, View } from "react-native";
import { globalsStyles } from "@/globals-styles";
import { Input } from "@/components/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { colors, font } from "@/utils/globals";
import { PrimaryButton } from "@/components/primary-button";
import { companyProfileSchema, CompanyProfileType } from "@/utils/types";
import { StatusCode } from "api/client/IHttpClient";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { telNumberMask } from "@/utils/masks";
import { BaseDialog } from "@/components/dialog";
import { useGetCompany } from "api/hooks/useGetCompany";

export default function CompanyProfile() {
  const { register, formState: { errors }, handleSubmit, setValue, control, reset } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(companyProfileSchema),
  });

  const { company, fetchCompany, disableAccount, updateCompany, logOut } = useGetCompany();

  useEffect(() => {
    if(company) {
      reset({
        name: company.name,
        phone: company.phone,
        email: company.email,
        cnpj: company.cnpj,
        street: company.street,
        cep: company.cep,
        number: company.number,
      });
    }
  }, [company, reset]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModal = () => setIsOpen(!isOpen);

  async function handleDisableAccount() {
    const response = await disableAccount();
    if (response.statusCode === StatusCode.Ok) {
      Toast.show({
        type: 'success',
        text1: `${response.resolve}`,
        position: 'top',
        visibilityTime: 3000,
      })
    } else {
      Toast.show({
        type: 'error',
        text1: `${response.reject}`,
        position: 'top',
        visibilityTime: 3000,
      })
    }
  }

  const onSubmit: SubmitHandler<CompanyProfileType> = async (data: CompanyProfileType) => {
    const response = await updateCompany(data);
    if (response.statusCode === StatusCode.Ok) {
      Toast.show({
        type: 'success',
        text1: `${response.resolve}`,
        position: 'top',
        visibilityTime: 3000,
      })
      fetchCompany();
    } else {
      Toast.show({
        type: 'error',
        text1: `${response.reject}`,
        position: 'top',
        visibilityTime: 3000,
      })
    }
  }

  return (
    <ScrollView>
      <MainLayout>
        <Text style={globalsStyles.title}>Informações do usuário</Text>

        <View style={profileStyles.formView}>
          <View style={profileStyles.inputView}>
            <Text style={globalsStyles.text}>Primeiro nome:</Text>
            <Input
              {...register('name')}
              error={errors.name?.message}
              inputProps={{
                onChangeText: (text) => setValue('name', text),
                placeholder: 'Digite seu nome'
              }}
              formProps={{
                control: control as any,
                name: 'name'
              }} />
          </View>


          <View style={profileStyles.inputView}>
            <Text style={globalsStyles.text}>Email:</Text>
            <Input
              {...register('email')}
              error={errors.email?.message}
              inputProps={{
                onChangeText: (text) => setValue('email', text),
                placeholder: 'Digite seu e-mail'
              }}
              formProps={{
                control: control as any,
                name: 'email'
              }} />
          </View>

          <View style={profileStyles.inputView}>
            <Text style={globalsStyles.text}>Telefone:</Text>
            <Input
              {...register('phone')}
              error={errors.phone?.message}
              inputProps={{
                onChangeText: (text) => setValue('phone', telNumberMask(text)),
                placeholder: 'Digite seu telefone'
              }}
              formProps={{
                control: control as any,
                name: 'phone'
              }} />
          </View>

          <View style={profileStyles.inputView}>
            <Text style={globalsStyles.text}>CNPJ:</Text>
            <Input
              {...register('cnpj')}
              error={errors.cnpj?.message}
              inputProps={{
                onChangeText: (text) => setValue('cnpj', text),
                placeholder: 'Digite seu CNPJ',
                editable: false
              }}
              formProps={{
                control: control as any,
                name: 'cnpj'
              }} />
          </View>

          <Text style={globalsStyles.title}>Informações de endereço</Text>

          <View style={profileStyles.inputView}>
            <Text style={globalsStyles.text}>Logradouro:</Text>
            <Input
              {...register('street')}
              error={errors.street?.message}
              inputProps={{
                onChangeText: (text) => setValue('street', text),
                placeholder: 'Digite seu logradouro'
              }}
              formProps={{
                control: control as any,
                name: 'street'
              }} />
          </View>

          <View style={profileStyles.inputView}>
            <Text style={globalsStyles.text}>Número:</Text>
            <Input
              {...register('number')}
              error={errors.number?.message}
              inputProps={{
                onChangeText: (text) => setValue('number', text),
                placeholder: 'Digite o número'
              }}
              formProps={{
                control: control as any,
                name: 'number'
              }} />
          </View>

          <View style={profileStyles.inputView}>
            <Text style={globalsStyles.text}>CEP:</Text>
            <Input
              {...register('cep')}
              error={errors.cep?.message}
              inputProps={{
                onChangeText: (text) => setValue('cep', text),
                placeholder: 'Digite seu CEP'
              }}
              formProps={{
                control: control as any,
                name: 'cep'
              }} />
          </View>
        </View>

        <View style={profileStyles.buttons}>
          <PrimaryButton title="SALVAR" onPress={handleSubmit(onSubmit)} />
          <PrimaryButton onPress={handleModal} title="EXCLUIR CONTA" />
          <PrimaryButton onPress={logOut} title="SAIR" />
        </View>
        <BaseDialog
          title="Deseja desativar sua conta?"
          message="Ao desativar sua conta, você não poderá mais acessar o aplicativo."
          onPressAction={handleDisableAccount}
          isOpen={isOpen}
          setIsOpen={handleModal} />
      </MainLayout>
    </ScrollView>
  );
}

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green200,
  },
  header: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    color: colors.white,
    fontSize: font.size.large,
    fontFamily: font.family.semiBold,
  },
  content: {
    flex: 3.5,
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    gap: 20
  },
  formView: {
    gap: 8
  },
  contentText: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  buttons: {
    display: "flex",
    gap: 10,
  },
  inputView: {
    gap: 6,
    marginBottom: 12
  },
});