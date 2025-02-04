import { StyleSheet, Text, View } from "react-native";
import { NotifCard } from "@/components/notif-card";
import { MainLayout } from "@/components/main-layout";
import { useGetNotification } from "api/hooks/useGetNotification";
import { globalsStyles } from "@/globals-styles";
import { colors, font } from "@/utils/globals";

export default function Notifications() {
  const { notifications } = useGetNotification();

  return (
    <MainLayout>
      <View style={styles.notifContainer}>
        <Text style={globalsStyles.title}>Suas notificações</Text>
        <Text style={globalsStyles.text}>Aqui você pode ver todas as notificações dos seus descartes.</Text>
        {notifications && notifications.length > 0 ? notifications.map((notif, index) =>
          <NotifCard key={index}
            createdAt={notif.createdAt}
            requestNumber={notif.requestNumber}
            status={notif.status}
            userName={notif.userName}
            points={notif.points} />) : <Text style={styles.noNotifText}>Você não tem notificações.</Text>}
      </View>
    </MainLayout>
  )
}

const styles = StyleSheet.create({
  notifContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  noNotifText: {
    fontSize: font.size.medium,
    color: colors.grey300,
    textAlign: 'center'
  }
})