import type {
  CustomNodeDataFormValueType,
  CustomNodeTypeName,
} from "~/common/types/dashboard-workflow";
import type { Nullable } from "~/common/types/tools";
import type { DRFPaginatedResponseType } from "./_common";

export type GetWorkflowDataResponse = DRFWorkflowDataType;

export type GetWorkflowHistoryResponse = DRFWorkflowHistoryType;

export type GetWorkflowDataListResponse = DRFPaginatedResponseType<DRFWorkflowDataType>;

export type GetWorkflowHistoryListResponse = DRFPaginatedResponseType<DRFWorkflowHistoryType>;

export type UpdateWorkflowDataResponseType = DRFWorkflowDataType;

export type UpdateWorkflowDataParameterType = Partial<
  Pick<DRFWorkflowDataType, "name" | "description" | "is_active" | "is_draft" | "playground">
>;

export type CreateWorkflowResponseType = DRFWorkflowDataType;

export type CreateWorkflowParameterType = Partial<
  Pick<DRFWorkflowDataType, "name" | "description" | "is_active" | "is_draft">
>;

export type DeleteWorkflowDataResponseType = DRFWorkflowDataType;

// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------

export type DRFWorkflowDataType = {
  id: number;
  name: string;
  description: string;
  created_at: string; // ISO 8601 格式日期字符串
  updated_at: string; // ISO 8601 格式日期字符串
  is_active: boolean;
  is_draft: boolean;
  playground: DRFWorkflowPlaygroundDataType;
};

export type DRFWorkflowHistoryType = {
  id: number;
  title: string;
  description: string;
  created_at: string; // ISO 8601 格式日期字符串
  updated_at: string; // ISO 8601 格式日期字符串
  playground: DRFWorkflowPlaygroundDataType;
};

export type DRFWorkflowPlaygroundDataType = {
  nodes: Array<{
    id: string;
    type: CustomNodeTypeName;
    data: Nullable<CustomNodeDataFormValueType>;
    position: { x: number; y: number };
  }>;
  edges: Array<{
    id: string;
    type: string;
    source: string;
    target: string;
  }>;
};
