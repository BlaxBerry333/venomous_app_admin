import type { NamedExoticComponent } from "react";
import { memo } from "react";

import MuiIconButton, {
  type IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";

import { ButtonColor, ButtonSize, type ButtonProps } from "~/ui/components/base/button/Button";
import { Icon, type IconProps } from "~/ui/components/customs/icons";

export type IconButtonProps = Omit<MuiIconButtonProps, "children" | "color" | "size"> &
  Pick<IconProps, "icon" | "color"> &
  Pick<ButtonProps, "size">;

const Button: NamedExoticComponent<IconButtonProps> = memo(
  ({ size = ButtonSize.MEDIUM, color = ButtonColor.PRIMARY, icon, sx, ...props }) => {
    return (
      <MuiIconButton
        size={size}
        color={color}
        sx={{
          overflow: "hidden",
          p: size === ButtonSize.SMALL ? 0.25 : 0.75,
          ...sx,
        }}
        {...props}
      >
        <Icon
          icon={icon}
          color={color}
          width={size === ButtonSize.SMALL ? 24 : size === ButtonSize.MEDIUM ? 24 : 40}
        />
      </MuiIconButton>
    );
  },
);

export default Button;
