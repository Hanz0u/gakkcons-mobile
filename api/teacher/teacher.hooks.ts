import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getTeachers, requestAppointment } from "./teacher.requests";
import { RequestAppointmentTypes } from "./teacher.types";

export function useGetTeachers() {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const result = await getTeachers();
      if (result[0] !== true) {
        return Promise.reject(new Error(result[1]));
      }
      return result;
    },
  });
}

export function useRequestAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RequestAppointmentTypes) => {
      const result = await requestAppointment(data);
      if (result[0] !== true) {
        return Promise.reject(new Error(result[1]));
      }
      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teachers"] }),
  });
}
