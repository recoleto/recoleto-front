import { MainLayout } from "@/components/main-layout";
import { globalsStyles } from "@/globals-styles";
import { formatUrbanSolidWasteCategory } from "@/utils/utils";
import { useUrbanSolidWaste } from "api/hooks/useUrbanSolidWaste";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, FlatList } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useState } from "react";
import { router } from "expo-router";
import { UrbanSolidWasteType } from "@/utils/types";
import React from "react";

export default function UrbanSolidWasteAdminInfo() {
  const { groupedUrbanSolidWastes } = useUrbanSolidWaste();
  const [urbanSolidWasteToEdit, setUrbanSolidWasteToEdit] = useState<UrbanSolidWasteType | null>(null);

  // Transformando groupedUrbanSolidWastes em um array plano
  const flatData = groupedUrbanSolidWastes.flatMap(section =>
    section.data.map(item => ({
      ...item,
      category: section.title // Adicionando a categoria para renderizar os cabeçalhos manualmente
    }))
  );

  const handleEditClick = (waste: UrbanSolidWasteType) => {
    setUrbanSolidWasteToEdit(waste);
    if (urbanSolidWasteToEdit) {
      router.navigate({
        pathname: '/admin',
        params: { urbanSolidWaste: JSON.stringify(urbanSolidWasteToEdit) },
      });
    }
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={globalsStyles.title}>Resíduos Sólidos Urbanos:</Text>
          <Text style={globalsStyles.text}>Gerencie aqui os resíduos cadastrados ou crie um novo.</Text>
        </View>
        <FlatList
          data={flatData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
          renderItem={({ item, index }) => {
            const isFirstItemInSection = index === 0 || flatData[index - 1].category !== item.category;

            return (
              <>
                {isFirstItemInSection && <Text style={styles.sectionHeader}>{item.category}</Text>}
                <View style={styles.wasteView}>
                  <View>
                    <Text>Resíduo: {item.name}</Text>
                    <Text>Pontos: {item.points}</Text>
                    <Text>Categoria: {formatUrbanSolidWasteCategory(item.type)}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleEditClick(item)}>
                    <Feather name="edit" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </>);
          }}
        />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  headerContainer: {
    gap: 12,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
    textTransform: 'uppercase',
  },
  wasteView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});
