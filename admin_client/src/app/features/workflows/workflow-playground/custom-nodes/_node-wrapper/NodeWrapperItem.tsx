import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { Typography } from "~/ui/components";
import NodeWrapperConnectionDots from "./NodeWrapperConnectionDots";

export type NodeWrapperItemProps = PropsWithChildren<{
  id: string;
}>;

const NodeWrapperItem: NamedExoticComponent<NodeWrapperItemProps> = memo(({ children, id }) => {
  return (
    <Typography
      component="div"
      variant="body2"
      noWrap
      sx={{
        position: "relative",
        overflow: "visible",
        backgroundColor: "action.hover",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        p: 1,
        my: 0.5,
      }}
    >
      {/* item label */}
      {children}

      {/* item connection dots */}
      <NodeWrapperConnectionDots.SourceDot id={id} style={{ right: "-8px" }} />
    </Typography>
  );
});

export default NodeWrapperItem;
