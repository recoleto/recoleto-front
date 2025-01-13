import { ScrollView, StyleSheet, Text, View } from "react-native";
import { stylesInit } from "../signup-company";
import { Input } from "@/components/input";
import { PrimaryButton } from "@/components/primary-button";
import { MessageToast } from "@/components/message-toast";
import { useState, useEffect, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Address, addressBaseSchema, UserType } from "@/utils/types";
import axios from "axios";
import { useRegisterForm } from "api/hooks/useRegisterForm";
import { AuthContext } from "api/context/auth";
import { router } from "expo-router";

export default function RegisterUserStepTwo() {
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [city, setCity] = useState<string | null>(null);
    const [state, setState] = useState<string | null>(null);
    const [neighborhood, setNeighborhood] = useState<string | null>(null);
    const { updateFormData, registerFormData } = useRegisterForm();

    const { registerUser } = useContext(AuthContext);

    const { formState: { errors }, setValue, handleSubmit, control, watch } = useForm<Address>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: yupResolver(addressBaseSchema),
    });

    const cep = watch("cep");

    const fetchAddressByCEP = async (cep: string) => {
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                if (response.data.erro) {
                    setError("CEP não encontrado.");
                    return;
                }

                setCity(response.data.localidade);
                setState(response.data.uf);
                setNeighborhood(response.data.bairro);
                setValue("street", response.data.logradouro);
            } catch (error) {
                setError("Não foi possível buscar o endereço.");
            }
        }
    };

    // Chama a API quando o CEP tem 8 dígitos
    useEffect(() => {
        if (cep && cep.length === 8) {
            fetchAddressByCEP(cep);
        } else if (cep && cep.length < 8) {
            setCity(null);
            setState(null);
            setNeighborhood(null);
        }
    }, [cep]);

    const onSubmit: SubmitHandler<Address> = async (data: any) => {
        const { confirmPassword, ...rest } = data;
        updateFormData({
            cep: rest.cep,
            street: rest.street,
            number: rest.number,
        });

        const response = await registerUser({ ...registerFormData } as UserType);
        console.log(response.reject);
        if (response.statusCode === 201) {
            setError(null);
            setSuccess("Usuário cadastrado com sucesso.");
            setTimeout(() => {
                router.replace("/");
            }, 2000);
        } else {
            setSuccess(null);
            setError(response.reject);
        }

    };

    return (
        <ScrollView>
            <View style={stylesInit.componentView}>
                <Text style={stylesInit.title}>Estamos quase lá!</Text>
                <Text style={stylesInit.text}>
                    Agora precisamos de algumas informações sobre seu endereço, para finalizar o cadastro.
                </Text>
                <View style={stylesInit.inputsView}>
                    <Input
                        error={errors.cep?.message}
                        label="CEP"
                        icon="map-pin"
                        inputProps={{
                            placeholder: 'Digite o CEP do endereço',
                            onChangeText: (value) => setValue("cep", value),
                            keyboardType: "numeric",
                        }}
                        formProps={{ name: "cep", control: control as any }}
                    />
                    <Input
                        error={errors.street?.message}
                        label="Logradouro"
                        icon="map-pin"
                        inputProps={{
                            placeholder: "Digite seu logradouro",
                            onChangeText: (value) => setValue("street", value),
                        }}
                        formProps={{ name: "street", control: control as any }}
                    />
                    <Input
                        error={errors.number?.message}
                        label="Número"
                        icon="map-pin"
                        inputProps={{
                            placeholder: "Digite o número do endereço",
                            onChangeText: (value) => setValue("number", value),
                            keyboardType: "numeric",
                        }}
                        formProps={{ name: "number", control: control as any }}
                    />

                    <Input
                        label="Bairro"
                        icon="map-pin"
                        inputProps={{
                            placeholder: "Digite o CEP para buscar o bairro",
                            editable: false,
                            value: neighborhood || undefined,
                        }}
                        formProps={{ name: "neighborhood", control: control as any }}
                    />

                    <Input
                        icon="info"
                        label="Cidade"
                        inputProps={{
                            placeholder: "Digite o CEP para buscar a cidade",
                            editable: false,
                            value: city || undefined,
                        }}
                        formProps={{ name: "city", control: control as any }}
                    />
                    <Input
                        icon="info"
                        label="Estado"
                        inputProps={{
                            placeholder: "Digite o CEP para buscar o estado",
                            editable: false,
                            value: state || undefined,
                        }}
                        formProps={{ name: "state", control: control as any }}
                    />
                    <PrimaryButton
                        style={styles.button}
                        onPress={handleSubmit(onSubmit)}
                        title="REGISTRAR"
                    />
                </View>
                {error ? (
                    <MessageToast message={error} type="error" />
                ) : success ? (
                    <MessageToast message={success} type="success" />
                ) : null}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 500,
    },
});
