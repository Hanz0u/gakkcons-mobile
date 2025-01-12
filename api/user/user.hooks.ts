import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getProfileInfo, updateProfileInfo } from "./user.requests";
import { UpdateUserProfileInfoTypes } from "./user.types";

export function useGetProfileInfo() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const result = await getProfileInfo();
      if (result[0] !== true) {
        return Promise.reject(new Error(result[1]));
      }
      return result;
    },
  });
}

export function useUpdateProfileInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateUserProfileInfoTypes) => {
      const result = await updateProfileInfo(data);
      if (result[0] !== true) {
        return Promise.reject(new Error(result[1]));
      }
      return result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
}
