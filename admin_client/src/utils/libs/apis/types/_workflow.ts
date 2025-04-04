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
  createdAt: string; // ISO 8601 格式日期字符串
  updatedAt: string; // ISO 8601 格式日期字符串
  isActive: boolean;
  element: string; // json string
};

export enum IWorkflowDataType {
  Logic = "LOGIC",
  Draft = "DRAFT",
}
