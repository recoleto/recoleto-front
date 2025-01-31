import { UrbanSolidWasteRequest } from "@/utils/types";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { globalsStyles } from "@/globals-styles";
import { border } from "@/utils/globals";

type WasteCardProps = UrbanSolidWasteRequest & {
    onRemove: () => void;
};

export function WasteCard({ onRemove, ...waste }: WasteCardProps) {

    return (
        <View style={styles.cardView}>
            <View style={styles.textView}>
                <Text style={globalsStyles.text}>Item: {waste.name}</Text>
                <Text style={globalsStyles.text}>Quantidade: {waste.quantity}</Text>
            </View>
            <TouchableOpacity onPress={onRemove}>
            <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'white',
        borderRadius: border.radius.medium,
        position: 'relative',
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 2,
    },
    textView: {
        gap: 3,
    },
})