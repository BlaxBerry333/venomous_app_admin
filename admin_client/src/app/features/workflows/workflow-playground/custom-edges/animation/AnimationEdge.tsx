import type { NamedExoticComponent } from "react";
import { memo } from "react";

import type { Workflows } from "~/app/features/workflows/_types";
import { EdgeWrapper } from "~/app/features/workflows/workflow-playground/custom-edges/_edge-wrapper";

const AnimationEdge: NamedExoticComponent<Workflows.EdgeProps> = memo((props) => {
  return (
    <EdgeWrapper
      {...props}
      renderChildren={({ edgePath }) => (
        <circle r="1.5" fill="#ff0073">
          <animateMotion dur="2s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
    />
  );
});

export default AnimationEdge;
