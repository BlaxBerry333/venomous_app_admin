import type { CSSProperties, NamedExoticComponent } from "react";
import { memo } from "react";

import { Handle as XYFlowHandle, Position as XYFlowPosition } from "@xyflow/react";

const commonStyles: CSSProperties = {
  height: 32,
  width: 8,
  zIndex: 2,
  backgroundColor: "#BDBDBD",
  borderRadius: "8px",
  cursor: "cell",
};

type CommonDotProps = {
  id: string;
  style?: CSSProperties;
};

const NodeTargetDot: NamedExoticComponent<CommonDotProps> = memo(({ id, style }) => {
  return (
    <XYFlowHandle
      type="target"
      id={id}
      isConnectableEnd
      position={XYFlowPosition.Left}
      style={{ ...commonStyles, ...style }}
      // onConnect={(connection) => console.log("target", connection)}
    />
  );
});

const NodeSourceDot: NamedExoticComponent<CommonDotProps> = memo(({ id = "source", style }) => {
  return (
    <XYFlowHandle
      type="source"
      id={id}
      isConnectableStart
      position={XYFlowPosition.Right}
      style={{ ...commonStyles, ...style }}
      // onConnect={(connection) => console.log("source", connection)}
    />
  );
});

export default {
  TargetDot: NodeTargetDot,
  SourceDot: NodeSourceDot,
};
