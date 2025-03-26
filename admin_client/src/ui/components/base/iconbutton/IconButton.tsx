import type { NamedExoticComponent } from "react";
import { memo, useMemo } from "react";

import MuiIconButton, {
  type IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";

import { BaseColor, BaseSize, getIconSize } from "~/ui/_helpers";
import { Button, Tooltip, type ButtonProps, type TooltipProps } from "~/ui/components/base";
import { Icon, type IconProps } from "~/ui/components/customs/icons";

export type IconButtonProps = Omit<MuiIconButtonProps, "children" | "color" | "size"> &
  Pick<IconProps, "icon" | "color"> &
  Pick<ButtonProps, "size"> & {
    tooltip?: TooltipProps["title"];
    tooltipPlacement?: TooltipProps["placement"];
    isCircle?: boolean;
  };

const IconButton: NamedExoticComponent<IconButtonProps> = memo(
  ({
    size = BaseSize.SMALL,
    color = BaseColor.PRIMARY,
    icon,
    sx,
    disabled,
    tooltip,
    tooltipPlacement = "top",
    isCircle = true,
    ...props
  }) => {
    const iconElement = useMemo<JSX.Element>(() => {
      return <Icon icon={icon} color={color} width={getIconSize(size)} />;
    }, [icon, color, size]);

    const circleButtonElement = useMemo<JSX.Element>(() => {
      return (
        <MuiIconButton
          size={size}
          color={color}
          disabled={disabled}
          sx={{
            overflow: "hidden",
            // p: size === BaseSize.SMALL ? 0.25 : 0.75,
            p: 0.75,
            transition: "background-color 0s, background-image 0s",
            ...sx,
          }}
          {...props}
        >
          {iconElement}
        </MuiIconButton>
      );
    }, [iconElement, size, color, sx, disabled, props]);

    const squareButtonElement = useMemo<JSX.Element>(() => {
      return (
        <Button
          size={size}
          disableElevation
          disabled={disabled}
          sx={{
            border: 1,
            borderColor: "divider",
            backgroundColor: ({ palette }) => palette.background.paper,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.119), rgba(255, 255, 255, 0.119));",
            p: 1,
            opacity: disabled ? 0.25 : 1,
            ...sx,
          }}
          {...props}
        >
          {iconElement}
        </Button>
      );
    }, [iconElement, size, sx, disabled, props]);

    return (
      <>
        {tooltip ? (
          <Tooltip title={tooltip} placement={tooltipPlacement}>
            <div>{isCircle ? circleButtonElement : squareButtonElement}</div>
          </Tooltip>
        ) : (
          <>{isCircle ? circleButtonElement : squareButtonElement}</>
        )}
      </>
    );
  },
);

export default IconButton;
