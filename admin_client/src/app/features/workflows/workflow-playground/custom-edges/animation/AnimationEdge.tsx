import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { FEATURE_WORKFLOWS_CONFIGS } from "~/app/_configs/feature-workflows";
import type { Workflows } from "~/app/features/workflows/_types";
import { EdgeWrapper } from "~/app/features/workflows/workflow-playground/custom-edges/_edge-wrapper";

const AnimationEdge: NamedExoticComponent<Workflows.EdgeProps> = memo((props) => {
  return (
    <EdgeWrapper
      {...props}
      renderChildren={({ edgePath }) => (
        <circle r={FEATURE_WORKFLOWS_CONFIGS.styles.edgeWidth * 2} fill="#ff0073">
          <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
    />
  );
});

export default AnimationEdge;
