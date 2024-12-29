import { instance, AuthHeader } from "../instance";
import { GetTeacherTypes } from "./teacher.types";

export async function getTeachers() {
  console.log("instance", instance);
  try {
    const authHeader = await AuthHeader();
    const response = await instance.get("/api/teachers", authHeader);
    return [true, response.data];
  } catch (error: any) {
    console.log("error", error);
    const errorMessage = error.response.data.message;
    console.log("error mesage", errorMessage);
    return [false, errorMessage];
  }
}
