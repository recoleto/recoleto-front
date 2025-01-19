import BottomSheet, { BottomSheetProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { colors, font } from "@/utils/globals";
import { haversine } from "@/utils/utils";

type SelectedMapSheetProps = {
    collectPoint: {
        id: number;
        name: string;
        address: string;
        category: string;
        contact: string;
        longitude: number;
        latitude: number;
    },
    userLocation: any
}


export function SelectedMapSheet({ collectPoint, userLocation, ...props }: SelectedMapSheetProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [distance, setDistance] = useState<number | null>(null);

    useEffect(() => {
        if (collectPoint && userLocation) {
            setDistance(haversine(userLocation.coords.latitude, userLocation.coords.longitude, collectPoint.latitude, collectPoint.longitude));
            bottomSheetRef.current?.expand();
        }
    }, [collectPoint]);

    return (
        <BottomSheet ref={bottomSheetRef} {...props} index={-1} snapPoints={[200]} enablePanDownToClose>
            <BottomSheetView>
                {collectPoint &&
                    <View style={MapsheetStyle.wrapper}>
                        <View style={MapsheetStyle.content}>
                            <View style={MapsheetStyle.titleDistanceView}>
                                <Text style={MapsheetStyle.title}>{collectPoint.name}</Text>
                                <Text style={MapsheetStyle.distance}>{distance}km</Text>
                            </View>
                            <Text style={MapsheetStyle.address}>{collectPoint.address}</Text>
                            <Text style={MapsheetStyle.text}>Categoria: {collectPoint.category}</Text>
                            <Text style={MapsheetStyle.text}>Contato:{collectPoint.contact}</Text>
                        </View>

                        <TouchableOpacity style={MapsheetStyle.button}>
                            <Text style={MapsheetStyle.buttonText}> SOLICITAR DESCARTE </Text>
                        </TouchableOpacity>
                    </View>
                }
            </BottomSheetView>
        </BottomSheet>
    )
}

export const MapsheetStyle = StyleSheet.create({
    wrapper: {
        padding: 16,
        display: 'flex',
        gap: 12
    },
    content: {
        display: 'flex',
        gap: 2,
    },
    titleDistanceView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: colors.green200,
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: colors.white,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily: font.family.semiBold,
        fontSize: font.size.medium
    },
    title: {
        fontFamily: font.family.semiBold,
        fontSize: font.size.mediumX,
    },
    address: {
        fontSize: font.size.small,
        color: colors.grey300,
        fontFamily: font.family.regular,
    },
    text: {
        fontFamily: font.family.regular,
    },
    distance: {
        color: colors.lemon100,
        fontSize: font.size.mediumX,
        fontFamily: font.family.semiBold
    }
})