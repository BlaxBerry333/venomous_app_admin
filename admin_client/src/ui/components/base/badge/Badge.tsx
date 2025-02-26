import type { CSSProperties, NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiBadge, { type BadgeProps as MuiBadgeProps } from "@mui/material/Badge";

type TypographyProps = PropsWithChildren<
  Omit<MuiBadgeProps, "invisible" | "sx"> & {
    showBadge?: boolean;
    contentSx?: MuiBadgeProps["sx"];
    badgeSx?: CSSProperties;
  }
>;

const Badge: NamedExoticComponent<TypographyProps> = memo(
  ({ children, showBadge = true, ...props }) => {
    return (
      <MuiBadge
        color="error"
        variant="dot"
        invisible={!showBadge}
        sx={{
          ".MuiBadge-badge": {
            top: -2,
            right: -2,
            animation: "scale 3s linear infinite",
            "@keyframes scale": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.2)" },
              "100%": { transform: "scale(1)" },
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "1px solid currentColor",
            },
            ...props.badgeSx,
          },
          ...props.contentSx,
        }}
        {...props}
      >
        {children}
      </MuiBadge>
    );
  },
);

export default Badge;
