import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { NotifCard } from "@/components/notif-card";
import { MainLayout } from "@/components/main-layout";
import { useGetNotification } from "api/hooks/useGetNotification";
import { globalsStyles } from "@/globals-styles";
import { colors, font } from "@/utils/globals";
import { useEffect, useState } from "react";

export default function Notifications() {
  const { notifications, fetchNotifications } = useGetNotification();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const handleRefetch = () => setRefreshing(true);
  // console.log('oi')
  // console.log('notifications: ', notifications)


  useEffect(() => {
    fetchNotifications();
    setRefreshing(false);
  }, [refreshing]);

  return (
    <MainLayout refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefetch} />}>
      <View style={styles.notifContainer}>
        <Text style={globalsStyles.title}>Suas notificações</Text>
        <Text style={globalsStyles.text}>Aqui você pode cancelar os descartes feitos e visualizar as notificações.</Text>
        {notifications && notifications.length > 0 ? notifications.map((notif, index) =>
          <NotifCard key={index}
            handleRefetch={handleRefetch}
            requestId={notif.requestId}
            createdAt={notif.createdAt}
            requestNumber={notif.requestNumber}
            status={notif.status}
            userName={notif.userName}
            companyName={notif.companyName}
            waste={notif.waste}
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