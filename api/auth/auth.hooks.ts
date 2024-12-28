import { useMutation } from "@tanstack/react-query";

import { SignupUserTypes, VerifyUserTypes } from "./auth.types";
import { signupUser, verifyUser } from "./auth.requests";

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
