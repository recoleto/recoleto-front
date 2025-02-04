import { ProfileLayout } from "@/components/profile-layout";
import { ScrollView } from "react-native-gesture-handler";
import { globalsStyles } from "../../../utils/globals-styles";
import { RefreshControl, Text } from "react-native";
import { CollectPointCard } from "@/components/collect-point-card";
import { useCollectPointCompany } from "api/hooks/useCollectPointCompany";
import { useCallback, useState } from "react";

export default function ManageCollectPointsScreen() {
  const { collectPoints, fetchCollectPoints } = useCollectPointCompany();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCollectPoints(); // Recarrega os pontos de coleta
    setRefreshing(false);
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ProfileLayout>
        <Text style={globalsStyles.title}>Pontos de Coleta:</Text>
        <Text>Aqui você pode visualizar e gerenciar todos os seus pontos de coleta</Text>

        {collectPoints && collectPoints.length > 0 ? (
          collectPoints.map((point) => (
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
          ))
        ) : (
          <Text>Nenhum ponto de coleta cadastrado.</Text>
        )}
      </ProfileLayout>
    </ScrollView>
  );
}