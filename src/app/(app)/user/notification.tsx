import { StyleSheet, Text, View } from "react-native";
import { globalsStyles } from "../../../utils/globals-styles";
import { NotifCard } from "@/components/notif-card";
import { MainLayout } from "@/components/main-layout";
import { useGetNotification } from "api/hooks/useGetNotification";

export default function Notifications() {
  const { notifications } = useGetNotification();
 
  return (
    <MainLayout>
      <View style={styles.notifContainer}>
        <Text style={globalsStyles.title}>Suas notificações</Text>
        {notifications && notifications.length > 0 ? notifications.filter(n => n.date).map((n, index) => (
          <NotifCard key={index} status={n.status} title={n.title} message={n.message} date={new Date(n.date)} points={n.points ? Number(n.points) : undefined} />
        )) : <Text>Você não possui notificações.</Text>}
      </View>
    </MainLayout>
  )
}

const styles = StyleSheet.create({
  notifContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }
})