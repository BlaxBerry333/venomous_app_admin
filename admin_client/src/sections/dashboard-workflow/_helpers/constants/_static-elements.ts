import { CustomNodeTypeName, type WorkflowElementsType } from "~/common/types/dashboard-workflow";

export const DEFAULT_START_NODE = {
  id: "1",
  type: CustomNodeTypeName.start,
} as const;

export const INITIAL_WORKFLOW_ELEMENTS: WorkflowElementsType = {
  nodes: [],
  edges: [],
};
