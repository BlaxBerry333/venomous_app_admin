import { useAPIWorkflowDataDetail } from "~/utils/libs/apis/_hooks/workflows";
import { DASHBOARD_PATHS, useRouteRedirect, useRouteSearchParams } from "~/utils/libs/router";
import { Workflows, WorkflowsFormValue } from "../_types";

export default function useDashboardWorkflowsPlaygrounView() {
  const { data, isLoading, failureReason } = useAPIWorkflowDataDetail();

  const { id } = useRouteSearchParams<{ id: string }>();
  const shouldRedirect: boolean = !id || !!failureReason;
  useRouteRedirect(shouldRedirect, DASHBOARD_PATHS.workflows.list);

  return {
    data,
    isLoading,
  };
}

export const mock_nodes: Workflows.Node[] = [
  {
    id: "1",
    type: Workflows.NodeType.message,
    position: { x: 100, y: 100 },
    data: {
      formValue: {
        description: "A",
        message: "A",
      },
    },
  },
  {
    id: "2",
    type: Workflows.NodeType.message,
    position: { x: 100, y: 300 },
    data: {
      formValue: {
        description: "B",
        message: "B",
      },
    },
  },
  {
    id: "3",
    type: Workflows.NodeType.script,
    position: { x: 500, y: 300 },
    data: {},
  },
  {
    id: "4",
    type: Workflows.NodeType.fetch,
    position: { x: 100, y: 500 },
    data: {
      formValue: {
        description: "xxxxxxx",
        items: [
          {
            method: WorkflowsFormValue.FetchNodeMethod.GET,
            url: "https://example.com",
          },
          {
            method: WorkflowsFormValue.FetchNodeMethod.POST,
            url: "https://example.com/aaabbbcccdddeeefff",
          },
        ],
      },
    },
  },
];
