import { Card } from "@/components/card";
import { ProfileLayout } from "@/components/profile-layout";
import { globalsStyles } from "@/utils/globals-styles";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import React from 'react';
import { MainLayout } from "@/components/main-layout";

export default function Home() {

  return (
    <MainLayout>
      <View style={styles.carroussel}>
        <Text style={globalsStyles.title}>Pontos de Coleta</Text>
        <View style={styles.cardContainer}>
          <Card
            text="Cadastrar Ponto de Coleta"
            type="ponto-coleta"
            onPress={() => router.navigate('/(app)/company/home/collect-point-register')} />
          <Card
            text="Ver meus Pontos de Coleta"
            type="info"
            onPress={() => router.push('/(app)/company/manage-collect-points')} />
        </View>
      </View>

      <View style={styles.carroussel}>
        <Text style={globalsStyles.title}>Resíduos</Text>
        <View style={styles.cardContainer}>
          <Card
            text="Cadastrar Resíduo"
            icon="plus-circle"
            onPress={() => router.navigate('/(app)/company/home/urban-solid-waste-register')} />
          <Card
            text="Ver resíduos cadastrados"
            type="info"
            onPress={() => router.navigate('/(app)/company/home/urban-solid-waste-info')} />
        </View>
      </View>
    </MainLayout>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12
  },
  carroussel: {
    gap: 12
  }
})