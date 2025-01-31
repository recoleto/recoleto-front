import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function GoBack() {
    const goBack = () => router.back();
    
    return (
        <TouchableOpacity style={styles.button} onPress={goBack}>
            <Image source={require('../../assets/icons/back.png')} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 0,
        left: 0,
    }
})