import type { FC } from "react";
import type { CustomEdgeWrapperProps } from "~/common/types/dashboard-workflow";

import { memo } from "react";

import {
  BaseEdge as _BaseEdge,
  EdgeLabelRenderer as _EdgeLabelRenderer,
  getBezierPath,
} from "@xyflow/react";

import CustomEdgeWrapperAnimation from "./CustomEdgeWrapperAnimation";
import CustomEdgeWrapperDeleteLabel from "./CustomEdgeWrapperDeleteLabel";

const CustomEdgeWrapper: FC<CustomEdgeWrapperProps> = ({ children, ...props }) => {
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
    data,
    selected,
  } = props;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <_BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />

      {children}

      {selected && <CustomEdgeWrapperAnimation edgeProps={props} edgePath={edgePath} />}

      {data?.showDeleteButton && (
        <_EdgeLabelRenderer>
          <CustomEdgeWrapperDeleteLabel edgeProps={props} edgeLabelProps={{ labelX, labelY }} />
        </_EdgeLabelRenderer>
      )}
    </>
  );
};

export default memo(CustomEdgeWrapper);
