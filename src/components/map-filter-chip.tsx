import { UrbanSolidWasteCategory } from "@/utils/types";
import { formatUrbanSolidWasteCategory } from "@/utils/utils";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { border, colors } from "@/utils/globals";
import { ScrollView } from "react-native-gesture-handler";


type ChipItemType = {
    name: string | undefined;
    icon: keyof typeof MaterialIcons.glyphMap;
}

const chipItems: ChipItemType[] = [
    {
        name: formatUrbanSolidWasteCategory(UrbanSolidWasteCategory.LIXO_ELETRONICO),
        icon: 'track-changes',
    },
    {
        name: formatUrbanSolidWasteCategory(UrbanSolidWasteCategory.RESIDUOS_CONTAMINANTES),
        icon: 'biotech',
    },
    {
        name: formatUrbanSolidWasteCategory(UrbanSolidWasteCategory.RESIDUOS_CORTANTES),
        icon: 'style',
    },
    {
        name: formatUrbanSolidWasteCategory(UrbanSolidWasteCategory.OLEO_DE_COZINHA),
        icon: 'oil-barrel',
    }
];

export function MapFilterChip() {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
            {chipItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.chip}>
                    <MaterialIcons name={item.icon} size={20} color={colors.lemon100} />
                    <Text style={styles.chipText}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        position: 'absolute',
        margin: 10,
    },
    chip: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: border.radius.round,
        padding: 10,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    chipText: {
        fontSize: 16,
        marginLeft: 5,
    }
})