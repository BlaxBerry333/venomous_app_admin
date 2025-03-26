import { useLayoutEffect } from "react";

import { useAPIWorkflowDataDetail } from "~/utils/libs/apis/_hooks/workflows";
import { DASHBOARD_PATHS, useRouteNavigate, useRouteSearchParams } from "~/utils/libs/router";
import { Workflows, WorkflowsFormValue } from "../_types";

export default function useFormatWorkflowsDataDetail() {
  const { id } = useRouteSearchParams<{ id: string }>();
  const { replace } = useRouteNavigate();

  const { data: dataSource, isLoading, failureReason } = useAPIWorkflowDataDetail();

  useLayoutEffect(() => {
    if (
      !id || // 没有 id
      failureReason // 失败了
    ) {
      replace(DASHBOARD_PATHS.workflows.list);
    }
  }, [id, failureReason, replace]);

  return {
    data: dataSource,
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
