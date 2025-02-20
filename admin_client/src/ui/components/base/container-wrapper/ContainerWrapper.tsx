import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiContainer, { type ContainerProps as MuiContainerProps } from "@mui/material/Container";

export enum ContainerMaxBreakpoint {
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
  FULL_WIDTH = "fullWidth",
}

export type ContainerWrapperProps = PropsWithChildren<
  Omit<MuiContainerProps, "disableGutters" | "maxWidth"> & {
    maxWidth?: ContainerMaxBreakpoint;
  }
>;

const ContainerWrapper: NamedExoticComponent<ContainerWrapperProps> = memo(
  ({ children, maxWidth = ContainerMaxBreakpoint.LG, ...props }) => {
    return (
      <MuiContainer
        disableGutters
        maxWidth={maxWidth === ContainerMaxBreakpoint.FULL_WIDTH ? false : maxWidth}
        {...props}
      >
        {children}
      </MuiContainer>
    );
  },
);

export default ContainerWrapper;
