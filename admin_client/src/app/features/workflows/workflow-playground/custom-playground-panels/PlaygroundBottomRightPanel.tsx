import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Panel } from "@xyflow/react";

import { NodeDetail } from "~/app/features/workflows/workflow-playground/custom-nodes-detail";

const PlaygroundBottomRightPanel: NamedExoticComponent = memo(() => {
  return (
    <Panel position="bottom-right" style={{ margin: "2px" }}>
      <NodeDetail />
    </Panel>
  );
});

export default PlaygroundBottomRightPanel;
