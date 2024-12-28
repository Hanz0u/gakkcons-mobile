import { useMutation } from "@tanstack/react-query";

import {
  ForgotPasswordTypes,
  LoginUserTypes,
  ResetPasswordTypes,
  SignupUserTypes,
  VerifyUserTypes,
} from "./auth.types";
import {
  forgotPassword,
  loginUser,
  resetPassword,
  signupUser,
  verifyUser,
} from "./auth.requests";

export function useSignupUser() {
  return useMutation({
    mutationFn: async (data: SignupUserTypes) => {
      const result = await signupUser(data);
      if (result[0] !== true) {
        return Promise.reject(new Error(result[1]));
      }
      return result;
    },
  });
}

export function useVerifyUser() {
  return useMutation({
    mutationFn: async (data: VerifyUserTypes) => {
      const result = await verifyUser(data);
      if (result[0] !== true) {
        return Promise.reject(new Error(result[1]));
      }
      return result;
    },
  });
}

export function useLoginUser() {
  return useMutation({
    mutationFn: async (data: LoginUserTypes) => {
      const result = await loginUser(data);
      if (result[0] !== true) {
        return Promise.reject(new Error(result[1]));
      }
      return result;
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (data: ForgotPasswordTypes) => {
      const result = await forgotPassword(data);
      if (result[0] !== true) {
        return Promise.reject(new Error(result[1]));
      }
      return result;
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (data: ResetPasswordTypes) => {
      const result = await resetPassword(data);
      if (result[0] !== true) {
        return Promise.reject(new Error(result[1]));
      }
      return result;
    },
  });
}
