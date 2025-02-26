import type { NamedExoticComponent } from "react";
import { memo } from "react";

import MuiIconButton, {
  type IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";

import { BaseColor, BaseSize, getIconSize } from "~/ui/_helpers";
import { type ButtonProps } from "~/ui/components/base";
import { Icon, type IconProps } from "~/ui/components/customs/icons";

export type IconButtonProps = Omit<MuiIconButtonProps, "children" | "color" | "size"> &
  Pick<IconProps, "icon" | "color"> &
  Pick<ButtonProps, "size">;

const Button: NamedExoticComponent<IconButtonProps> = memo(
  ({ size = BaseSize.SMALL, color = BaseColor.PRIMARY, icon, sx, ...props }) => {
    return (
      <MuiIconButton
        size={size}
        color={color}
        sx={{
          overflow: "hidden",
          // p: size === BaseSize.SMALL ? 0.25 : 0.75,
          p: 0.75,
          ...sx,
        }}
        {...props}
      >
        <Icon icon={icon} color={color} width={getIconSize(size)} />
      </MuiIconButton>
    );
  },
);

export default Button;
