import React, { ReactNode} from 'react'
import { View, StyleSheet, FlatList, Dimensions, KeyboardAvoidingView } from 'react-native'

type FormLayoutProps = {
  children: ReactNode
  isFlatList?: boolean
}

const FormLayout: React.FC<FormLayoutProps> = ({ children, isFlatList }) => {

  const renderContent = <KeyboardAvoidingView style={styles.container}>
    {children}
  </KeyboardAvoidingView>

  return isFlatList && <FlatList
    data={[]}
    ListHeaderComponent={renderContent}
    showsVerticalScrollIndicator={false}
   renderItem={null}/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height * 0.95,
    paddingHorizontal: 24
  }
})

export default FormLayout