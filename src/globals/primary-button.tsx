import { Pressable, StyleSheet, Text } from 'react-native'
import { colors, font } from '../../utils/globals';

type PrimaryButtonType = {
  title: string;
}

export const PrimaryButton = ({ title }: PrimaryButtonType) => {
  return (
    <Pressable  style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green400,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
  },
  text: {
    color: colors.white,
    textAlign: 'center',
    fontSize: font.size.large,
    textTransform: 'uppercase',
    fontFamily: font.family.medium
  }
})
