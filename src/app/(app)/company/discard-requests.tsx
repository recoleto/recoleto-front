import { DiscardRequestCard } from "@/components/discard-request-card";
import { MainLayout } from "@/components/main-layout";
import { globalsStyles } from "@/globals-styles";
import { font } from "@/utils/globals";
import { useUswRequestsCompany } from "api/hooks/useUswRequestsCompany";
import { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function DiscardRequests() {
  const { requests, fetchRequests } = useUswRequestsCompany();

  useEffect(() => {
    fetchRequests();
  }, [requests]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <MainLayout>
        <Text style={globalsStyles.title}>Solicitações:</Text>
        <Text style={[globalsStyles.text, { fontSize: font.size.medium }]}>Aqui você pode visualizar as solicitações de descarte de resíduos urbanos sólidos.</Text>
        {requests ? requests.length > 0 ?
          requests.map((request) => (
            <DiscardRequestCard
              key={request.requestId}
              requestId={request.requestId}
              userName={request.userName}
              points={request.points}
              waste={request.waste}
              solicitationNumber={request.solicitationNumber}
              collectionPointName={request.collectionPointName}
              status={request.status} />
          )) : <Text style={globalsStyles.text}>Nenhuma solicitação de descarte de resíduos encontrada.</Text> :
          <ActivityIndicator />}
      </MainLayout>
    </ScrollView>
  )
}