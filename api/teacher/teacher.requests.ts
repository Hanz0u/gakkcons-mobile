import { instance, AuthHeader } from "../instance";
import { GetTeacherTypes } from "./teacher.types";

export async function getTeachers() {
  try {
    const authHeader = await AuthHeader();
    const response = await instance.get("/api/teachers", authHeader);
    return [true, response.data];
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    return [false, errorMessage];
  }
}
