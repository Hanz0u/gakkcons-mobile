import axios from "axios";

import { SignupUserTypes, VerifyUserTypes } from "./auth.types";

const backendURL = "http://192.168.1.16:5000";

const instance = axios.create({
  baseURL: backendURL,
});

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
