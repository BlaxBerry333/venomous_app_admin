import type { NamedExoticComponent, ReactNode } from "react";
import { memo, useMemo } from "react";

import { Panel } from "@xyflow/react";

import { useWorkflowOriginalData } from "~/app/features/workflows/workflow-playground/_contexts";
import { Tooltip, Typography } from "~/ui/components";
import { formateDateTime, formateFromNow } from "~/utils/libs/tools/datetime";

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
    const { id, name, updatedAt, createdAt } = information;
    return (
      <Tooltip
        title={
          <>
            {updatedAt && (
              <Typography variant="caption" component="p">
                {`Last Updated At:`}&nbsp;{formateFromNow(updatedAt)}
              </Typography>
            )}
            {createdAt && (
              <Typography variant="caption" component="p">
                {`Created At:`}&nbsp;{formateDateTime(createdAt)}
              </Typography>
            )}
          </>
        }
      >
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
        </Typography>
      </Tooltip>
    );
  }, [information]);
});
