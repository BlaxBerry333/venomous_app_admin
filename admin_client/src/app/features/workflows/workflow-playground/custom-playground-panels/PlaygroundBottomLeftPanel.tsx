import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Panel } from "@xyflow/react";

const PlaygroundBottomLeftPanel: NamedExoticComponent = memo(() => {
  return <Panel position="bottom-left">PlaygroundBottomLeftPanel</Panel>;
});

export default PlaygroundBottomLeftPanel;
