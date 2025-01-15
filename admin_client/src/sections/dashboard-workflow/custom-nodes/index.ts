import type { CustomNodeComponentsType } from "~/common/types/dashboard-workflow";
import { CustomNodeTypeName } from "~/common/types/dashboard-workflow";

import { CustomBlankNode } from "./BlankNode";
import { CustomCodeNode } from "./CodeNode";
import { CustomConditionNode } from "./ConditionNode";
import { CustomMessageNode } from "./MessageNode";
import { CustomResizableNode } from "./ResizableNode";
import { CustomStartNode } from "./StartNode";

export const customNodeComponentsTypes: CustomNodeComponentsType = {
  [CustomNodeTypeName.blank]: CustomBlankNode,
  [CustomNodeTypeName.start]: CustomStartNode,
  [CustomNodeTypeName.message]: CustomMessageNode,
  [CustomNodeTypeName.resizable]: CustomResizableNode,
  [CustomNodeTypeName.condition]: CustomConditionNode,
  [CustomNodeTypeName.code]: CustomCodeNode,
};
