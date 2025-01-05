import { instance, AuthHeader } from "../instance";
import { RequestAppointmentTypes } from "./teacher.types";

export async function getTeachers(search: string = "") {
  try {
    const authHeader = await AuthHeader();
    const response = await instance.get(
      `/api/teachers?search=${encodeURIComponent(search)}`,
      authHeader
    );
    return [true, response.data];
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "An error occurred.";
    return [false, errorMessage];
  }
}

export async function requestAppointment(data: RequestAppointmentTypes) {
  try {
    const authHeader = await AuthHeader();
    const response = await instance.post(
      "/api/appointments/request",
      data,
      authHeader
    );
    return [true, response.data];
  } catch (error: any) {
    const errorMessage = error.response.data.message;
    return [false, errorMessage];
  }
}
