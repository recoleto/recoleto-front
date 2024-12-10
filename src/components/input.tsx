import { ComponentProps } from "react";
import { View, TextInput, StyleSheet, Text, ViewStyle } from "react-native";
import { border, colors, font } from "@/utils/globals";

type InputType = ComponentProps<typeof TextInput> & {
    label: string;
    type: string;
    placeholder: string;
    color: string;
    viewStyle?: ViewStyle;
}

export function Input({ label, type, placeholder, color, viewStyle, ...rest }: InputType) {
    return (
        <View style={[viewStyle]}>
            <Text style={[styles.label, { color: `${color}` }]}> {label} </Text>
                    <TextInput placeholderTextColor={colors.grey300} style={styles.input} placeholder={placeholder} {...rest} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.white,
        borderWidth: border.width.medium,
        borderRadius: border.radius.medium,
        padding: 16,
        marginTop: 6,
    },
    label: {
        fontFamily: 'Teachers-Medium',
        fontSize: font.size.medium
    }
})