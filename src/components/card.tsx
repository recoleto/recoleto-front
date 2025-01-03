import { border, colors, font } from "@/utils/globals";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CardProps = {
    children?: React.ReactNode;
    // icon?: ImageSourcePropType;
    type: 'ponto-coleta' | 'info';
}

export const Card = ({ type }: CardProps) => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.card}>
            <View style={styles.cardView}>
                {type === 'ponto-coleta' &&
                    <>
                        <Image source={require('../../assets/icons/marker-outline.png')} />
                        <Text style={styles.text} >Ver pontos de coleta</Text>
                    </>}
                {type === 'info' &&
                    <>
                        <Image source={require('../../assets/icons/about-outline.png')} />
                        <Text style={styles.text} >O que reciclar</Text>
                    </>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        width: '35%',
        padding: 10,
        borderRadius: border.radius.medium,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,

        elevation: 9,
    },
    cardView: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },
    text: {
        fontFamily: font.family.medium,
        fontSize: font.size.medium,
    }
})