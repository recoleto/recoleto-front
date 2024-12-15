import AsyncStorage from "@react-native-async-storage/async-storage";

type StoreDataProps = {
  key: string;
  value: any;
}

export async function storeData({ key, value }: StoreDataProps) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) { return error; }
}

export async function getData(key: string) {
  try {
    await AsyncStorage.getItem(key);
  } catch (error) { return error; }
}

export async function removeData(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) { return error; }
}