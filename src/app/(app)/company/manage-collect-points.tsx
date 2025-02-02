import { ProfileLayout } from "@/components/profile-layout";
import { ScrollView } from "react-native-gesture-handler";
import { globalsStyles } from "../../../utils/globals-styles";
import { Text } from "react-native";
import { CollectPointCard } from "@/components/collect-point-card";
import { useCollectPointCompany } from "api/hooks/useCollectPointCompany";

export default function ManageCollectPointsScreen() {
  const { collectPoints } = useCollectPointCompany();
  return (
    <ScrollView>
      <ProfileLayout>
        <Text style={globalsStyles.title}>Pontos de Coleta:</Text>
        <Text> Aqui você pode visualizar e gerenciar todos os seus pontos de coleta</Text>
        {collectPoints && collectPoints.length > 0 ? collectPoints.map((point) => (
          <CollectPointCard
            key={point.pointUUID}
            pointUUID={point.pointUUID}
            name={point.name}
            street={point.street}
            number={point.number}
            cep={point.cep}
            urbanSolidWaste={point.urbanSolidWaste}
            phone={point.phone}
          />
        )) : <Text>Nenhum ponto de coleta cadastrado.</Text>}
      </ProfileLayout>
    </ScrollView>
  );
}