import { UrbanSolidWasteCategory } from "@/utils/types";
import { formatUrbanSolidWasteCategory } from "@/utils/utils";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { border, colors } from "@/utils/globals";
import { ScrollView } from "react-native-gesture-handler";
import { useCategory } from "@/contexts/map-filter-context";


type ChipItemType = {
    name: UrbanSolidWasteCategory;
    icon: keyof typeof MaterialIcons.glyphMap;
}

const chipItems: ChipItemType[] = [
    {
        name: UrbanSolidWasteCategory.TODOS,
        icon: 'all-inclusive',
    },
    {
        name: UrbanSolidWasteCategory.LIXO_ELETRONICO,
        icon: 'track-changes',
    },
    {
        name: UrbanSolidWasteCategory.RESIDUOS_CONTAMINANTES,
        icon: 'biotech',
    },
    {
        name: UrbanSolidWasteCategory.RESIDUOS_CORTANTES,
        icon: 'style',
    },
    {
        name: UrbanSolidWasteCategory.OLEO_DE_COZINHA,
        icon: 'oil-barrel',
    }
];

export function MapFilterChip() {
    const { setSelectedCategory, selectedCategory } = useCategory();

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
            {chipItems.map((item, index) =>
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.chip,
                        selectedCategory === item.name && { backgroundColor: colors.lemon100 }]}
                    onPress={() => {
                        setSelectedCategory(item.name === undefined ? UrbanSolidWasteCategory.TODOS : item.name)
                    }}>

                    <MaterialIcons name={item.icon} size={20} color={selectedCategory === item.name ? colors.white : colors.lemon100} />

                    <Text style={[
                        styles.chipText,
                        selectedCategory === item.name && { color: colors.white }]}>
                        {formatUrbanSolidWasteCategory(item.name)}
                    </Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        position: 'absolute',
        margin: 10,
        marginRight: 55,
    },
    chip: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: border.radius.round,
        padding: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        zIndex: 10
    },
    chipText: {
        fontSize: 16,
        marginLeft: 5,
    }
})