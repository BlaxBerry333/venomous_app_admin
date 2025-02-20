import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiLoadingButton, {
  type LoadingButtonProps as MuiLoadingButtonProps,
} from "@mui/lab/LoadingButton";

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
  Omit<MuiLoadingButtonProps, "variant" | "size" | "color" | "loading"> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    color?: ButtonColor;
    isLoading?: boolean;
  }
>;

const Button: NamedExoticComponent<ButtonProps> = memo(
  ({
    variant = ButtonVariant.CONTAINED,
    size = ButtonSize.MEDIUM,
    color = ButtonColor.PRIMARY,
    isLoading = false,

    ...props
  }) => {
    return (
      <MuiLoadingButton
        variant={variant}
        size={size}
        color={color}
        loading={isLoading}
        {...props}
      />
    );
  },
);

export default Button;
