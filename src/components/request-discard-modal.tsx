import { Text, View } from "react-native";
import { Modal } from "./modal";
import { StyleSheet } from "react-native";
import { border, colors, font } from "@/utils/globals";
import { Feather } from "@expo/vector-icons";
import { globalsStyles } from "@/globals-styles";
import { UrbanSolidWasteRequestCompanyType } from "@/utils/types";

type RequestDiscardModalProps = {
  request: UrbanSolidWasteRequestCompanyType['waste'];
  isOpen: boolean;
  onClose: () => void;
  solicitationNumber: number;
}

export function RequestDiscardModal({ isOpen, onClose, solicitationNumber, request }: RequestDiscardModalProps) {
  return (
    <Modal isOpen={isOpen} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Solicitação nº {solicitationNumber}</Text>
            <Feather name="x" size={20} color="black" onPress={onClose} />
          </View>

          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Itens:</Text>
              <Text style={styles.headerText}>Qtde:</Text>
            </View>

            {request.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.quantity}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "white",
    width: "90%",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: font.size.large,
    fontFamily: font.family.bold,
  },
  tableContainer: {
    backgroundColor: colors.green200,
    borderRadius: 8,
    padding: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
  },
  headerText: {
    fontSize: font.size.mediumX,
    fontFamily: font.family.bold,
    color: colors.white,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },
  itemText: {
    fontSize: font.size.mediumX,
    color: colors.white,
    fontFamily: font.family.regular,
  },
});