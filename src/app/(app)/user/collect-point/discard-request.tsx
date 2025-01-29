import { Input } from "@/components/input";
import { PrimaryButton } from "@/components/primary-button";
import { globalsStyles } from "@/globals-styles";
import { border, colors, font } from "@/utils/globals";
import { formatUrbanSolidWasteCategory } from "@/utils/utils";
import { useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-radio-buttons-group";

export default function DiscardRequest() {
    const { loc } = useLocalSearchParams();
    const parsedLoc = typeof loc === 'string' ? JSON.parse(loc) : loc;
    console.log(parsedLoc);
    return (
        <View style={styles.container}>
            <Text style={globalsStyles.titlePrimary}>SOLICITAÇÃO DE DESCARTE</Text>
            <View style={styles.requestView}>
                <View style={styles.collectPointInfoView}>
                    <Text style={styles.collectPointInfoText}>{parsedLoc.name}</Text>
                    <Text style={styles.collectPointAddress}>{parsedLoc.street}, {parsedLoc.number} - {parsedLoc.cep}</Text>
                    <Text style={styles.collectPointInfoText}>Categoria: {formatUrbanSolidWasteCategory(parsedLoc.urbanSolidWasteEnum)}</Text>
                    <Text style={styles.collectPointInfoText}>Contato: {parsedLoc.phone}</Text>
                </View>
                <Text style={globalsStyles.text}>Categoria:</Text>
                <RadioButton id="1" label={formatUrbanSolidWasteCategory(parsedLoc.urbanSolidWasteEnum)} selected  containerStyle={{margin: 0}} />
                <View>
                <Text style={globalsStyles.text}>Itens:</Text>
                <PrimaryButton title="Adicionar Resíduo" onPress={() => {}} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50
    },
    requestView: {
        paddingHorizontal: 20,
    },
    collectPointInfoView: {
        backgroundColor: colors.green400,
        padding: 12,
        borderRadius: border.radius.medium
    },
    collectPointInfoText: {
        color: colors.white,
        fontSize: font.size.regular,
        fontFamily: font.family.regular,
    },
    collectPointAddress: {
        color: colors.grey100,
        fontSize: font.size.small,
        fontFamily: font.family.regular
    }
})