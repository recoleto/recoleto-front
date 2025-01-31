import { globalsStyles } from "@/globals-styles";
import { formatUrbanSolidWasteCategory } from "@/utils/utils";
import { useUrbanSolidWaste } from "api/hooks/useUrbanSolidWaste";
import { StyleSheet } from "react-native";
import { View, Text, SectionList } from "react-native";

export default function UrbanSolidWasteCategoryInfo() {
    const { groupedUrbanSolidWastes } = useUrbanSolidWaste();
    return (
        <View style={styles.container}>
            <Text style={globalsStyles.titlePrimary}>RESÍDUOS SÓLIDOS URBANOS CADASTRADOS</Text>
            <SectionList
                sections={groupedUrbanSolidWastes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <View style={styles.wasteView}>
                    <Text>Resíduo: {item.name}</Text>
                    <Text>Pontos: {item.points}</Text>
                    <Text>Categoria: {formatUrbanSolidWasteCategory(item.type)}</Text>
                </View>}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 42
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
        textTransform: 'uppercase'
    },
    wasteView: {
        display: 'flex',
        flexDirection: 'column',
        padding: 12,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomColor: 'lightgray'
    }
})