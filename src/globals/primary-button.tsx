import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, font } from '../../utils/globals';
import { RelativePathString, router } from 'expo-router';
import { ComponentProps } from 'react';

type PrimaryButtonType = ComponentProps<typeof TouchableOpacity> & {
  title: string;
  href?: RelativePathString;
  onPress?: () => void;
}


export const PrimaryButton = ({ title, href, onPress }: PrimaryButtonType) => {

  function redirectTo(href: RelativePathString) {
    router.navigate(href);
  }

  const handlePress = (event: any) => {
    // Executa a função onPress, se fornecida
    if (onPress) {
      onPress(event);
    }

    // Executa o redirecionamento, se href estiver presente
    if (href) {
      redirectTo(href);
    }
  };

  return (
      <TouchableOpacity id='button' style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green400,
    padding: 10,
    borderRadius: 10,
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: font.size.large,
    textTransform: 'uppercase',
    fontFamily: font.family.medium
  }
})
