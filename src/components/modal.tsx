import { colors } from "@/utils/globals";
import { Modal as RModal, View, ModalProps, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type ModalTypeProps = ModalProps & {
    isOpen: boolean;
    children?: React.ReactNode;
}

export function Modal({ isOpen, children, ...props }: ModalTypeProps) {
    return (
        <SafeAreaProvider >
            <SafeAreaView>
                <RModal
                    transparent
                    visible={isOpen}
                    animationType="fade">
                    <View id="modal-view" style={styles.view}>
                        {children}
                    </View>
                </RModal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: colors.white,
        height: '90%',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
    }
})