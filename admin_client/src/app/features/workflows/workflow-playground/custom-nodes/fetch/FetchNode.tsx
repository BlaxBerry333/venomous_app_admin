import type { NamedExoticComponent } from "react";
import { lazy, memo, Suspense, useCallback } from "react";

import { Workflows, type WorkflowsFormValue } from "~/app/features/workflows/_types";
import { useNodeUpdate } from "~/app/features/workflows/workflow-playground/_hooks/core";
import {
  NodeWrapper,
  NodeWrapperItem,
} from "~/app/features/workflows/workflow-playground/custom-nodes/_node-wrapper";
import { Typography } from "~/ui/components";
import type { FormValueType } from "./FetchNodeDetail";

const FetchNodeDetail = lazy(() => import("./FetchNodeDetail"));

type FetchNodeProps = Workflows.NodeProps<WorkflowsFormValue.FetchNode>;
type FetchNodeItem = WorkflowsFormValue.FetchNode["items"][number];

const FetchNode: NamedExoticComponent<FetchNodeProps> = memo((props) => {
  const { id, data } = props;
  const items = data?.formValue?.items || [];

  const { updateSpecificNodeFormValue } = useNodeUpdate();

  const handleSubmit = useCallback(
    (formValue: FormValueType) => updateSpecificNodeFormValue(id, formValue),
    [id, updateSpecificNodeFormValue],
  );

  return (
    <NodeWrapper
      {...props}
      isMultipleItems
      cardContent={items.map((item) => (
        <FetchNodeItem key={item.url} item={item} />
      ))}
      portalDetailContent={
        <Suspense fallback={null}>
          <FetchNodeDetail nodeId={id} defaultValues={data?.formValue} onSubmit={handleSubmit} />
        </Suspense>
      }
    />
  );
});

export default FetchNode;

const FetchNodeItem: NamedExoticComponent<{ item: FetchNodeItem }> = memo(({ item }) => {
  return (
    <NodeWrapperItem key={item.url} id={item.url} sx={{ justifyContent: "flex-start" }}>
      <Typography
        variant="subtitle2"
        sx={{ width: 40, mr: 1.5, fontWeight: "bold", color: "grey" }}
      >
        {item.method}
      </Typography>
      <Typography variant="caption" noWrap sx={{ color: "grey" }}>
        {item.url}
      </Typography>
    </NodeWrapperItem>
  );
});
