import { globalsStyles } from "@/globals-styles";
import { UrbanSolidWasteCategory } from "@/utils/types";
import { formatUrbanSolidWasteCategory } from "@/utils/utils";
import React, { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";

type RadioButtonGroupControlledType = {
    control: any;
    name: string;
    error?: string | undefined;
    radioGroupType: 'point' | 'urban-solid-waste';
}


export const RadioButtonGroupControlled = forwardRef(({ control, name, error, radioGroupType }: RadioButtonGroupControlledType, ref) => {
    const [selectedId, setSelectedId] = useState<string>();

    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: formatUrbanSolidWasteCategory(UrbanSolidWasteCategory.LIXO_ELETRONICO),
            value: UrbanSolidWasteCategory.LIXO_ELETRONICO
        },
        {
            id: '2',
            label: formatUrbanSolidWasteCategory(UrbanSolidWasteCategory.RESIDUOS_CONTAMINANTES),
            value: UrbanSolidWasteCategory.RESIDUOS_CONTAMINANTES
        },
        {
            id: '3',
            label: formatUrbanSolidWasteCategory(UrbanSolidWasteCategory.RESIDUOS_CORTANTES),
            value: UrbanSolidWasteCategory.RESIDUOS_CORTANTES
        },
        {
            id: '4',
            label: formatUrbanSolidWasteCategory(UrbanSolidWasteCategory.OLEO_DE_COZINHA),
            value: UrbanSolidWasteCategory.OLEO_DE_COZINHA
        }
    ]), []);

    return (
        <View>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <RadioGroup
                        radioButtons={radioGroupType === 'point' ? radioButtons : radioButtons.slice(0, -1)}
                        onPress={(selectedId) => {
                            const selectedRadioButton = radioButtons.find((radioButton) => radioButton.id === selectedId);
                            setSelectedId(selectedId);
                            if (selectedRadioButton) {
                                onChange(selectedRadioButton.value);
                            }
                        }}
                        selectedId={selectedId}
                        containerStyle={{ alignItems: 'flex-start' }} />
                )} />
            {error && <Text style={globalsStyles.error}>{error}</Text>}
        </View>
    )
});