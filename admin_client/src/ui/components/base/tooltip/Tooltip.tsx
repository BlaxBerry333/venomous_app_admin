import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiTooltip, { type TooltipProps as MuiTooltipProps } from "@mui/material/Tooltip";

import { BaseColor } from "~/ui/_helpers";
import { Icon } from "~/ui/components/customs";
import { Typography } from "../typography";

export type TooltipProps = PropsWithChildren<MuiTooltipProps>;

const Tooltip: NamedExoticComponent<TooltipProps> = memo(({ children, title, ...props }) => {
  return (
    <MuiTooltip arrow title={<Typography variant="caption">{title}</Typography>} {...props}>
      {children ? (
        <div>{children}</div>
      ) : (
        <Icon
          icon="solar:info-circle-bold-duotone"
          color={BaseColor.PRIMARY}
          sx={{ cursor: "pointer", mx: 0.5 }}
        />
      )}
    </MuiTooltip>
  );
});

export default Tooltip;
