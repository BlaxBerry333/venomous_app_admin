import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo, useMemo } from "react";

import { ReactFlowProvider } from "@xyflow/react";

import { Paper } from "~/ui/components";
import { WorkflowOriginalDataContext, type WorkflowOriginalDataContextType } from "../_contexts";

type WorkflowPlaygroundWrapperProps = PropsWithChildren<WorkflowOriginalDataContextType>;

const WorkflowPlaygroundWrapper: NamedExoticComponent<WorkflowPlaygroundWrapperProps> = memo(
  ({ information, originalElement, children }) => {
    const defaultElement = useMemo<WorkflowOriginalDataContextType>(() => {
      return {
        information,
        originalElement: {
          nodes: originalElement?.nodes || [],
          edges: originalElement?.edges || [],
        },
      };
    }, [information, originalElement]);

    return (
      <ReactFlowProvider
        initialNodes={defaultElement.originalElement?.nodes}
        initialEdges={defaultElement.originalElement?.edges}
      >
        <WorkflowOriginalDataContext.Provider value={defaultElement}>
          <Paper
            hasElevation={false}
            sx={{ height: `calc(100%) !important`, overflow: "hidden", backgroundImage: "none" }}
          >
            {children}
          </Paper>
        </WorkflowOriginalDataContext.Provider>
      </ReactFlowProvider>
    );
  },
);

export default WorkflowPlaygroundWrapper;
