import type { CustomEdgeComponentsType } from "~/common/types/dashboard-workflow";
import { CustomEdgeTypeName } from "~/common/types/dashboard-workflow";

import CustomDefaultEdge from "./CustomDefaultEdge";
import CustomDeleteLabelEdge from "./CustomDeleteLabelEdge";

export const customEdgeComponentsTypes: CustomEdgeComponentsType = {
  [CustomEdgeTypeName.default]: CustomDefaultEdge,
  [CustomEdgeTypeName.deleteLabel]: CustomDeleteLabelEdge,
};
