import { border, colors, font } from "@/utils/globals";
import { UrbanSolidWasteRequestCompanyType, UrbanSolidWasteRequestStatus } from "@/utils/types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import { globalsStyles } from "@/globals-styles";
import { useUswRequestsCompany } from "api/hooks/useUswRequestsCompany";
import { StatusCode } from "api/client/IHttpClient";
import Toast from "react-native-toast-message";
import { PrimaryButton } from "./primary-button";
import { useState } from "react";
import { RequestDiscardModal } from "./request-discard-modal";
import React from 'react';

type DiscardRequestCardProps = {
  handleRefresh: () => void;
} & UrbanSolidWasteRequestCompanyType;

export function DiscardRequestCard({ collectionPointName, requestId, solicitationNumber, status, userName, waste, points, handleRefresh }: DiscardRequestCardProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const { updateRequest } = useUswRequestsCompany();
  const handleShowDetails = () => setShowDetails(!showDetails);

  async function handleUpdateRequest(status: UrbanSolidWasteRequestStatus) {
    const response = await updateRequest(requestId, status);
    if (response.statusCode === StatusCode.Ok) {
      Toast.show({
        type: 'success',
        text1: `${response.resolve}`,
        visibilityTime: 3000,
      })
      handleRefresh();
    } else {
      Toast.show({
        type: 'error',
        text1: `${response.reject}`,
        visibilityTime: 3000,
      })
    }
  }

  return (
    <>
      <View style={styles.card}>
        <View style={{ flex: 2, gap: 10 }}>
          <Text style={styles.cardTitle}>DESCARTE {status}</Text>
          {status === UrbanSolidWasteRequestStatus.PENDENTE ?
            <Text style={globalsStyles.text}>
              <Text>
                O usuário {userName} solicitou descarte de resíduos no ponto de coleta {collectionPointName}.
              </Text>
              <TouchableOpacity onPress={handleShowDetails}>
                <Text style={styles.underlineText}>
                  Ver mais.
                </Text>
              </TouchableOpacity>
            </Text> : status === UrbanSolidWasteRequestStatus.APROVADO ?
            <Text>
              <Text>
                O descarte de resíduos solicitado por {userName} no ponto de coleta {collectionPointName} está a caminho.
              </Text>
              
              <TouchableOpacity onPress={handleShowDetails}>
                <Text style={styles.underlineText}>
                  Ver mais.
                </Text>
              </TouchableOpacity>
            </Text> : status === UrbanSolidWasteRequestStatus.RECEBIDO ? 
            <Text>
              <Text>
                O descarte de resíduos solicitado por {userName} no ponto de coleta {collectionPointName} foi recebido. {points} pontos foram liberados ao usuário.
              </Text>
              
              <TouchableOpacity onPress={handleShowDetails}>
                <Text style={styles.underlineText}>
                  Ver mais.
                </Text>
              </TouchableOpacity>
            </Text> : status === UrbanSolidWasteRequestStatus.RECUSADO ?
            <Text>
              <Text>
                O descarte de resíduos solicitado por {userName} no ponto de coleta {collectionPointName} foi recusado.
              </Text>
              
              <TouchableOpacity onPress={handleShowDetails}>
                <Text style={styles.underlineText}>
                  Ver mais.
                </Text>
              </TouchableOpacity>
            </Text> : status === UrbanSolidWasteRequestStatus.CANCELADO ?
            <Text>
              <Text>
                O descarte de resíduos solicitado por {userName} no ponto de coleta {collectionPointName} foi cancelado.
              </Text>
              
              <TouchableOpacity onPress={handleShowDetails}>
                <Text style={styles.underlineText}>
                  Ver mais.
                </Text>
              </TouchableOpacity>
            </Text> : null
          }
        </View>

        {status === UrbanSolidWasteRequestStatus.PENDENTE ?
          <View style={styles.iconView}>
            <TouchableOpacity
              onPress={() => handleUpdateRequest(UrbanSolidWasteRequestStatus.APROVADO)}>
              <Feather style={styles.icon} name="check" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleUpdateRequest(UrbanSolidWasteRequestStatus.RECUSADO)}>
              <Feather style={styles.icon} name="x" size={30} color="black" />
            </TouchableOpacity>

          </View> : status === UrbanSolidWasteRequestStatus.APROVADO ?
            <View style={styles.buttonsView}>
              <PrimaryButton
                textStyles={{ fontSize: font.size.medium }}
                title="Receber"
                onPress={() => handleUpdateRequest(UrbanSolidWasteRequestStatus.RECEBIDO)} />
              <PrimaryButton
                textStyles={{ fontSize: font.size.medium }}
                title="Cancelar"
                onPress={() => handleUpdateRequest(UrbanSolidWasteRequestStatus.CANCELADO)} />
            </View>
            : null
        }
      </View>
      {showDetails &&
        <RequestDiscardModal
          isOpen={showDetails}
          onClose={handleShowDetails}
          request={waste}
          solicitationNumber={solicitationNumber} />}
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: border.radius.medium,
    shadowColor: colors.black,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  iconView: {
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    backgroundColor: colors.lemon100,
    padding: 2,
    borderRadius: border.radius.round,
  },
  cardTitle: {
    fontFamily: font.family.semiBold,
    fontSize: font.size.mediumX,
  },
  buttonsView: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
  },
  underlineText: {
    textDecorationLine: 'underline',
    fontFamily: font.family.medium,
    marginLeft: 5,
  }
})