import type { FC } from "react";
import { memo, useMemo } from "react";

import {
  CustomCollapsibleList,
  CustomCollapsibleListItem,
  CustomNormalListItem,
} from "~/common/components/custom/list";
import { CustomRouterLink } from "~/common/components/custom/router-link";
import type { NavMenuItemType } from "~/common/hooks/use-dashboard/useCustomLayoutNavigation";
import useCustomLayoutNavigation from "~/common/hooks/use-dashboard/useCustomLayoutNavigation";
import useIsRouteMatched from "~/common/hooks/useIsRouteMatched";

const DashboardLayoutNavMenu: FC = () => {
  const { OverviewNavigationList, managementNavigationList } = useCustomLayoutNavigation();

  return (
    <>
      <CustomCollapsibleList expandedTitle={"Overview"}>
        {OverviewNavigationList.map((item) => (
          <DashboardLayoutNavMenuItem key={item.name} {...item} />
        ))}
      </CustomCollapsibleList>

      <CustomCollapsibleList expandedTitle={"Management"}>
        {managementNavigationList.map((item) => (
          <CustomCollapsibleListItem
            key={item.name}
            icon={item.icon}
            MuiListItemTextProps={{ primary: item.name }}
            defaultIsExpanded={false}
          >
            {item.subitems?.map((subItem) => (
              <DashboardLayoutNavMenuItem key={subItem.name} {...subItem} />
            ))}
          </CustomCollapsibleListItem>
        ))}
      </CustomCollapsibleList>
    </>
  );
};

const DashboardLayoutNavMenuItem = memo<NavMenuItemType>(({ name, icon, path = "", isDraft }) => {
  const isActive = useIsRouteMatched(path);

  const itemContent = useMemo(
    () => (
      <CustomNormalListItem
        key={name}
        icon={icon}
        MuiListItemButtonProps={{ selected: isActive, disabled: isDraft }}
        MuiListItemTextProps={{ primary: name }}
      />
    ),
    [name, icon, isActive, isDraft],
  );

  if (isDraft) {
    return itemContent;
  }

  return (
    <CustomRouterLink to={path} underline="none" color="inherit">
      {itemContent}
    </CustomRouterLink>
  );
});

export default memo(DashboardLayoutNavMenu);
