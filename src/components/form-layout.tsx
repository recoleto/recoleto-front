import React, { ReactNode} from 'react'
import { View, StyleSheet, FlatList, Dimensions } from 'react-native'

type FormLayoutProps = {
  children: ReactNode
}

const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {

  const renderContent = <View style={styles.container}>
    {children}
  </View>

  return <FlatList
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