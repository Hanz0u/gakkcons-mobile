import { instance, AuthHeader } from "../instance";


export async function getNotifications(search: string = "") {
  try {
    const authHeader = await AuthHeader();
    const response = await instance.get(
      `/api/notifications`,
      authHeader
    );
    return [true, response.data];
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "An error occurred.";
    return [false, errorMessage];
  }
}