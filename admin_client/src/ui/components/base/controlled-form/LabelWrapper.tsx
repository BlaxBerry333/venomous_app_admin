import type { NamedExoticComponent } from "react";
import { memo, useId } from "react";

import MuiStack, { type StackProps as MuiStackProps } from "@mui/material/Stack";

import Label from "./Label";

export type LabelWrapperProps = {
  wrapperDirection?: MuiStackProps["direction"];
  startLabel?: string;
  endLabel?: string;
  renderElement?: (id: string) => React.ReactNode;
  sx?: MuiStackProps["sx"];
};

const LabelWrapper: NamedExoticComponent<LabelWrapperProps> = memo(
  ({ wrapperDirection = "row", startLabel, endLabel, renderElement, sx }) => {
    const id = useId();

    return (
      <MuiStack direction={wrapperDirection} alignItems="center" spacing={0} sx={sx}>
        {/* Start Label */}
        {startLabel && <Label label={startLabel} elementId={id} />}

        {/* Element */}
        {renderElement?.(id)}

        {/* End Label */}
        {endLabel && <Label label={endLabel} elementId={id} />}
      </MuiStack>
    );
  },
);

export default LabelWrapper;
