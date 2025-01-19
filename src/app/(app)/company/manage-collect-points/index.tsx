import { MainLayout } from "@/components/main-layout";
import { ScrollView } from "react-native-gesture-handler";
import { globalsStyles } from "../../../../utils/globals-styles";
import { Text } from "react-native";
import { CollectPointCard } from "@/components/collect-point-card";
import { useCollectPointRegister } from "api/hooks/useCollectPoint";

export default function ManageCollectPointsScreen() {
  const { collectPoints } = useCollectPointRegister();
  return (
    <ScrollView>
      <MainLayout>
        <Text style={globalsStyles.title}>Pontos de Coleta:</Text>
        <Text> Aqui você pode visualizar e gerenciar todos os seus pontos de coleta</Text>
        {collectPoints.map((point) => (
            <CollectPointCard
                key={point.pointUUID}
                pointUUID={point.pointUUID}
                name={point.name}
                street={point.street}
                number={point.number}
                cep={point.cep}
                urbanSolidWasteEnum={point.urbanSolidWasteEnum}
                phone={point.phone}
            />
        ))}
      </MainLayout>
    </ScrollView>
  );
}