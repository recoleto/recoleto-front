import { colors, font } from "@/utils/globals";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NotificationType, UrbanSolidWasteRequestStatus } from "@/utils/types";
import { Feather } from '@expo/vector-icons';
import { useState } from "react";
import { RequestDiscardModal } from "./request-discard-modal";
import { useGetNotification } from "api/hooks/useGetNotification";
import { StatusCode } from "api/client/IHttpClient";
import Toast from "react-native-toast-message";

type NotifCardProps = NotificationType & {
  handleRefetch: () => void;
};
export function NotifCard({ status, createdAt, points, requestNumber, userName, companyName, waste, requestId, handleRefetch }: NotifCardProps) {
  const [seeDetails, setSeeDetails] = useState<boolean>(false);
  const handleSeeDetails = () => setSeeDetails(!seeDetails);
  const { cancelRequest } = useGetNotification();

  function dateToString(dateString: Date | string) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  async function handleCancelRequest() {
    const response = await cancelRequest(requestId, UrbanSolidWasteRequestStatus.CANCELADO);
    if (response.statusCode === StatusCode.Ok) {
      Toast.show({
        type: 'success',
        text1: `${response.resolve}`,
        position: 'top',
        visibilityTime: 3000,
      })
    } else {
      Toast.show({
        type: 'error',
        text1: `${response.reject}`,
        position: 'top',
        visibilityTime: 3000,
      })

      handleRefetch();
    }
  }

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.textView}>
        {status === UrbanSolidWasteRequestStatus.CANCELADO && <Image style={styles.icon} source={require('../../assets/icons/cancelled-filled.png')} />}
        {status === UrbanSolidWasteRequestStatus.APROVADO && <Image style={styles.icon} source={require('../../assets/icons/completed-filled.png')} />}
        {status === UrbanSolidWasteRequestStatus.PENDENTE && <Image style={styles.icon} source={require('../../assets/icons/warning-filled.png')} />}
        {status === UrbanSolidWasteRequestStatus.RECUSADO && <Image style={styles.icon} source={require('../../assets/icons/error-filled.png')} />}

        <View style={styles.textContainer}>
          <Text style={styles.title}>{`DESCARTE ${status}`}</Text>
          <Text>

            <Text style={styles.description}>
              {status === UrbanSolidWasteRequestStatus.APROVADO ? `${userName}, o descarte de resíduos nº ${requestNumber} no ponto de coleta ${companyName} foi aceito.` :
                status === UrbanSolidWasteRequestStatus.RECUSADO ? `${userName}, o descarte de resíduos nº ${requestNumber} solicitado no ponto de coleta ${companyName} foi recusado.` :
                  status === UrbanSolidWasteRequestStatus.CANCELADO ? `${userName}, o descarte de resíduos nº ${requestNumber} solicitado no ponto de coleta ${companyName} foi cancelado.` :
                  status === UrbanSolidWasteRequestStatus.RECEBIDO ? `${userName}, o descarte de resíduos nº ${requestNumber} solicitado no ponto de coleta ${companyName} foi recebido.` :
                    `${userName}, sua solicitação nº${requestNumber} está pendente para aceite ou recusa no ponto de coleta ${companyName}`
              }
            </Text>
            <TouchableOpacity onPress={handleSeeDetails}>
              <Text style={styles.underlineText}>Ver detalhes.</Text>
            </TouchableOpacity>
          </Text>
          <View style={styles.dateView}>
            <Feather name="clock" size={14} color={colors.grey300} />
            <Text style={styles.date}>{dateToString(createdAt)}</Text>
          </View>
        </View>
        {/* {status === UrbanSolidWasteRequestStatus.APROVADO || status === UrbanSolidWasteRequestStatus.PENDENTE ?
          <TouchableOpacity onPress={handleCancelRequest}>
            <Feather name="x" size={30} color={colors.black} />
          </TouchableOpacity>
          : null} */}
        {status === UrbanSolidWasteRequestStatus.RECEBIDO && <Text style={styles.pointsText}>{`+ ${points} pontos`}</Text>}
      </View>
      {seeDetails &&
        <RequestDiscardModal
          key={requestNumber}
          isOpen={seeDetails}
          onClose={handleSeeDetails}
          request={waste}
          solicitationNumber={requestNumber} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  textView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1
  },
  text: {
    fontFamily: font.family.regular,
    overflow: 'hidden',
    flexWrap: 'wrap',
    maxWidth: '90%',
    fontSize: font.size.medium
  },
  date: {
    color: colors.grey300,
    fontSize: font.size.small,
  },
  dateView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  title: {
    textTransform: 'uppercase',
    fontFamily: font.family.medium,
    fontSize: font.size.mediumX,
  },
  icon: {
    width: 35,
    height: 35
  },
  pointsText: {
    color: colors.lemon100,
    fontFamily: font.family.medium,
    fontSize: font.size.regular,
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    gap: 3
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
  },
  underlineText: {
    textDecorationLine: 'underline',
    fontFamily: font.family.medium,
    marginLeft: 5,
  }
})