import { useQuery } from "@tanstack/react-query";
import { WORKFLOW_ENTRYPOINTS } from "../entrypoints/workflow";
import { ADMIN_SERVER_API_INSTANCE } from "../instances";

export function useAPIWorkflowList<T = unknown>() {
  const url = WORKFLOW_ENTRYPOINTS.list.url;
  return useQuery<T>({
    queryKey: [url],
    queryFn: async () => {
      const { data } = await ADMIN_SERVER_API_INSTANCE.get(url);
      return data;
    },
  });
}
