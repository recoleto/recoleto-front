import { Input } from "@/globals/input";
import { Image, View } from "react-native";
import { colors } from "utils/globals";

export default function Login() {
    return (
        <View>
            <View>
                <Image source={require('../../assets/images/logo-w-name.png')} />
            </View>
            <Input label='Email' type='email' placeholder='Digite seu email' color={colors.white} />
            <Input label='Senha' type='password' placeholder='Digite sua senha' color={colors.white} />
        </View>
    )
}