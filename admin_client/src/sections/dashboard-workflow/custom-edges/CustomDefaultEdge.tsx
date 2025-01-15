import type { FC } from "react";
import type { CustomEdgeProps } from "~/common/types/dashboard-workflow";

import { memo } from "react";

import { CustomEdgeWrapper } from "./_CustomEdgeWrapper";

const CustomDefaultEdge: FC<CustomEdgeProps> = (props) => {
  const edgeProps: CustomEdgeProps = {
    ...props,
    data: {
      ...props.data,
      animationDuration: 2,
    },
  };

  // ----------------------------------------------------------------------------------------------------

  return <CustomEdgeWrapper {...edgeProps} />;
};

export default memo(CustomDefaultEdge);
