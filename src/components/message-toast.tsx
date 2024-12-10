import { StyleSheet } from "react-native"
import { BaseToast } from "react-native-toast-message"

type ToastProps = {
    message: string
    type: 'error' | 'success' | 'info'
}

export const MessageToast = ({ message, type }: ToastProps) => {
    return (
        <BaseToast text2={message}  />
    )
}

{/* {type === 'error' && <Toast autoHide={true} position="bottom" type={type}  />} */ }
{/* {type === 'success' && <SuccessToast style={styles.success} text1="Operação realizada com sucesso." text2={message} />} */ }
const styles = StyleSheet.create({
    error: {
        width: '100%',
        position: 'absolute',
        marginTop: 10,
        bottom: 10,
        left: 0,
        borderLeftColor: 'red'
    },
    success: {
        width: '100%',
        position: 'absolute',
        bottom: 10,
        left: 0,
        borderLeftColor: 'green'
    }
})