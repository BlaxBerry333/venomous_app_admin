import type {
  CustomEdgeType,
  CustomNodeType,
  WorkflowInfoType,
} from "~/common/types/dashboard-workflow";
import { CustomEdgeTypeName, CustomNodeTypeName } from "~/common/types/dashboard-workflow";

export const _MOCK_WORKFLOW_INFO: WorkflowInfoType = {
  id: "100",
  title: "Sample Workflow",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const _MOCK_NODES: CustomNodeType[] = [
  {
    id: "1",
    type: CustomNodeTypeName.start,
    position: { x: 100, y: 100 },
    data: {
      form: undefined,
    },
  },
  {
    id: "2",
    type: CustomNodeTypeName.message,
    position: { x: 600, y: 300 },
    data: {
      form: {
        value: {
          title: "2 yyyyyy",
        },
        isValid: true,
      },
    },
  },
  {
    id: "3",
    type: CustomNodeTypeName.message,
    position: { x: 400, y: 400 },
    data: {
      form: {
        value: {
          title: "3 zzzzzz",
        },
        isValid: true,
      },
    },
  },
  {
    id: "4",
    type: CustomNodeTypeName.message,
    position: { x: 600, y: 80 },
    data: {
      form: {
        value: {
          title: "4 ooooo",
        },
        isValid: true,
      },
    },
  },
];

export const _MOCK_EDGES: CustomEdgeType[] = [
  {
    id: "e1-3",
    type: CustomEdgeTypeName.deleteLabel,
    source: "1",
    target: "3",
  },
];
