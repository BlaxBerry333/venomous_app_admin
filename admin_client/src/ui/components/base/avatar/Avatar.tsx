import type { NamedExoticComponent } from "react";
import { memo, useMemo } from "react";

import MuiAvatar, { type AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";

import { BaseColor, BaseSize, getIconSize } from "~/ui/_helpers";
import { Badge, BadgePosition, type BadgeProps } from "../badge";

export type AvatarProps = Omit<MuiAvatarProps, "size"> & {
  showBadge?: BadgeProps["showBadge"];
  badgeColor?: BadgeProps["color"];
  badgePosition?: BadgeProps["position"];
  size?: BaseSize;
};

const Avatar: NamedExoticComponent<AvatarProps> = memo(
  ({
    showBadge = false,
    badgeColor = BaseColor.PRIMARY,
    badgePosition = BadgePosition.TOP_RIGHT,
    size = BaseSize.MEDIUM,
    ...props
  }) => {
    const avatarSize = useMemo(() => getIconSize(size), [size]);

    return (
      <Badge color={badgeColor} showBadge={showBadge} position={badgePosition}>
        <MuiAvatar
          sx={{
            width: avatarSize,
            height: avatarSize,
          }}
          {...props}
        />
      </Badge>
    );
  },
);

export default Avatar;
