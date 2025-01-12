import {
  ForgotPasswordTypes,
  LoginUserTypes,
  ResetPasswordTypes,
  SignupUserTypes,
  VerifyUserTypes,
} from "./auth.types";
import { instance } from "../instance";
import { setToken } from "@/utils/token";

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

export async function forgotPassword(data: ForgotPasswordTypes) {
  try {
    const response = await instance.post("/api/users/password/forgot", data);
    return [true, response.data];
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    return [false, errorMessage];
  }
}

export async function resetPassword(data: ResetPasswordTypes) {
  try {
    const response = await instance.post("/api/users/password/reset", data);
    return [true, response.data];
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    return [false, errorMessage];
  }
}
