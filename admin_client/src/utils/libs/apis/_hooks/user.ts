import { useQuery } from "@tanstack/react-query";

import { USER_ENTRYPOINTS } from "../entrypoints/user";
import { ADMIN_SERVER_API_INSTANCE } from "../instances";

export function useAPIUserProfile<T = unknown>() {
  const url = USER_ENTRYPOINTS.profile.url;
  return useQuery<T>({
    queryKey: [url],
    queryFn: async () => {
      const { data } = await ADMIN_SERVER_API_INSTANCE.get(url);
      return data;
    },
  });
}
