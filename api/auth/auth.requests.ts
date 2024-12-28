import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginUserTypes, SignupUserTypes, VerifyUserTypes } from "./auth.types";

const backendURL = "http://192.168.1.16:5000";

const instance = axios.create({
  baseURL: backendURL,
});

export async function getToken() {
  const token = await AsyncStorage.getItem("token");
  return token;
}

export async function setToken(token: string) {
  await AsyncStorage.setItem("token", token);
  return true;
}

export async function signupUser(data: SignupUserTypes) {
  try {
    const response = await instance.post("/api/users/signup", data);
    return [true, response.data];
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    return [false, errorMessage];
  }
}

export async function verifyUser(data: VerifyUserTypes) {
  try {
    const response = await instance.post("/api/users/verify", data);
    return [true, response.data];
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    return [false, errorMessage];
  }
}

export async function loginUser(data: LoginUserTypes) {
  try {
    const response = await instance.post("/api/users/login", data);

    const token = response.data.token;
    await setToken(token);

    return [true, response.data];
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    return [false, errorMessage];
  }
}
