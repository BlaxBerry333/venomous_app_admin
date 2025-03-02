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
          transition: "color 0.2s ease-in-out",
          color: ({ palette }) => {
            return color === BaseColor.INHERIT
              ? palette.mode === "dark"
                ? "grey.500"
                : "grey.600"
              : palette[color]?.light;
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
