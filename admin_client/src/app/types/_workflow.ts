/**
 * response of useAPIWorkflowsDataList
 * `/admin-server-api/workflow/data/`
 */
export type IWorkflowDataListResponse = {
  results: IWorkflowDataResponse[];
  count: number;
  next: null | string;
  perious: null | string;
};

/**
 * response of useAPIWorkflowsData
 * `/admin-server-api/workflow/data/<id>/`
 */
export type IWorkflowDataResponse = {
  id: string;
  name: string;
  description: string;
  type: IWorkflowDataType;
  created_at: string; // ISO 8601 格式日期字符串
  updated_at: string; // ISO 8601 格式日期字符串
  is_active: boolean;
  element: {
    nodes: unknown[];
    edges: unknown[];
  };
};

export enum IWorkflowDataType {
  Logic = "logic",
  Draft = "draft",
}
