import { ComponentProps } from "react";
import { View, TextInput, StyleSheet, Text, ViewStyle } from "react-native";
import { border, colors, font } from "@/utils/globals";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

type InputType = ComponentProps<typeof TextInput> & {
    label: string;
    type: string;
    placeholder: string;
    color: string;
    viewStyle?: ViewStyle;
    readOnly?: boolean;
}

export function EditableInput({ label, type, placeholder, color, viewStyle, readOnly, ...rest }: InputType) {
    return (
        <View style={[viewStyle]}>
            <Text style={[styles.label, { color: `${color}`, }]}> {label} </Text>
            <TextInput editable={!readOnly} placeholderTextColor={colors.grey300} style={[
                styles.input,
                { backgroundColor: readOnly ? colors.grey100 : colors.white,
                    borderColor: readOnly ? colors.grey100 : colors.grey200,
                 }
            ]} placeholder={placeholder} {...rest} />
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
        width: '100%',
    },
    label: {
        fontFamily: 'Teachers-Medium',
        fontSize: font.size.medium
    },
})