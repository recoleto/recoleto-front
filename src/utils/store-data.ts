import AsyncStorage from "@react-native-async-storage/async-storage";

type StoreDataProps = {
  key: string;
  value: any;
}

export async function storeData({ key, value }: StoreDataProps) {
    try {
      await AsyncStorage.setItem(key, value);
      return value;
    } catch (error) { 
      console.error(error);
      return error;
     }
}

export async function getData(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) { 
    console.error(error);
    return error;
   }
}

export async function removeData(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) { 
    console.error(error);
    return error;
   }
}