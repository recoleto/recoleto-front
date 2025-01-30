import { Input } from "@/components/input";
import { PrimaryButton } from "@/components/primary-button";
import { globalsStyles } from "@/globals-styles";
import { border, colors, font } from "@/utils/globals";
import { CollectPointMapType } from "@/utils/types";
import { formatUrbanSolidWasteCategory } from "@/utils/utils";
import { useUrbanSolidWaste } from "api/hooks/useUrbanSolidWaste";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { RadioButton } from "react-native-radio-buttons-group";

export default function DiscardRequest() {
  const { control } = useForm();
  const { loc } = useLocalSearchParams();
  const parsedLoc: CollectPointMapType = typeof loc === 'string' ? JSON.parse(loc) : loc;
  const [selected, setSelected] = useState<string>();

  const { fetchFilteredUrbanSolidWastes, filteredUrbanSolidWastes } = useUrbanSolidWaste();

  useEffect(() => {
    fetchFilteredUrbanSolidWastes(parsedLoc.urbanSolidWasteEnum);
  }, [parsedLoc.urbanSolidWasteEnum]);

  const selectionData = filteredUrbanSolidWastes.map((usw) => ({
    label: usw.name,
    value: usw.name,
    key: usw.type
  }));

  return (
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
        <RadioButton id="1" label={formatUrbanSolidWasteCategory(parsedLoc.urbanSolidWasteEnum)} selected containerStyle={{ margin: 0 }} />
        <View style={{ gap: 12 }}>

          <View>
            <Text style={globalsStyles.text}>Itens:</Text>
            <SelectList
              data={selectionData}
              setSelected={(val: string) => setSelected(val)}
              save="value"
              notFoundText="Nenhum resíduo encontrado."
              searchPlaceholder="Buscar um resíduo."
              maxHeight={200} />
          </View>

          <View style={{ gap: 8 }}>
            <Text style={globalsStyles.text}>Quantidade:</Text>
            <Input
              formProps={{ control, name: 'name' }}
              inputProps={{
                keyboardType: 'phone-pad'
              }} />
          </View>
          <PrimaryButton title="Adicionar Resíduo" onPress={() => { }} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  },
  requestView: {
    paddingHorizontal: 20,
    gap: 12
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