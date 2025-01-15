import type { FC } from "react";
import type { CustomNodeProps } from "~/common/types/dashboard-workflow";

import { memo } from "react";

import { CustomNodeTypeName } from "~/common/types/dashboard-workflow";
import { CustomNodeWrapper } from "~/sections/dashboard-workflow/custom-nodes/_CustomNodeWrapper";

const CustomMessageNode: FC<CustomNodeProps> = (nodeProps) => {
  // ----------------------------------------------------------------------------------------------------

  return (
    <CustomNodeWrapper
      {...nodeProps}
      type={CustomNodeTypeName.message}
      renderNodeFormComponent={() => <form>Message Node</form>}
    />
  );
};

export default memo(CustomMessageNode);
