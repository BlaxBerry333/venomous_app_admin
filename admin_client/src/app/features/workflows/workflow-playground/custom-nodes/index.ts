import { Workflows } from "~/app/features/workflows/_types";

import { FetchNode } from "./fetch";
import { MessageNode } from "./message";
import { ScriptNode } from "./script";

export const customNodeComponents: Workflows.NodeComponents = {
  // [Workflows.NodeType.default]: memo(() => null),
  // [Workflows.NodeType.default]: MessageNode,
  [Workflows.NodeType.message]: MessageNode,
  [Workflows.NodeType.fetch]: FetchNode,
  [Workflows.NodeType.script]: ScriptNode,
};
