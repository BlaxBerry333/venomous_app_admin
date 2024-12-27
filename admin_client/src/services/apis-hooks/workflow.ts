import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { WorkflowInfoType } from "~/common/types/dashboard-workflow";
import { API_ENTRYPOINTS } from "../entry-points";
import { SERVER_API_INSTANCE } from "../instance";
import type {
  GetWorkflowDataListResponse,
  GetWorkflowDataResponse,
  GetWorkflowHistoryListResponse,
  GetWorkflowHistoryResponse,
  UpdateWorkflowDataParameterType,
} from "../types/workflow";

export function useGetWorkflowDataList() {
  const url = API_ENTRYPOINTS.workflow.getWorkflowDataList();

  const query = useQuery<GetWorkflowDataListResponse, AxiosError>({
    queryKey: [url, "list"],
    queryFn: async () => {
      const response = await SERVER_API_INSTANCE.get<GetWorkflowDataListResponse>(url);
      return response.data;
    },
  });

  return { ...query };
}

export function useGetWorkflowData(id: string) {
  const url = API_ENTRYPOINTS.workflow.getWorkflowData(id);

  const query = useQuery<WorkflowInfoType, AxiosError>({
    queryKey: [url, "detail"],
    queryFn: async () => {
      const { data } = await SERVER_API_INSTANCE.get<GetWorkflowDataResponse>(url);

      const formattedData: WorkflowInfoType = {
        id: data.id.toString(),
        title: data.name,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        isDraft: data.is_draft,
        isLocked: !data.is_active,
      };
      return formattedData;
    },
  });

  return { ...query };
}

export function useCreteWorkflowData() {
  const url = API_ENTRYPOINTS.workflow.postWorkflowData();

  const mutate = useMutation({
    mutationKey: [url, "post"],
    mutationFn: async (params) => {
      const response = await SERVER_API_INSTANCE.post(url, {
        data: params,
      });
      return response.data;
    },
  });

  return {
    ...mutate,
  };
}

export function useUpdateWorkflowData(id: string) {
  const url = API_ENTRYPOINTS.workflow.patchWorkflowData(id);

  const mutate = useMutation<unknown, AxiosError, UpdateWorkflowDataParameterType>({
    mutationKey: [url, "patch"],
    mutationFn: async (params) => {
      const response = await SERVER_API_INSTANCE.patch(url, {
        data: params,
      });
      return response.data;
    },
  });

  return {
    ...mutate,
  };
}

export function useUpdateWorkflowPlayground(id: string) {
  const url = API_ENTRYPOINTS.workflow.patchWorkflowData(id);

  const mutate = useMutation<unknown, AxiosError, UpdateWorkflowDataParameterType["playground"]>({
    mutationKey: [url, "patch", "playground"],
    mutationFn: async (params) => {
      const response = await SERVER_API_INSTANCE.patch(url, {
        data: { playground: params },
      });
      return response.data;
    },
  });

  return {
    ...mutate,
  };
}

export function useGetWorkflowHistoryList() {
  const url = API_ENTRYPOINTS.workflow.getWorkflowHistoryList();

  const query = useQuery<GetWorkflowHistoryListResponse, AxiosError>({
    queryKey: [url, "list"],
    queryFn: async () => {
      const response = await SERVER_API_INSTANCE.get<GetWorkflowHistoryListResponse>(url);
      return response.data;
    },
  });

  return { ...query };
}

export function useGetWorkflowHistory(id: string) {
  const url = API_ENTRYPOINTS.workflow.getWorkflowHistory(id);

  const query = useQuery<GetWorkflowHistoryResponse, AxiosError>({
    queryKey: [url, "detail"],
    queryFn: async () => {
      const response = await SERVER_API_INSTANCE.get<GetWorkflowHistoryResponse>(url);
      return response.data;
    },
  });

  return { ...query };
}
