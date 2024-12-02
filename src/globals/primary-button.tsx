import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, font } from '../../utils/globals';
import { Link, RelativePathString, router } from 'expo-router';
import { ComponentProps } from 'react';

type PrimaryButtonType = ComponentProps<typeof TouchableOpacity> & {
  title: string;
  href?: RelativePathString;
}

function redirectTo(href: string) {
  router.navigate(href);
}

export const PrimaryButton = ({ title, href }: PrimaryButtonType) => {
  return (
      <TouchableOpacity id='link' style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green400,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
  },
  text: {
    color: colors.white,
    fontSize: font.size.large,
    textTransform: 'uppercase',
    fontFamily: font.family.medium
  }
})
