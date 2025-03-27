import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { WORKFLOW_ENTRYPOINTS } from "~/utils/libs/apis/entrypoints/workflow";
import { ADMIN_SERVER_API_INSTANCE } from "~/utils/libs/apis/instances";
import type {
  IWorkflowDataListResponse,
  IWorkflowDataResponse,
} from "~/utils/libs/apis/types/_workflow";
import { useRouteSearchParams } from "~/utils/libs/router";

export function useAPIWorkflowsDataList<T = IWorkflowDataListResponse>() {
  const url = WORKFLOW_ENTRYPOINTS.list.url;
  return useQuery<T, AxiosError>({
    queryKey: [url],
    queryFn: async () => {
      const { data } = await ADMIN_SERVER_API_INSTANCE.get(url);
      return data;
    },
  });
}

export function useAPIWorkflowDataDetail<T = IWorkflowDataResponse>() {
  const { id } = useRouteSearchParams<{ id: string }>();
  const url = WORKFLOW_ENTRYPOINTS.detail.url.replace(":id", id);
  return useQuery<T, AxiosError>({
    queryKey: [url],
    queryFn: async () => {
      const { data } = await ADMIN_SERVER_API_INSTANCE.get(url);
      return data;
    },
    enabled: !!id,
  });
}

export function useAPIWorkflowDataCrete<
  T = IWorkflowDataResponse,
  P = Partial<IWorkflowDataResponse>,
>() {
  const queryClient = useQueryClient();
  const url = WORKFLOW_ENTRYPOINTS.create.url;
  return useMutation<T, AxiosError, P>({
    mutationKey: [url],
    mutationFn: async (data) => {
      const response = await ADMIN_SERVER_API_INSTANCE.post(url, data);
      return response.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [WORKFLOW_ENTRYPOINTS.list.url],
      });
    },
  });
}

export function useAPIWorkflowDataUpdate<
  T = IWorkflowDataResponse,
  P = Partial<IWorkflowDataResponse>,
>() {
  const { id } = useRouteSearchParams<{ id: string }>();
  const queryClient = useQueryClient();
  const url = WORKFLOW_ENTRYPOINTS.update.url.replace(":id", id);
  return useMutation<T, AxiosError, P>({
    mutationKey: [url],
    mutationFn: async (data) => {
      const response = await ADMIN_SERVER_API_INSTANCE.patch(url, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WORKFLOW_ENTRYPOINTS.list.url],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [url],
        exact: false,
      });
    },
  });
}

export function useAPIWorkflowDataDelete<T = IWorkflowDataResponse, P = string>() {
  const queryClient = useQueryClient();
  return useMutation<T, AxiosError, P>({
    mutationKey: [WORKFLOW_ENTRYPOINTS.delete.url],
    mutationFn: async (id) => {
      const url = WORKFLOW_ENTRYPOINTS.delete.url.replace(":id", id as string);
      const response = await ADMIN_SERVER_API_INSTANCE.delete(url);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WORKFLOW_ENTRYPOINTS.list.url],
      });
    },
  });
}

export function useAPIWorkflowPlaygroundUpdate<
  T = IWorkflowDataResponse,
  P = Record<string, unknown>,
>() {
  const { id } = useRouteSearchParams<{ id: string }>();
  const queryClient = useQueryClient();
  const url = WORKFLOW_ENTRYPOINTS.update.url.replace(":id", id);
  return useMutation<T, AxiosError, P>({
    mutationKey: [url],
    mutationFn: async (data) => {
      const response = await ADMIN_SERVER_API_INSTANCE.patch(url, {
        element: JSON.stringify(data),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WORKFLOW_ENTRYPOINTS.list.url],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [url],
        exact: false,
      });
    },
  });
}
