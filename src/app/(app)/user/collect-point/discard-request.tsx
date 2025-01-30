import { DiscardResidue } from "@/components/discard-residue";
import { PrimaryButton } from "@/components/primary-button";
import { globalsStyles } from "@/globals-styles";
import { border, colors, font } from "@/utils/globals";
import { CollectPointMapType, UrbanSolidWasteRequest } from "@/utils/types";
import { formatUrbanSolidWasteCategory } from "@/utils/utils";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton } from "react-native-radio-buttons-group";
import React
  from "react";
export default function DiscardRequest() {
  const { control } = useForm();
  const { loc } = useLocalSearchParams();
  const parsedLoc: CollectPointMapType = typeof loc === 'string' ? JSON.parse(loc) : loc;
  const [selected, setSelected] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [wastes, setWastes] = useState<UrbanSolidWasteRequest[]>([])
  const handleModal = () => setIsOpen(!isOpen);

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
              <Text style={styles.collectPointInfoText}>Categoria: {formatUrbanSolidWasteCategory(parsedLoc.urbanSolidWasteEnum)}</Text>
              <Text style={styles.collectPointInfoText}>Contato: {parsedLoc.phone}</Text>
            </View>
            <Text style={globalsStyles.text}>Categoria:</Text>

            <RadioButton selected
              id="1"
              label={formatUrbanSolidWasteCategory(parsedLoc.urbanSolidWasteEnum)}
              containerStyle={{ margin: 0 }} />

            <PrimaryButton title="Adicionar Resíduo" onPress={handleModal} />
          </View>
        </View>
      </ScrollView>
      {isOpen && <DiscardResidue
        setSelected={(val: string) => setSelected(val)}
        urbanSolidWasteEnum={parsedLoc.urbanSolidWasteEnum}
        isOpen={isOpen}
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
  }
})