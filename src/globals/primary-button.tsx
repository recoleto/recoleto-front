import { StyleSheet, Text } from 'react-native'
import { colors, font } from '../../utils/globals';
import { Link } from 'expo-router';
import { ComponentProps } from 'react';

type PrimaryButtonType = ComponentProps<typeof Link> & {
  title: string;
  href: string;
}

export const PrimaryButton = ({ title, href }: PrimaryButtonType) => {
  return (
      <Link  id='link' style={styles.button} href={href}>
        <Text style={styles.text}>{title}</Text>
      </Link>
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
