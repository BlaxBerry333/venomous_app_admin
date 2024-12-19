import type { FC } from "react";
import type { CustomNodeProps } from "~/common/types/dashboard-workflow";

import { memo } from "react";

import { CustomNodeTypeName } from "~/common/types/dashboard-workflow";
import { CustomNodeWrapper } from "~/sections/dashboard-workflow/custom-nodes/_CustomNodeWrapper";

const CustomCodeNode: FC<CustomNodeProps> = (nodeProps) => {
  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomNodeWrapper
      {...nodeProps}
      type={CustomNodeTypeName.code}
      renderNodeFormComponent={() => <div style={{ height: "100vh" }}>Code</div>}
    />
  );
};

export default memo(CustomCodeNode);
