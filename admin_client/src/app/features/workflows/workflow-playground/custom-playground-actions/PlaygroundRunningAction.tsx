import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Button, Icon } from "~/ui/components";

const PlaygroundRunningAction: NamedExoticComponent = memo(() => {
  return (
    <Button startIcon={<Icon icon="solar:play-line-duotone" sx={{ color: "#FFFFFF" }} />}>
      执行
    </Button>
  );
});

export default PlaygroundRunningAction;
