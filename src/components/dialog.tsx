import { View } from 'react-native';
import Dialog from 'react-native-dialog';

type DialogProps = {
    isOpen: boolean;
    setIsOpen: () => void;
    onPressAction: () => void;
    // message: string;
    title: string
}

export function BaseDialog({ isOpen, setIsOpen, onPressAction, title }: DialogProps) {
    return (
        <View>
            <Dialog.Container>
                {/* <Dialog.Title>Account delete
                    {title}
                </Dialog.Title>
                <Dialog.Description>
                    Do you want to delete this account? You cannot undo this action.
                </Dialog.Description>
                <Dialog.Button onPress={setIsOpen} label="Cancel" />
                <Dialog.Button onPress={onPressAction} label="Delete" /> */}
                
            </Dialog.Container>
        </View>
    )
}