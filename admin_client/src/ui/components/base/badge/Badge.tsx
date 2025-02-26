import type { CSSProperties, NamedExoticComponent, PropsWithChildren } from "react";
import { memo, useMemo } from "react";

import MuiBadge, { type BadgeProps as MuiBadgeProps } from "@mui/material/Badge";
import { BaseColor } from "~/ui/_helpers";

export enum BadgePosition {
  TOP_RIGHT = "top-right",
  TOP_LEFT = "top-left",
  BOTTOM_RIGHT = "bottom-right",
  BOTTOM_LEFT = "bottom-left",
}

export type BadgeProps = PropsWithChildren<
  Omit<MuiBadgeProps, "invisible" | "sx" | "color" | "anchorOrigin"> & {
    showBadge?: boolean;
    contentSx?: MuiBadgeProps["sx"];
    badgeSx?: CSSProperties;
    color?: BaseColor;
    position?: BadgePosition;
  }
>;

const Badge: NamedExoticComponent<BadgeProps> = memo(
  ({
    children,
    showBadge = true,
    badgeSx,
    contentSx,
    color = BaseColor.ERROR,
    position = BadgePosition.TOP_RIGHT,
    ...props
  }) => {
    const badgePlacementAttributes = useMemo<
      MuiBadgeProps["anchorOrigin"] & { transform: string }
    >(() => {
      switch (position) {
        case BadgePosition.TOP_LEFT:
          return { vertical: "top", horizontal: "left", transform: "translate(-2px, -2px)" };
        case BadgePosition.BOTTOM_LEFT:
          return { vertical: "bottom", horizontal: "left", transform: "translate(-2px, 2px)" };
        case BadgePosition.BOTTOM_RIGHT:
          return { vertical: "bottom", horizontal: "right", transform: "translate(2px, 2px)" };
        case BadgePosition.TOP_RIGHT:
        default:
          return { vertical: "top", horizontal: "right", transform: "translate(2px, -2px)" };
      }
    }, [position]);

    return (
      <MuiBadge
        variant="dot"
        invisible={!showBadge}
        anchorOrigin={{
          vertical: badgePlacementAttributes.vertical,
          horizontal: badgePlacementAttributes.horizontal,
        }}
        sx={{
          ".MuiBadge-badge": {
            ...(showBadge
              ? {
                  transform: badgePlacementAttributes.transform,
                  color: ({ palette }) =>
                    color === BaseColor.INHERIT ? palette.text.primary : palette[color].light,
                  backgroundColor: ({ palette }) =>
                    color === BaseColor.INHERIT ? palette.text.primary : palette[color].light,
                  boxShadow: "0 0 0 2px transparent",
                  "&::after": {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    animation: "ripple 1.2s infinite ease-in-out",
                    border: "2px solid currentColor",
                    content: '""',
                  },
                  "@keyframes ripple": {
                    "0%": { transform: "scale(.8)", opacity: 1 },
                    "100%": { transform: "scale(2.4)", opacity: 0 },
                  },
                }
              : {}),
            ...badgeSx,
          },
          ...contentSx,
        }}
        {...props}
      >
        {children}
      </MuiBadge>
    );
  },
);

export default Badge;
