import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { WORKFLOW_ENTRYPOINTS } from "~/utils/libs/apis/entrypoints/workflow";
import { ADMIN_SERVER_API_INSTANCE } from "~/utils/libs/apis/instances";
import { useRouteSearchParams } from "~/utils/libs/router";

export function useAPIWorkflowsList<T = unknown>() {
  const url = WORKFLOW_ENTRYPOINTS.list.url;
  return useQuery<T, AxiosError>({
    queryKey: [url, "list"],
    queryFn: async () => {
      const { data } = await ADMIN_SERVER_API_INSTANCE.get(url);
      return data;
    },
  });
}

export function useGetWorkflowData<T = unknown>() {
  const { id } = useRouteSearchParams<{ id: string }>();

  const url = WORKFLOW_ENTRYPOINTS.detail.url.replace(":id", id);
  return useQuery<T, AxiosError>({
    queryKey: [url, "detail"],
    queryFn: async () => {
      const { data } = await ADMIN_SERVER_API_INSTANCE.get(url);
      return data;
    },
    enabled: !!id,
  });
}
