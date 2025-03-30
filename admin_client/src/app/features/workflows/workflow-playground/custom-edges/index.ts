import { Workflows } from "~/app/features/workflows/_types";

import { AnimationEdge } from "./animation";

export const customEdgeComponents: Workflows.EdgeComponents = {
  // [Workflows.EdgeType.default]: memo(() => null),
  // [Workflows.EdgeType.default]: AnimationEdge,
  [Workflows.EdgeType.animation]: AnimationEdge,
};
