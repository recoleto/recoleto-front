import { colors, font } from "@/utils/globals";
import { Image, StyleSheet, Text, View } from "react-native";
import { NotificationType, UrbanSolidWasteRequestStatus } from "@/utils/types";

export function NotifCard({ status, createdAt, points, requestNumber, userName }: NotificationType) {

  function dateToString(dateString: Date | string) {
    if (!dateString) return '';
    const date = new Date(dateString); // Converter string para Date
    if (isNaN(date.getTime())) return ''; // Verifica se é uma data válida
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.textView}>
        {status === UrbanSolidWasteRequestStatus.CANCELADO && <Image style={styles.icon} source={require('../../assets/icons/cancelled-filled.png')} />}
        {status === UrbanSolidWasteRequestStatus.APROVADO && <Image style={styles.icon} source={require('../../assets/icons/completed-filled.png')} />}
        {status === UrbanSolidWasteRequestStatus.PENDENTE && <Image style={styles.icon} source={require('../../assets/icons/warning-filled.png')} />}
        {status === UrbanSolidWasteRequestStatus.RECUSADO && <Image style={styles.icon} source={require('../../assets/icons/error-filled.png')} />}

        <View style={styles.textContainer}>
          <Text style={[styles.title]}>{`DESCARTE ${status}`}</Text>
          {status !== UrbanSolidWasteRequestStatus.PENDENTE ?
            <Text style={styles.description}>{`${userName}, sua solicitação nº${requestNumber} foi ${status} no ponto de coleta`}</Text> :
            <Text>{`${userName}, sua solicitação nº${requestNumber} está pendente para aceite ou recusa no ponto de coleta`}</Text>}
          <Text style={styles.date}>{dateToString(createdAt)}</Text>
        </View>
        {points ? <Text style={styles.points}>{`+ ${points} pontos`}</Text> : null}
      </View>
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
    fontSize: font.size.regular
  },
  date: {
    color: colors.grey300,
    fontSize: font.size.xsmall,
  },
  dateView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3
  },
  title: {
    textTransform: 'uppercase',
    fontFamily: font.family.medium
  },
  icon: {
    width: 35,
    height: 35
  },
  points: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingRight: 5
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
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
  },
})