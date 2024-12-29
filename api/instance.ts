import axios from "axios";

import { getToken } from "@/utils/token";

const backendURL = "http://192.168.1.16:5000";

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
