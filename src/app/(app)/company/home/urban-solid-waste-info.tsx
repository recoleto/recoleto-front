import { useSolidWaste } from "api/hooks/useSolidWaste";
import { View, Text } from "react-native";

export default function UrbanSolidWasteCategoryInfo() {
    const { solidWastes } = useSolidWaste();
    return (
        <View>
            <Text>UrbanSolidWasteCategoryInfo</Text>
        </View>
    )
}