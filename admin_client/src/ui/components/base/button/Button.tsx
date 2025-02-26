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
