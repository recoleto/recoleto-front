import { colors, font } from "@/utils/globals";
import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

type NotifCardProps = {
    status: string;
    title: string;
    message: string;
    date: Date;
    points?: number
}

export function NotifCard({ status, title, message, date, points }: NotifCardProps) {
    function dateToString(date: Date) {
        return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    return (
        <View style={styles.card}>
            <View style={styles.textView}>
                {status === 'cancelled' && <Image style={styles.icon} source={require('../../assets/icons/cancelled-filled.png')} />}
                {status === 'approved' && <Image style={styles.icon} source={require('../../assets/icons/completed-filled.png')} />}
                {status === 'pending' && <Image style={styles.icon} source={require('../../assets/icons/warning-filled.png')} />}
                {status === 'rejected' && <Image style={styles.icon} source={require('../../assets/icons/error-filled.png')} />}
                <View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{title}</Text>
                        {points &&
                            <View style={styles.points}>
                                <Image source={require('../../assets/icons/plus-simple.png')} />
                                <Text style={styles.pointsText}>{points} pontos</Text>
                            </View>
                        }
                    </View>
                    <Text style={styles.text}>{message}</Text>
                </View>
            </View>
            <View style={styles.dateView}>
                <MaterialIcons color={colors.grey300} name="update" />
                <Text style={styles.date}>{dateToString(date)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0,
        shadowRadius: 1,

        elevation: 2,
    },
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
    }
})