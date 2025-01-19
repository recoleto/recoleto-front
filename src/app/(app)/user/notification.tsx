import { MainLayout } from "@/components/main-layout";
import { StyleSheet, Text, View } from "react-native";
import { globalsStyles } from "../../../utils/globals-styles";
import { NotifCard } from "@/components/notif-card";

export default function Notifications() {
    const notif = [
        {
            status: 'cancelled',
            title: 'Descarte cancelado',
            message: 'O ponto de coleta cancelou sua solicitação de descarte de 4 pilhas.',
            date: '2024-09-01'
        },
        {
            status: 'approved',
            points: '40',
            title: 'Descarte aprovado',
            message: 'Seu descarte de 4 pilhas foi aprovado pelo ponto de coleta Ponto Tal.',
            date: '2024-06-15'
        },
        {
            status: 'pending',
            title: 'Descarte pendente',
            message: 'Seu descarte de 4 pilhas está pendente de aprovação pelo ponto de coleta Ponto Tal.',
            date: '2024-10-11'
        },
        {
            status: 'rejected',
            title: 'Descarte reprovado',
            message: 'Seu descarte de 4 pilhas foi reprovado pelo ponto de coleta Ponto Tal.',
            date: '2024-09-01'
        },
        {
            status: 'approved',
            points: '40',
            title: 'Descarte aprovado',
            message: 'Seu descarte de 4 pilhas foi aprovado pelo ponto de coleta Ponto Tal.',
            date: '2024-06-15'
        },
        {
            status: 'pending',
            title: 'Descarte pendente',
            message: 'Seu descarte de 4 pilhas está pendente de aprovação pelo ponto de coleta Ponto Tal.',
            date: '2024-10-11'
        },
        {
            status: 'rejected',
            title: 'Descarte reprovado',
            message: 'Seu descarte de 4 pilhas foi reprovado pelo ponto de coleta Ponto Tal.',
            date: '2024-09-01'
        },
        {
            status: 'approved',
            points: '40',
            title: 'Descarte aprovado',
            message: 'Seu descarte de 4 pilhas foi aprovado pelo ponto de coleta Ponto Tal.',
            date: '2024-06-15'
        },
        {
            status: 'pending',
            title: 'Descarte pendente',
            message: 'Seu descarte de 4 pilhas está pendente de aprovação pelo ponto de coleta Ponto Tal.',
            date: '2024-10-11'
        },
        {
            status: 'rejected',
            title: 'Descarte reprovado',
            message: 'Seu descarte de 4 pilhas foi reprovado pelo ponto de coleta Ponto Tal.',
            date: '2024-09-01'
        },
        {
            status: 'approved',
            points: '40',
            title: 'Descarte aprovado',
            message: 'Seu descarte de 4 pilhas foi aprovado pelo ponto de coleta Ponto Tal.',
            date: '2024-06-15'
        },
        {
            status: 'pending',
            title: 'Descarte pendente',
            message: 'Seu descarte de 4 pilhas está pendente de aprovação pelo ponto de coleta Ponto Tal.',
            date: '2024-10-11'
        },
    ]
    return (
        <MainLayout>
            <View style={styles.notifContainer}>
                <Text style={globalsStyles.title}>Suas notificações</Text>
                {notif.filter(n => n.date).map((n, index) => (
                    <NotifCard key={index} status={n.status} title={n.title} message={n.message} date={new Date(n.date)} points={n.points ? Number(n.points) : undefined} />
                ))}
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