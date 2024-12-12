import { Modal as RModal, View, ModalProps, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type ModalTypeProps = ModalProps & {
    isOpen: boolean;
}

export function Modal({ isOpen, ...props }: ModalTypeProps) {
    return (
        <SafeAreaProvider >
            <SafeAreaView>
                <RModal
                    transparent
                    visible={isOpen}
                    animationType="fade">
                    <View id="modal-view" style={styles.view}>

                    </View>
                </RModal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'red', 
        height: '50%', 
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
    }
})