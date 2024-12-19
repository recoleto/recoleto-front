import { View } from 'react-native';
import Dialog from 'react-native-dialog';

type DialogProps = {
    isOpen: boolean;
    setIsOpen: () => void;
    onPressAction: () => void;
    message: string;
    title: string
}

export function BaseDialog({ isOpen, setIsOpen, onPressAction, title, message }: DialogProps) {
    return (
        <View>
            <Dialog.Container visible={isOpen}>
                <Dialog.Title>
                    {title}
                </Dialog.Title>
                <Dialog.Description>
                   {message}
                </Dialog.Description>
                <Dialog.Button onPress={setIsOpen} label="Cancelar" />
                <Dialog.Button onPress={onPressAction} label="Sim" />
            </Dialog.Container>
        </View>
    )
}