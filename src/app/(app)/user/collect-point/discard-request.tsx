import { DiscardResidue } from "@/components/discard-residue";
import { PrimaryButton } from "@/components/primary-button";
import { globalsStyles } from "@/globals-styles";
import { border, colors, font } from "@/utils/globals";
import { CollectPointMapType, UrbanSolidWasteRequest } from "@/utils/types";
import { formatUrbanSolidWasteCategory } from "@/utils/utils";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton } from "react-native-radio-buttons-group";
import React from "react";
import { WasteCard } from "@/components/waste-card";
import Toast from "react-native-toast-message";
import { useUrbanSolidWaste } from "api/hooks/useUrbanSolidWaste";
import { StatusCode } from "api/client/IHttpClient";

export default function DiscardRequest() {
  const { loc } = useLocalSearchParams();
  const parsedLoc: CollectPointMapType = typeof loc === 'string' ? JSON.parse(loc) : loc;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [wasteData, setWasteData] = useState<{ waste: UrbanSolidWasteRequest[] }>({ waste: [], })
  const { urbanSolidWasteRequest } = useUrbanSolidWaste();

  const handleModal = () => setIsOpen(!isOpen);

  const removeWaste = (indexToRemove: number) => {
    setWasteData((prevState) => ({
      waste: prevState.waste.filter((_, index) => index !== indexToRemove),
    }));
    Toast.show({
      type: 'info',
      text1: 'Resíduo removido.',
      position: 'top',
      visibilityTime: 2000,
      autoHide: true,
    })
  };

  async function handleSubmit() {
    const response = await urbanSolidWasteRequest({ pointId: parsedLoc.pointUUID, data: wasteData });
    if (response.statusCode === StatusCode.Created) {
      Toast.show({
        type: 'success',
        text1: `${response.resolve}`,
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      })

      setTimeout(() => {
        router.back();
      }, 1000);
    } else {
      Toast.show({
        type: 'error',
        text1: `${response.reject}`,
        position: 'bottom',
        visibilityTime: 2000,
        autoHide: true,
      })
    }
  }

  return (
    <>
      <ScrollView style={{ marginBottom: 20 }}>
        <View style={styles.container}>
          <View style={styles.requestView}>
            <View>
              <Text style={globalsStyles.titlePrimary}>SOLICITAÇÃO DE DESCARTE</Text>
              <Text style={globalsStyles.text}>Preencha os campos abaixo para solicitar o descarte de resíduos no ponto de coleta selecionado.</Text>
            </View>
            <View style={styles.collectPointInfoView}>
              <Text style={styles.collectPointInfoTitle}>{parsedLoc.name}</Text>
              <Text style={styles.collectPointAddress}>{parsedLoc.street}, {parsedLoc.number} - {parsedLoc.cep}</Text>
              <Text style={styles.collectPointInfoText}>Categoria: {formatUrbanSolidWasteCategory(parsedLoc.urbanSolidWaste)}</Text>
              <Text style={styles.collectPointInfoText}>Contato: {parsedLoc.phone}</Text>
            </View>
            <Text style={globalsStyles.text}>Categoria:</Text>

            <RadioButton selected
              id="1"
              label={formatUrbanSolidWasteCategory(parsedLoc.urbanSolidWaste)}
              containerStyle={{ margin: 0 }} />

            <View style={styles.residuesView}>
              <Text style={globalsStyles.text}>Resíduos:</Text>
              {wasteData.waste.length === 0 ?
                <Text>Nenhum resíduo adicionado.</Text>
                : wasteData.waste.map((waste, index) => (
                  <WasteCard
                    {...waste}
                    key={index}
                    onRemove={() => removeWaste(index)}
                  />
                ))}
            </View>
            <View style={styles.residuesView}>
              <PrimaryButton title="Adicionar Resíduo" onPress={handleModal} />
              <PrimaryButton title="Concluir" onPress={handleSubmit} />
            </View>
            <View style={styles.residuesView}>
              <PrimaryButton title="Adicionar Resíduo" onPress={handleModal} />
              <PrimaryButton title="Concluir" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </ScrollView>
      {isOpen && <DiscardResidue
        wastes={wasteData.waste}
        urbanSolidWaste={parsedLoc.urbanSolidWaste}
        isOpen={isOpen}
        setWastes={(newWastes) => setWasteData({ waste: newWastes })}
        handleModal={handleModal} />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  },
  requestView: {
    paddingHorizontal: 20,
    gap: 12,
  },
  collectPointInfoView: {
    backgroundColor: colors.green300,
    padding: 20,
    borderRadius: border.radius.medium
  },
  collectPointInfoText: {
    color: colors.white,
    fontSize: font.size.medium,
    fontFamily: font.family.regular,
  },
  collectPointAddress: {
    color: colors.grey100,
    fontSize: font.size.regular,
    fontFamily: font.family.regular
  },
  collectPointInfoTitle: {
    color: colors.white,
    fontSize: font.size.large,
    fontFamily: font.family.bold
  },
  residuesView: {
    gap: 10
  },
})