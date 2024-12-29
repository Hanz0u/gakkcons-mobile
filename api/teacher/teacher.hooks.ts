import { useQuery } from "@tanstack/react-query";

import { getTeachers } from "./teacher.requests";

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
