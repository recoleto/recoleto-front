import { border, colors, font } from "@/utils/globals";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Feather } from "@expo/vector-icons";

type CardProps = {
    children?: React.ReactNode;
    icon?: keyof typeof Feather.glyphMap;
    type?: 'ponto-coleta' | 'info';
    text?: string;
    onPress?: () => void;
} & TouchableOpacityProps;

export const Card = ({ type, icon, text, onPress}: CardProps) => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.card} onPress={onPress && onPress}>
            <View style={styles.cardView}>
                {icon ? <Feather name={icon} size={35} color={colors.lemon100} /> :
                    <Image source={
                        type === 'ponto-coleta' ?
                            require('../../assets/icons/marker-outline.png') :
                            require('../../assets/icons/about-outline.png')} />
                }
                <Text style={styles.text} >{
                    type === 'ponto-coleta' && !text ?
                        'Ver pontos de Coleta' :
                        type === 'info' && !text ?
                            'O que reciclar' :
                            text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        width: '40%',
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