import type { NamedExoticComponent } from "react";
import { memo, useMemo } from "react";

import { Icon, type IconProps } from "~/ui/components/customs";

export type CollapsableWrapperExpandIconProps = Omit<IconProps, "icon"> & {
  isExpanded: boolean;
  hidden?: boolean;
};

const CollapsableWrapperExpandIcon: NamedExoticComponent<CollapsableWrapperExpandIconProps> = memo(
  ({ isExpanded, hidden = false, sx, ...props }) => {
    const icon = useMemo<string>(() => {
      return isExpanded
        ? "solar:alt-arrow-right-bold-duotone"
        : "solar:alt-arrow-down-bold-duotone";
    }, [isExpanded]);

    return (
      <Icon
        icon={icon}
        sx={{
          cursor: "pointer",
          display: hidden ? "none" : "flex",
          ...sx,
        }}
        {...props}
      />
    );
  },
);

export default CollapsableWrapperExpandIcon;
