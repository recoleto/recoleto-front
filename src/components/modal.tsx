import { Modal as RModal, ModalProps } from "react-native";
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
                        {children}
                </RModal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

