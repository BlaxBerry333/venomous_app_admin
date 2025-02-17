import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";

export enum ButtonVariant {
  CONTAINED = "contained",
  OUTLINED = "outlined",
  TEXT = "text",
}

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum ButtonColor {
  INHERIT = "inherit",
  PRIMARY = "primary",
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

export type ButtonProps = PropsWithChildren<
  Omit<MuiButtonProps, "variant" | "size" | "color"> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    color?: ButtonColor;
  }
>;

const Button: NamedExoticComponent<ButtonProps> = memo(
  ({
    variant = ButtonVariant.CONTAINED,
    size = ButtonSize.MEDIUM,
    color = ButtonColor.PRIMARY,
    sx,
    ...props
  }) => {
    return (
      <MuiButton
        variant={variant}
        size={size}
        color={color}
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          minWidth: "unset",
          borderRadius: "8px",
          ...sx,
        }}
        {...props}
      />
    );
  },
);

export default Button;
