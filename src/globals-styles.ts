import { font } from "@/utils/globals";
import { StyleSheet } from "react-native";

export const globalsStyles = StyleSheet.create({
    title: {
        fontFamily: font.family.semiBold,
        textDecorationLine: 'underline',
        fontSize: font.size.mediumX,
    },
    titlePrimaty: {
      fontFamily: font.family.bold,
      fontSize: font.size.mediumX,
      alignSelf: 'center',
      padding: 12,
    },
    text: {
      fontFamily: font.family.medium,
      fontSize: font.size.regular,
  }
})