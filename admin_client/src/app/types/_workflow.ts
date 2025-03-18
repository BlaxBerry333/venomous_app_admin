export type IWorkflowDataResponse = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  element: {
    nodes: unknown[];
    edges: unknown[];
  };
};
