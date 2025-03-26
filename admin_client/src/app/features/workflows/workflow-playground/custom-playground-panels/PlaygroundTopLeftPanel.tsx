import type { NamedExoticComponent, ReactNode } from "react";
import { memo, useMemo } from "react";

import { Panel } from "@xyflow/react";

import { useWorkflowOriginalData } from "~/app/features/workflows/_contexts";
import { Typography } from "~/ui/components";
import { formateFromNow } from "~/utils/libs/tools/datetime";

const PlaygroundTopLeftPanel: NamedExoticComponent = memo(() => {
  return (
    <Panel position="top-left" style={{ margin: "2px 4px" }}>
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
    const { id, name, created_at, element: originalElement } = information;
    const originalNodes = originalElement?.nodes || [];
    return (
      <Typography component="div" noWrap sx={{ maxWidth: "180px" }}>
        {id && (
          <Typography variant="caption" component="div" sx={{ color: "text.secondary" }}>
            {`#${id}`}
          </Typography>
        )}
        {name && (
          <Typography variant="caption" component="div" sx={{ color: "text.secondary" }}>
            {name}
          </Typography>
        )}
        {created_at && (
          <Typography variant="caption" component="div" sx={{ color: "text.secondary" }}>
            {`Last updated:`}&nbsp;{formateFromNow(created_at)}
          </Typography>
        )}
        <Typography variant="caption" component="div" sx={{ color: "text.secondary" }}>
          {`Total Nodes ( original ):`}&nbsp;{originalNodes.length}
        </Typography>
      </Typography>
    );
  }, [information]);
});
