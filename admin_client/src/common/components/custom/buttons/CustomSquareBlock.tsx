import type { FC } from "react";
import { memo } from "react";

import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import MuiButton from "@mui/material/Button";
import type { TooltipProps as MuiTooltipProps } from "@mui/material/Tooltip";
import MuiTooltip from "@mui/material/Tooltip";

const CustomSquareBlock: FC<
  MuiButtonProps & {
    tooltip?: MuiTooltipProps["title"];
    tooltipPlacement?: MuiTooltipProps["placement"];
  }
> = ({ tooltip, tooltipPlacement, ...props }) => {
  return (
    <MuiTooltip title={tooltip} placement={tooltipPlacement} arrow>
      <span>
        <MuiButton
          color="inherit"
          sx={{
            minHeight: 32,
            minWidth: 32,
            padding: "6px",
            borderRadius: "8px",
            ...props.sx,
          }}
          {...props}
        />
      </span>
    </MuiTooltip>
  );
};

export default memo(CustomSquareBlock);
