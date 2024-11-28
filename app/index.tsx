import { PrimaryButton } from '@/globals/primary-button';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Index() {
    return (
        <View id='index-wrapper' style={styles.view}>
            <LinearGradient style={styles.background} colors={['#0C3422', '#249A66']}>
                <View>
                    <Image style={styles.image} source={require('../assets/images/logo-w-name.png')} ></Image>
                    <Text style={styles.subtitles}>Coleta de resíduos sólidos</Text>
                </View>
                <View>
                    <PrimaryButton title='Entrar'></PrimaryButton>
                    <PrimaryButton title='Cadastro de Empresa'></PrimaryButton>
                    <PrimaryButton title='Cadastro de Usuário'></PrimaryButton>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        height: '100%',
        backgroundColor: 'red',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
    },
    image: {
        width: 200,
        height: 250,
        alignSelf: 'center',
        marginTop: 20
    },
    view: {
        width: '100%',
        height: '100%',
    },
    subtitles: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Teachers-SemiBold'
    },
});
