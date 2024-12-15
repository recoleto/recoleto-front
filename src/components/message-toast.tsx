import React from "react"
import { StyleSheet } from "react-native"
import { ErrorToast, SuccessToast, ToastProps } from "react-native-toast-message"

type ToastieProps = {
  message: string
  type: 'error' | 'success' | 'info'
} & ToastProps

export const MessageToast = ({ message, type }: ToastieProps) => {
  return (
    <>
      {type === "error" ? <ErrorToast style={styles.error} text1={message} /> : null}
      {type === "success" ? <SuccessToast style={styles.success} text1={message} /> : null}
    </>
  )
}

const styles = StyleSheet.create({
  error: {
    width: '100%',
    borderLeftColor: 'red'
  },
  success: {
    width: '100%',
    borderLeftColor: 'green'
  }
})