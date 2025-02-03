import { StyleSheet, Text, View } from "react-native";
import { NotifCard } from "@/components/notif-card";
import { MainLayout } from "@/components/main-layout";
import { useGetNotification } from "api/hooks/useGetNotification";
import { globalsStyles } from "@/globals-styles";

export default function Notifications() {
  const { notifications } = useGetNotification();
  
  return (
    <MainLayout>
      <View style={styles.notifContainer}>
        <Text style={globalsStyles.title}>Suas notificações</Text>
        <Text style={globalsStyles.text}>Aqui você pode ver todas as notificações dos seus descartes.</Text>
        {notifications.map((notif, index) => 
        <NotifCard key={index} 
        createdAt={notif.createdAt}
        requestNumber={notif.requestNumber}
        status={notif.status}
        userName={notif.userName}
        points={notif.points} />)}
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