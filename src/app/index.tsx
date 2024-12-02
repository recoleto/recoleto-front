import { PrimaryButton } from '@/globals/primary-button';
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Index() {
    return (
        <View style={styles.wrapper} id='index-wrapper'>
            <View id='logo-view'>
                <Image style={styles.image} source={require('../../assets/images/logo-w-name.png')} ></Image>
                <Text style={styles.subtitles}>Coleta de resíduos sólidos</Text>
            </View>
            <View style={styles.buttons} id='button-view'>
                <PrimaryButton href='/signup-company' title='Entrar'></PrimaryButton>
                <PrimaryButton href='/' title='Cadastro de Empresa'></PrimaryButton>
                <PrimaryButton href='/' title='Cadastro de Usuário'></PrimaryButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
    },
    image: {
        width: 200,
        height: 250,
        alignSelf: 'center',
    },
    subtitles: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Teachers-SemiBold'
    },
    buttons: {
        marginTop: 200,
        marginEnd: 40,
        marginStart: 40,
    }
});
