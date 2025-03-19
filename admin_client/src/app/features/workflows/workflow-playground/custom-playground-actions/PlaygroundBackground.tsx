import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Background as XYFlowBackground } from "@xyflow/react";
import { usePlaygroundActionStatusStore } from "../_hooks";

const PlaygroundBackground: NamedExoticComponent = memo(() => {
  const { backgroundVariant } = usePlaygroundActionStatusStore();

  return <XYFlowBackground variant={backgroundVariant} />;
});

export default PlaygroundBackground;
