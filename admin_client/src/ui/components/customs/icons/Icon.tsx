import { forwardRef } from "react";

import type { IconProps as IconifyIconProps } from "@iconify/react";
import { Icon as Iconify, disableCache, enableCache } from "@iconify/react";

import MuiMuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";

import { BaseColor } from "~/ui/_helpers";

export type IconProps = MuiBoxProps &
  IconifyIconProps & {
    color?: BaseColor;
  };

const Icon = forwardRef<SVGElement, IconProps>(
  ({ width = 20, sx, color = BaseColor.INHERIT, ...props }, ref) => {
    return (
      <MuiMuiBox
        ssr
        ref={ref}
        component={Iconify}
        sx={{
          width,
          height: width,
          flexShrink: 0,
          display: "inline-flex",
          color: ({ palette }) => {
            return color === BaseColor.INHERIT ? "inherit" : palette[color]?.main;
          },
          ...sx,
        }}
        {...props}
      />
    );
  },
);

// https://iconify.design/docs/iconify-icon/disable-cache.html
disableCache("local");
enableCache("session");

export default Icon;
