import { useState } from "react";
import { globalsStyles } from "@/globals-styles";
import { formatUrbanSolidWasteCategory } from "@/utils/utils";
import { useUrbanSolidWaste } from "api/hooks/useUrbanSolidWaste";
import { StyleSheet, TextInput } from "react-native";
import { View, Text, SectionList } from "react-native";
import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { colors, font } from "@/utils/globals";

export default function UrbanSolidWasteCategoryInfo() {
  const { control } = useForm();
  const { groupedUrbanSolidWastes } = useUrbanSolidWaste();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = groupedUrbanSolidWastes.map(section => ({
    ...section,
    data: section.data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.data.length > 0);

  return (
    <View style={styles.container}>
      <Text style={globalsStyles.titlePrimary}>RESÍDUOS SÓLIDOS URBANOS CADASTRADOS</Text>
      {/* <TextInput
                style={styles.searchBar}
                placeholder="Pesquisar RSU..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            /> */}
      <Input
        icon="search"
        formProps={{
          control,
          rules: {
            required: false
          },
          name: "searchQuery",
        }}
        inputProps={{
          onChangeText(text) {
            setSearchQuery(text);
          },
        }} />
      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.wasteView}>
            <Text style={[globalsStyles.text, styles.wasteText]}>Resíduo: {item.name}</Text>
            <Text style={[globalsStyles.text, styles.wasteText]}>Pontos: {item.points}</Text>
            <Text style={[globalsStyles.text, styles.wasteText]}>Categoria: {formatUrbanSolidWasteCategory(item.type)}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 42,
    paddingHorizontal: 24,
    gap: 10
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingLeft: 10
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: font.size.mediumX,
    fontFamily: font.family.bold,
    backgroundColor: colors.greenPrimary,
    textTransform: "uppercase",
    color: colors.white,
  },
  wasteView: {
    display: "flex",
    flexDirection: "column",
    padding: 12,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: "lightgray"
  },
  wasteText: {
    fontSize: font.size.medium,
  }
});