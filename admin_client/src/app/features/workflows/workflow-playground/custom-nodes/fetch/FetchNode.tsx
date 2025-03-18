import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Workflows, type WorkflowsFormValue } from "~/app/features/workflows/_types";
import {
  NodeWrapper,
  NodeWrapperItem,
} from "~/app/features/workflows/workflow-playground/custom-nodes/_node-wrapper";
import { Typography } from "~/ui/components";
import FetchNodeDetail, { type FormValueType } from "./FetchNodeDetail";

type FetchNodeProps = Workflows.NodeProps<WorkflowsFormValue.FetchNode>;
type FetchNodeItem = WorkflowsFormValue.FetchNode["items"][number];

const FetchNode: NamedExoticComponent<FetchNodeProps> = memo((props) => {
  const { data } = props;
  const items = data?.formValue?.items || [];

  return (
    <NodeWrapper
      {...props}
      isMultipleItems
      cardContent={items.map((item) => (
        <FetchNodeItem key={item.url} item={item} />
      ))}
      portalDetailContent={
        <FetchNodeDetail
          defaultValues={data?.formValue}
          onSubmit={(formValue: FormValueType) => console.log(formValue)}
        />
      }
    />
  );
});

export default FetchNode;

const FetchNodeItem: NamedExoticComponent<{ item: FetchNodeItem }> = memo(({ item }) => {
  return (
    <NodeWrapperItem key={item.url} id={item.url}>
      <Typography variant="subtitle2" sx={{ width: 40, mr: 1, fontWeight: "bold", color: "grey" }}>
        {item.method}
      </Typography>
      <Typography variant="caption" sx={{ color: "grey" }}>
        {item.url}
      </Typography>
    </NodeWrapperItem>
  );
});
