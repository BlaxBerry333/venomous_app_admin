import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { WorkflowInfoType } from "~/common/types/dashboard-workflow";
import type { SupportedFileTypes } from "~/common/types/tools";
import { downloadFile } from "~/common/utils/handle-files";
import { API_ENTRYPOINTS } from "../entry-points";
import { SERVER_API_INSTANCE } from "../instance";
import type {
  CreateWorkflowParameterType,
  CreateWorkflowResponseType,
  GetWorkflowDataListResponse,
  GetWorkflowDataResponse,
  GetWorkflowHistoryListResponse,
  GetWorkflowHistoryResponse,
  UpdateWorkflowDataParameterType,
  UpdateWorkflowDataResponseType,
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
  const queryClient = useQueryClient();

  const url = API_ENTRYPOINTS.workflow.postWorkflowData();

  const mutate = useMutation<CreateWorkflowResponseType, AxiosError, CreateWorkflowParameterType>({
    mutationKey: [url, "post"],
    mutationFn: async (data) => {
      const response = await SERVER_API_INSTANCE.post(url, data);
      return response.data;
    },
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      queryClient.invalidateQueries({
        queryKey: [API_ENTRYPOINTS.workflow.getWorkflowDataList(), "list"],
      });
    },
  });

  return { ...mutate };
}

export function useUpdateWorkflowData(id: string) {
  const queryClient = useQueryClient();
  const url = API_ENTRYPOINTS.workflow.patchWorkflowData(id);

  const mutate = useMutation<unknown, AxiosError, UpdateWorkflowDataParameterType>({
    mutationKey: [url, "patch"],
    mutationFn: async (data) => {
      const response = await SERVER_API_INSTANCE.patch(url, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENTRYPOINTS.workflow.getWorkflowDataList(), "list"],
      });
    },
  });

  return { ...mutate };
}

export async function deleteWorkflowData(id: string): Promise<void> {
  const url = API_ENTRYPOINTS.workflow.deleteWorkflowData(id);
  await SERVER_API_INSTANCE.delete(url);
}

export function useDeleteWorkflowData(id: string) {
  const queryClient = useQueryClient();
  const url = API_ENTRYPOINTS.workflow.deleteWorkflowData(id);

  const mutate = useMutation<void, AxiosError, void>({
    mutationKey: [url, "delete"],
    mutationFn: async () => {
      await SERVER_API_INSTANCE.delete(url);
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENTRYPOINTS.workflow.getWorkflowDataList(), "list"],
      });
    },
  });

  return { ...mutate };
}

export function useUpdateWorkflowPlayground(id: string) {
  const url = API_ENTRYPOINTS.workflow.patchWorkflowData(id);

  const mutate = useMutation<
    UpdateWorkflowDataResponseType,
    AxiosError,
    UpdateWorkflowDataParameterType["playground"]
  >({
    mutationKey: [url, "patch", "playground"],
    mutationFn: async (data) => {
      const response = await SERVER_API_INSTANCE.patch(url, { playground: data });
      return response.data;
    },
  });

  return { ...mutate };
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

export async function downloadWorkflowDataList(
  fileType: SupportedFileTypes,
): Promise<{ fileName: string }> {
  const downloadURL = API_ENTRYPOINTS.workflow.downloadAllWorkflowData(fileType);
  const { headers } = await SERVER_API_INSTANCE.get(downloadURL);
  const fileName: string = headers["content-disposition"].split("filename=")[1];

  downloadFile({ url: downloadURL, fileName });
  return { fileName };
}

export async function downloadWorkflowData(id: string): Promise<{ fileName: string }> {
  const downloadURL = API_ENTRYPOINTS.workflow.downloadWorkflowData(id);
  const { headers } = await SERVER_API_INSTANCE.get(downloadURL);
  const fileName: string = headers["content-disposition"].split("filename=")[1];

  downloadFile({ url: downloadURL, fileName });
  return { fileName };
}
