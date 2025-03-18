import type { NamedExoticComponent, ReactNode } from "react";
import { memo, useMemo } from "react";

import { Panel } from "@xyflow/react";

import { useWorkflowOriginalData } from "~/app/features/workflows/_contexts";
import { Typography } from "~/ui/components";
import { formateFromNow } from "~/utils/libs/tools/datetime";

const PlaygroundTopLeftPanel: NamedExoticComponent = memo(() => {
  return (
    <Panel position="top-left">
      <WorkflowInformation />
    </Panel>
  );
});

export default PlaygroundTopLeftPanel;

// ----------------------------------------------------------------------------------------------------

const WorkflowInformation: NamedExoticComponent = memo(() => {
  const { information } = useWorkflowOriginalData();
  return useMemo<ReactNode>(() => {
    if (!information) return null;
    const { id, name, created_at } = information;
    return (
      <Typography component="div" noWrap sx={{ maxWidth: "180px" }}>
        {id && name && (
          <Typography variant="subtitle2">
            {`#${id}`} {name}
          </Typography>
        )}
        {created_at && (
          <Typography variant="caption">Last updated: {formateFromNow(created_at)}</Typography>
        )}
      </Typography>
    );
  }, [information]);
});
