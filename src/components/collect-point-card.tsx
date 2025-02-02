import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { MapsheetStyle } from "./selected-map-sheet";
import { colors } from "@/utils/globals";
import { Feather } from "@expo/vector-icons";
import { CollectPointType } from "@/utils/types";
import { formatUrbanSolidWasteCategory } from "@/utils/utils";
import { StatusCode } from "api/client/IHttpClient";
import Toast from "react-native-toast-message";
import { useState } from "react";
import { BaseDialog } from "./dialog";
import { router } from "expo-router";
import { useCollectPointCompany } from "api/hooks/useCollectPointCompany";

export function CollectPointCard({ pointUUID, name, street, urbanSolidWaste, phone, cep, number }: CollectPointType) {
  const { deleteCollectPoint, fetchCollectPoints } = useCollectPointCompany();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleModal = () => setIsOpen(!isOpen);

  async function handleDeleteCollectPoint(pointUUID: string) {
    const response = await deleteCollectPoint(pointUUID);
    if (response.statusCode === StatusCode.Ok) {
      Toast.show({
        type: 'success',
        text1: `${response.resolve}`,
        position: 'top',
      })
      fetchCollectPoints();
    } else {
      Toast.show({
        type: 'error',
        text1: `${response.reject}`,
        position: 'top',
      })
    }
  }

  async function handleEdit() {
    router.navigate({
      pathname: '/company/home/collect-point-register',
      params: {
        mode: 'edit',
        initialData: JSON.stringify({ pointUUID, name, street, urbanSolidWaste, phone, cep, number }),
        pointUUID: pointUUID
      }
    })
  }

  return (
    <View style={styles.cardWrapepr}>
      <View style={styles.collectPointCard}>
        <Text style={MapsheetStyle.title}>{name}</Text>
        <Text style={MapsheetStyle.address}>{street}, {number} - {cep}</Text>
        <Text style={MapsheetStyle.text}>Categoria: {formatUrbanSolidWasteCategory(urbanSolidWaste)}</Text>
        <Text style={MapsheetStyle.text}>Contato: {phone}</Text>
      </View>

      <View style={styles.iconsWrapper}>
        <TouchableOpacity onPress={handleEdit}>
          <Feather name="edit-3" size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleModal}>
          <Feather name="trash" size={30} />
        </TouchableOpacity>
      </View>
      <BaseDialog
        isOpen={isOpen}
        title="Exluir Ponto de Coleta"
        message={`Você tem certeza que deseja excluir o ponto de coleta ${name}?`}
        setIsOpen={handleModal}
        onPressAction={() => handleDeleteCollectPoint(pointUUID)} />
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapepr: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  collectPointCard: {
    padding: 12,
    shadowColor: '#171717',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.grey200,
    borderRadius: 5,
    flex: 4
  },
  iconsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    flex: 1
  }
})