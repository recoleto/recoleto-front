import { View, TextInput, StyleSheet, TextInputProps, Text } from "react-native";
import { border, colors, font } from "@/utils/globals";
import { Controller, UseControllerProps } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import { forwardRef } from "react";
import clsx from "clsx";

type InputType = {
  label?: string;
  icon?: keyof typeof Feather.glyphMap;
  inputProps: TextInputProps;
  formProps: UseControllerProps;
  error?: string;
  theme?: "light" | "dark"; // Define os temas disponíveis
};

export const Input = forwardRef<TextInput, InputType>(
  ({ icon, inputProps, formProps, error, label, theme = "light" }: InputType, ref) => {
    const isDark = theme === "dark";
    const isEditable = inputProps.editable !== false; // Verifica se o input está editável

    return (
      <Controller
        render={({ field }) => (
          <View style={{ gap: 4 }}>
            {label && <Text style={[styles.label, isDark && styles.labelDark]}>{label}</Text>}
            <View
              style={[
                styles.inputWrapper,
                isDark && styles.inputWrapperDark,
                !isEditable && styles.inputWrapperDisabled,
              ]} >
              <View
                style={[
                  styles.iconWrapper,
                  isDark && styles.iconWrapperDark,
                ]} >
                {icon && <Feather
                  name={icon}
                  size={24}
                  color={clsx({
                    ["red"]: error && error.length > 0,
                    [colors.grey300]: !field.value && error?.length === 0,
                    [colors.green300]: String(field.value ?? "").length > 0,
                    [colors.white]: theme === "dark",
                  })} />}
              </View>
              <TextInput
                {...field}
                style={[
                  styles.input,
                  isDark && styles.inputDark,
                  !isEditable && styles.inputDisabled,
                ]}
                placeholderTextColor={
                  !isEditable ? colors.grey400 : isDark ? colors.grey300 : colors.grey400
                }
                value={field.value && field.value?.toString()}
                {...inputProps} />
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
          </View>
        )}
        {...formProps} />);
  }
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: colors.black,
  },
  inputDark: {
    color: colors.white,
  },
  inputDisabled: {
    color: colors.grey400,
  },
  label: {
    fontFamily: font.family.medium,
    fontSize: font.size.small,
    color: colors.white,
  },
  labelDark: {
    color: colors.black,
  },
  inputWrapper: {
    backgroundColor: colors.white,
    flexDirection: "row",
    padding: 4,
    borderRadius: border.radius.medium,
    borderWidth: 1.5,
    borderColor: colors.grey400
  },
  inputWrapperDark: {
    backgroundColor: colors.black,
  },
  inputWrapperDisabled: {
    backgroundColor: colors.grey200,
    borderColor: colors.grey300,
    borderWidth: 1,
  },
  iconWrapper: {
    padding: 6,
  },
  iconWrapperDark: {
    backgroundColor: colors.black,
  },
  error: {
    color: "red",
    fontSize: font.size.xsmall,
  },
});
