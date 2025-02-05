import type { CustomNodeType } from "~/common/types/dashboard-workflow";
import type { Nullable } from "~/common/types/tools";
import type { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs/_dashboard-workflow";

import { BackgroundVariant as _BackgroundVariant } from "@xyflow/react";
import { createContext } from "react";

export type WorkflowWidgetStatusContextType = Nullable<{
  canvasBackground: {
    isGridLayout: boolean;
    toggleIsGridLayout: VoidFunction;
    gridLayoutGap: undefined | typeof DASHBOARD_WORKFLOW_CONFIGS.CanvasGridLayoutGap;
    gridLayoutType: undefined | _BackgroundVariant;
  };

  specificNodeFormWidget: {
    specificNodeId: null | CustomNodeType["id"]; // 不为 null 时即为有节点被选中
    setSpecificNodeId: (nodeId: null | CustomNodeType["id"]) => void;
    clearSpecificNodeId: VoidFunction;
  };
}>;

export const WorkflowWidgetStatusContext = createContext<WorkflowWidgetStatusContextType>(null);
