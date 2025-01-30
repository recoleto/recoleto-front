import { StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Input } from "./input";
import { globalsStyles } from "@/globals-styles";
import { UrbanSolidWasteCategory } from "@/utils/types";
import { useUrbanSolidWaste } from "api/hooks/useUrbanSolidWaste";
import { useEffect } from "react";
import { Modal } from "./modal";
import { Controller, useForm } from "react-hook-form";
import { PrimaryButton } from "./primary-button";
import { border, colors, font } from "@/utils/globals";

type DiscardResidueProps = {
    setSelected: (val: string) => void;
    urbanSolidWasteEnum: UrbanSolidWasteCategory;
    isOpen: boolean;
    handleModal: () => void;
}

export function DiscardResidue({ setSelected, urbanSolidWasteEnum, isOpen, handleModal }: DiscardResidueProps) {
    const { fetchFilteredUrbanSolidWastes, filteredUrbanSolidWastes } = useUrbanSolidWaste();
    const { control } = useForm();

    useEffect(() => {
        fetchFilteredUrbanSolidWastes(urbanSolidWasteEnum);
    }, [urbanSolidWasteEnum]);

    const selectionData = filteredUrbanSolidWastes.map((usw) => ({
        label: usw.name,
        value: usw.name,
        key: usw.type
    }));


    return (
        <View style={styles.centeredView}>

            <Modal
                style={styles.centeredView}
                isOpen={true}
                animationType="fade"
                onRequestClose={handleModal}
                transparent={true}>
                <View style={styles.modalView}>
                    <View>
                        <Text style={globalsStyles.titlePrimary}>ADICIONAR RESÍDUO</Text>
                        <Text style={globalsStyles.text}>Adicione o resíduo na sua lista para o descarte</Text>
                    </View>
                    <View>
                        <Text style={globalsStyles.text}>Resíduo:</Text>
                    </View>
                    <SelectList
                        fontFamily={font.family.regular}
                        data={selectionData}
                        setSelected={(val: string) => setSelected(val)}
                        save="value"
                        notFoundText="Nenhum resíduo encontrado."
                        searchPlaceholder="Buscar um resíduo."
                        placeholder="Selecione um resíduo."
                        maxHeight={200} />

                    <View style={{ gap: 8 }}>
                        <Text style={globalsStyles.text}>Quantidade:</Text>
                        <Input
                            formProps={{ control, name: 'quantity' }}
                            inputProps={{
                                keyboardType: 'phone-pad'
                            }} />
                    </View>
                    <PrimaryButton title="ADICIONAR" />
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
        width: '90%',
        alignSelf: "center", 
        justifyContent: "center", 
        gap: 12,
        padding: 20,
        borderRadius: border.radius.round,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})