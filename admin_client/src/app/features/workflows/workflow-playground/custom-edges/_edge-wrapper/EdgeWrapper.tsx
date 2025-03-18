import type { NamedExoticComponent, ReactNode } from "react";
import { memo } from "react";

import { BaseEdge as XYFlowBaseEdge, getBezierPath } from "@xyflow/react";

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
      style = { strokeWidth: 3 },
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
