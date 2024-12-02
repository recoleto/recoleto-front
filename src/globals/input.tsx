import { ComponentProps } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { border, colors, font } from "utils/globals";

type InputType  = ComponentProps<typeof TextInput> & {
    label: string;
    type: string;
    placeholder: string;
    color: string;
}

export function Input({ label, type, placeholder, color, ...rest } : InputType) {
    return (
        <View style={styles.view}>
            <Text style={[styles.label, {color: `${color}`}]}> {label} </Text>
            <TextInput style={styles.input} placeholder={placeholder} {...rest} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.white,
        height: 40,
        borderWidth: border.width.medium,
        borderRadius: border.radius.medium,
        padding: 12,
        marginTop: 6,
    },
    view: {
        marginHorizontal: 24,
    },
    label: {
        fontFamily: 'Teachers-Medium',
        fontSize: font.size.medium
    }
})