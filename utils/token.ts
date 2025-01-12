import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getToken() {
  const token = await AsyncStorage.getItem("token");
  return token;
}

export async function setToken(token: string) {
  await AsyncStorage.setItem("token", token);
  return true;
}

export async function removeToken() {
  await AsyncStorage.removeItem("token");
  return true;
}
