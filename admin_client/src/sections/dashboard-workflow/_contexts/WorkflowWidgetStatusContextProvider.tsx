import type { NamedExoticComponent, PropsWithChildren } from "react";
import type { CustomNodeType } from "~/common/types/dashboard-workflow";
import type { Nullable } from "~/common/types/tools";
import type { WorkflowWidgetStatusContextType } from "./WorkflowWidgetStatusContext";

import { BackgroundVariant as _BackgroundVariant } from "@xyflow/react";
import { memo, startTransition, useMemo, useState } from "react";

import useBoolean from "~/common/hooks/useBoolean";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs/_dashboard-workflow";
import { WorkflowWidgetStatusContext } from "./WorkflowWidgetStatusContext";

const WorkflowWidgetStatusContextProvider: NamedExoticComponent<PropsWithChildren> = memo(
  ({ children }) => {
    const gridLayoutHandler = useBoolean(false);

    const [specificNodeId, setSpecificNodeId] = useState<Nullable<CustomNodeType["id"]>>(null);

    // ----------------------------------------------------------------------------------------------------

    const memorizedContextValue = useMemo<WorkflowWidgetStatusContextType>(
      () => ({
        canvasBackground: {
          isGridLayout: gridLayoutHandler.value,
          toggleIsGridLayout: gridLayoutHandler.toggle,
          gridLayoutGap: !gridLayoutHandler.value
            ? undefined
            : DASHBOARD_WORKFLOW_CONFIGS.CanvasGridLayoutGap,
          gridLayoutType: !gridLayoutHandler.value ? undefined : _BackgroundVariant.Dots,
        },
        specificNodeFormWidget: {
          specificNodeId,
          setSpecificNodeId: (id) => startTransition(() => setSpecificNodeId(id)),
          clearSpecificNodeId: () => startTransition(() => setSpecificNodeId(null)),
        },
      }),
      [gridLayoutHandler, specificNodeId],
    );

    // ----------------------------------------------------------------------------------------------------

    return (
      <WorkflowWidgetStatusContext.Provider value={memorizedContextValue}>
        {children}
      </WorkflowWidgetStatusContext.Provider>
    );
  },
);

export default WorkflowWidgetStatusContextProvider;
