import { memo, type NamedExoticComponent } from "react";

import { useDashboardWorkflowsDetailView } from "~/app/features/workflows/_hooks";
import { Workflows, WorkflowsFormValue } from "~/app/features/workflows/_types";
import {
  WorkflowPlayground,
  WorkflowPlaygroundWrapper,
} from "~/app/features/workflows/workflow-playground";
import { FullPageLoading } from "~/ui/components";

const mock_nodes: Workflows.Node[] = [
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

const DashboardWorkflowsPlaygroundView: NamedExoticComponent = memo(() => {
  const { data, isLoading } = useDashboardWorkflowsDetailView();

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <WorkflowPlaygroundWrapper
      information={{ id: data?.id, name: data?.name, created_at: data?.created_at }}
      // originalElement={data?.element}
      originalElement={{ nodes: mock_nodes, edges: [] }}
    >
      <WorkflowPlayground />
    </WorkflowPlaygroundWrapper>
  );
});

export default DashboardWorkflowsPlaygroundView;
