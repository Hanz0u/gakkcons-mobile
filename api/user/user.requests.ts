import { instance, AuthHeader } from "../instance";
import { UpdateUserProfileInfoTypes } from "./user.types";

export async function getProfileInfo() {
  try {
    const authHeader = await AuthHeader();
    const response = await instance.get("/api/users/profile", authHeader);
    return [true, response.data];
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    return [false, errorMessage];
  }
}

export async function updateProfileInfo(data: UpdateUserProfileInfoTypes) {
  try {
    const authHeader = await AuthHeader();
    const response = await instance.put(
      "/api/users/profile/update",
      data,
      authHeader
    );
    return [true, response.data];
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    return [false, errorMessage];
  }
}
