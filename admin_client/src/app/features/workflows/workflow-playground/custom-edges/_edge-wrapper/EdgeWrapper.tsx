import type { NamedExoticComponent, ReactNode } from "react";
import { memo } from "react";

import { BaseEdge as XYFlowBaseEdge, getBezierPath } from "@xyflow/react";

import { FEATURE_WORKFLOWS_CONFIGS } from "~/app/_configs/feature-workflows";
import type { Workflows } from "~/app/features/workflows/_types";

type EdgeWrapperProps = Workflows.EdgeProps & {
  renderChildren?: (params: { edgePath: string }) => ReactNode;
};

const EdgeWrapper: NamedExoticComponent<EdgeWrapperProps> = memo(
  ({ renderChildren, ...edgeProps }) => {
    const {
      id,
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
      style = { strokeWidth: FEATURE_WORKFLOWS_CONFIGS.styles.edgeWidth },
      markerEnd,
    } = edgeProps;

    const [edgePath] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    return (
      <>
        <XYFlowBaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />

        {renderChildren?.({ edgePath })}
      </>
    );
  },
);

export default EdgeWrapper;
