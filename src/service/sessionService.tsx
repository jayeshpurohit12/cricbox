import AsyncStorage from "@react-native-async-storage/async-storage";

class SessionService {
  async setStorageData(key, data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  async getStorageData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default new SessionService();
