import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { Text, View } from "react-native"
import { useForm } from "react-hook-form"
import { useEffect, useRef } from "react"
import { Input } from "@/components/input"

type CollectPointRegisterProps = {
    clicked: boolean;
}

export default function CollectPointRegister({ clicked }: CollectPointRegisterProps) {
    const { control } = useForm()
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (clicked) {
            bottomSheetRef.current?.expand();
        }
    }, [clicked])

    return (
        <View>
            <Input theme="dark" inputProps={{}} formProps={{ name:'teste', control }} icon="airplay" />
        </View>
        // <BottomSheet ref={bottomSheetRef} style={{ flex: 1 }} snapPoints={['90%', '90%']} index={0}>
        //     <BottomSheetView>

        //         <Text> alo </Text>
        //         {/* <Input icon="airplay" 
        //     inputProps={{}} 
        //     formProps={{
        //         name: 'name',
        //         control 
        //         }} /> */}
        //     </BottomSheetView>
        // </BottomSheet>
    )
}