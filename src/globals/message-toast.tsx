import { StyleSheet } from "react-native"
import { ErrorToast, SuccessToast } from "react-native-toast-message"

export const MessageToast = ({ message, type }: { message: string, type: string }) => {
    return(
        <>
            {type === 'error' && <ErrorToast style={styles.error} text1={message} />}
            {type === 'success' && <SuccessToast style={styles.success} text1={message} />}
        </>
    )
}

const styles = StyleSheet.create({
    error: {
        width: '100%',
        position: 'absolute',
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