import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { IWorkflowDataListResponse, IWorkflowDataResponse } from "~/app/types/_workflow";
import { WORKFLOW_ENTRYPOINTS } from "~/utils/libs/apis/entrypoints/workflow";
import { ADMIN_SERVER_API_INSTANCE } from "~/utils/libs/apis/instances";
import { useRouteSearchParams } from "~/utils/libs/router";

export function useAPIWorkflowsDataList<T = IWorkflowDataListResponse>() {
  const url = WORKFLOW_ENTRYPOINTS.list.url;
  return useQuery<T, AxiosError>({
    queryKey: [url, "list"],
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
    queryKey: [url, "detail"],
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
    mutationKey: [url, "create"],
    mutationFn: async (data) => {
      const response = await ADMIN_SERVER_API_INSTANCE.post(url, data);
      return response.data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [WORKFLOW_ENTRYPOINTS.list.url, "list"],
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
    mutationKey: [url, "update"],
    mutationFn: async (data) => {
      const response = await ADMIN_SERVER_API_INSTANCE.patch(url, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WORKFLOW_ENTRYPOINTS.list.url, "list"],
      });
    },
  });
}

export function useAPIWorkflowDataDelete<T = IWorkflowDataResponse, P = string>() {
  const queryClient = useQueryClient();
  return useMutation<T, AxiosError, P>({
    mutationKey: [WORKFLOW_ENTRYPOINTS.delete.url, "delete"],
    mutationFn: async (id) => {
      const url = WORKFLOW_ENTRYPOINTS.delete.url.replace(":id", id as string);
      const response = await ADMIN_SERVER_API_INSTANCE.delete(url);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WORKFLOW_ENTRYPOINTS.list.url, "list"],
      });
    },
  });
}

export function useAPIWorkflowPlaygroundUpdate<
  T = IWorkflowDataResponse,
  P = IWorkflowDataResponse["element"],
>() {
  const { id } = useRouteSearchParams<{ id: string }>();
  const queryClient = useQueryClient();
  const url = WORKFLOW_ENTRYPOINTS.update.url.replace(":id", id);
  return useMutation<T, AxiosError, P>({
    mutationKey: [url, "update", "playground"],
    mutationFn: async (data) => {
      const response = await ADMIN_SERVER_API_INSTANCE.patch(url, { element: data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [WORKFLOW_ENTRYPOINTS.list.url, "list", "detail"],
      });
    },
  });
}
