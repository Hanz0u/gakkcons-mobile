import axios from "axios";

import { getToken } from "@/utils/token";

export let backendURL: any;
if (process.env.EXPO_PUBLIC_BACKEND_URL) {
  backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;
} else {
  throw new Error(
    "EXPO_PUBLIC_BACKEND_URL is not defined in env file. Please add it and restart the server."
  );
}

export const instance = axios.create({
  baseURL: backendURL,
});

export async function AuthHeader() {
  const token = await getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
