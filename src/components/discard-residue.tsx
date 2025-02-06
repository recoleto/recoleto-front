import { StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Input } from "./input";
import { globalsStyles } from "@/globals-styles";
import { UrbanSolidWasteCategory, UrbanSolidWasteRequest } from "@/utils/types";
import { useUrbanSolidWaste } from "api/hooks/useUrbanSolidWaste";
import { useEffect, useState } from "react";
import { Modal } from "./modal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { PrimaryButton } from "./primary-button";
import { border, colors, font } from "@/utils/globals";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

type DiscardResidueProps = {
    urbanSolidWaste: UrbanSolidWasteCategory;
    isOpen: boolean;
    handleModal: () => void;
    setWastes: (wastes: UrbanSolidWasteRequest[]) => void;
    wastes: UrbanSolidWasteRequest[];
}

export function DiscardResidue({ urbanSolidWaste, isOpen, handleModal, setWastes, wastes }: DiscardResidueProps) {
    const [_selected, setSelected] = useState<string>('');
    const { fetchFilteredUrbanSolidWastes, filteredUrbanSolidWastes } = useUrbanSolidWaste();
    const { control, setValue, handleSubmit, formState: { errors }, resetField } = useForm<UrbanSolidWasteRequest>({
        mode: 'all',
        reValidateMode: 'onChange'
    });

    useEffect(() => {
        fetchFilteredUrbanSolidWastes(urbanSolidWaste);
    }, [urbanSolidWaste]);

  const selectionData = filteredUrbanSolidWastes.map((usw) => ({
    label: usw.name,
    value: usw.name,
    key: usw.type
  }));

  const onSubmit: SubmitHandler<UrbanSolidWasteRequest> = (data) => {
    setWastes([...wastes, data]);
    Toast.show({
      type: 'info',
      text1: 'Resíduo adicionado.',
      position: 'top',
      visibilityTime: 2000,
      autoHide: true,
    })
    setTimeout(() => {
      handleModal();
      resetField('name');
      resetField('quantity');
    }, 500);
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        style={styles.centeredView}
        isOpen={isOpen}
        animationType="fade"
        onRequestClose={handleModal}
        transparent={true}>
        <View style={styles.modalView}>
          <View>
            <View style={styles.titleView}>
              <Text style={globalsStyles.titlePrimary}>ADICIONAR RESÍDUO</Text>
              <Feather style={styles.icon} name="x" size={24} color={colors.black} onPress={handleModal} />
            </View>
            <Text style={globalsStyles.text}>Adicione o resíduo na sua lista para o descarte</Text>
          </View>
          <View>
            <Text style={globalsStyles.text}>Resíduo:</Text>
          </View>

          <Controller
            name="name"
            control={control}
            rules={{ required: 'Campo obrigatório' }}
            render={({ field }) => (
              <SelectList
                setSelected={(val: string) => {
                  setValue('name', val);
                  setSelected(val);
                }}
                fontFamily={font.family.regular}
                data={selectionData}
                save="value"
                notFoundText="Nenhum resíduo encontrado."
                searchPlaceholder="Buscar um resíduo."
                placeholder="Selecione um resíduo."
                maxHeight={200} />
            )} />
           {errors.name && <Text style={globalsStyles.error}>{errors.name.message}</Text>}

          <View style={{ gap: 8 }}>
            <Text style={globalsStyles.text}>Quantidade:</Text>
            <Input
              error={errors.quantity?.message}
              formProps={{ control: control as any, name: 'quantity', rules: { required: 'Campo obrigatório' } }}
              inputProps={{
                onChangeText: (text) => setValue('quantity', Number(text)),
                keyboardType: 'phone-pad'
              }} />
          </View>
          <PrimaryButton title="ADICIONAR" onPress={handleSubmit(onSubmit)} />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1, // Ocupa toda a tela disponível
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  modalView: {
    backgroundColor: colors.white,
    marginTop: 150,
    width: '90%',
    alignSelf: "center",
    justifyContent: "center",
    gap: 12,
    padding: 20,
    borderRadius: border.radius.medium,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleView: {
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 0,
  }
})