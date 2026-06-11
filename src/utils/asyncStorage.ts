import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
      try{
            await AsyncStorage.setItem(key, value);
      }catch(e){
            console.log('Error storing data', e);
      }
}

export const getData = async (key: string) => {
      try{
            const value = await AsyncStorage.getItem(key);
            if(value !== null){
                  return value ? JSON.parse(value) : null;
            }
      }catch(e){
            console.log('Error getting data', e);
      }
}

export const removeData = async (key: string) => {
      try{
            await AsyncStorage.removeItem(key);
      }catch(e){
            console.log('Error removing data', e);
      }
}

export const clearAllData = async () => {
      try{
            await AsyncStorage.clear();
      }catch(e){
            console.log('Error clearing data', e);
      }
}