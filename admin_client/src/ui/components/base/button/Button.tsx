import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiLoadingButton, {
  type LoadingButtonProps as MuiLoadingButtonProps,
} from "@mui/lab/LoadingButton";

import { BaseColor, BaseSize } from "~/ui/_helpers";

export enum ButtonVariant {
  CONTAINED = "contained",
  OUTLINED = "outlined",
  TEXT = "text",
}

export type ButtonProps = PropsWithChildren<
  Omit<MuiLoadingButtonProps, "variant" | "size" | "color" | "loading"> & {
    variant?: ButtonVariant;
    size?: BaseSize;
    color?: BaseColor;
    isLoading?: boolean;
  }
>;

const Button: NamedExoticComponent<ButtonProps> = memo(
  ({
    variant = ButtonVariant.CONTAINED,
    size = BaseSize.MEDIUM,
    color = BaseColor.PRIMARY,
    disabled = false,
    isLoading = false,
    sx,
    ...props
  }) => {
    return (
      <MuiLoadingButton
        variant={variant}
        size={size}
        color={color}
        disabled={disabled}
        loading={isLoading}
        sx={{
          cursor: isLoading ? "wait !important" : disabled ? "not-allowed !important" : "pointer",
          pointerEvents: "auto !important",
          transition: "background-color 0s, background-image 0s",
          ...sx,
        }}
        {...props}
      />
    );
  },
);

export default Button;
