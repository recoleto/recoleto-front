import { Input } from "@/components/input";
import { ProfileLayout } from "@/components/profile-layout";
import { globalsStyles } from "@/globals-styles";
import { useGetUser } from "api/hooks/useGetUser";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { profileStyles } from "../company/profile";
import { PrimaryButton } from "@/components/primary-button";

export default function AdminProfile() {
    const { user, logOut } = useGetUser();
    const { control } = useForm();
    return (
        <ProfileLayout>
            <Text style={globalsStyles.title}>Perfil do Admin:</Text>
            <Text style={globalsStyles.text}>Aqui você pode visualizar as informações do seu perfil.</Text>

            <View style={profileStyles.formView}>
                <View style={profileStyles.inputView}>
                    <Text style={globalsStyles.text}>Nome:</Text>
                    <Input formProps={{
                        name: 'name',
                        control
                    }} inputProps={{
                        editable: false,
                        value: user?.name
                    }} />
                </View>

                <View style={profileStyles.inputView}>
                    <Text style={globalsStyles.text}>Sobrenome:</Text>
                    <Input formProps={{
                        name: 'lastName',
                        control
                    }} inputProps={{
                        editable: false,
                        value: user?.lastName
                    }} />
                </View>

                <View style={profileStyles.inputView}>
                    <Text style={globalsStyles.text}>E-mail:</Text>
                    <Input formProps={{
                        name: 'email',
                        control
                    }} inputProps={{
                        editable: false,
                        value: user?.email
                    }} />
                </View>
                <PrimaryButton onPress={logOut} title="Sair" />
            </View>
        </ProfileLayout>
    )
}
