import type { CSSProperties, NamedExoticComponent } from "react";
import { memo, useCallback, useMemo } from "react";

import MuiBox from "@mui/material/Box";

import {
  CollapsableWrapper,
  ListItem,
  ListItemInsideOfNest,
  ListItemWithIconPopper,
  ListItemWithNest,
  Menu,
  PopperPlacement,
  Typography,
  type ListItemProps,
} from "~/ui/components";
import { DASHBOARD_PATHS, useRouteIsMatched, useRouteNavigate } from "~/utils/libs/router";

type DashboardNavMenuItem = ListItemProps & { path?: string };

const DashboardLayoutNavMenuItem: NamedExoticComponent<
  DashboardNavMenuItem & { isInsideOfNested?: boolean }
> = memo(({ path = "", isInsideOfNested = false, selected = false, ...props }) => {
  const isRouteMatched: boolean = useRouteIsMatched(path);
  const isActive: boolean = isRouteMatched || selected;

  // 嵌套的子元素
  if (isInsideOfNested) {
    return (
      <ListItemInsideOfNest
        sx={{ bgcolor: isActive ? "action.selected" : "transparent" }}
        {...props}
      />
    );
  }

  // 普通的子元素
  return <ListItem {...props} selected={isActive} />;
});

/**
 * 菜单子元素可折叠
 */
const ParentCollapsableNavMenu: NamedExoticComponent = memo(() => {
  const { foundationGroup, managementGroup } = useDashboardNavMenuItems();

  const renderCollapsableWrapper = useCallback((navItemsGroup: DashboardNavMenuItemsGroup) => {
    return (
      <CollapsableWrapper
        defaultExpanded
        reverseDefaultExpandIcon
        triggerSx={{
          my: 1,
          fontWeight: "bold",
          color: ({ palette: { mode } }) => (mode === "dark" ? "grey.600" : "grey.400"),
        }}
        renderCollapsedTrigger={(params) => (
          <Typography variant="subtitle2" fontWeight="bold" onClick={params.toggleExpanded}>
            {navItemsGroup.title}
          </Typography>
        )}
        renderCollapsedContent={() => (
          <Menu sx={{ mb: 4 }}>
            {navItemsGroup.list.map(({ nestList, ...item }) => {
              const isSelected: boolean = nestList
                ? nestList.some((subItem) => window.location.pathname.endsWith(subItem.path ?? ""))
                : window.location.pathname.endsWith(item.path ?? "");

              if (!nestList) return <DashboardLayoutNavMenuItem key={item.title} {...item} />;
              return (
                <ListItemWithNest
                  defaultExpanded={isSelected}
                  key={item.title}
                  selected={isSelected}
                  triggerSx={{ mb: 0.5 }}
                  nestList={nestList}
                  nestListSx={{ overflow: "hidden", pl: 5.5, mb: 0.5 }}
                  renderListItem={(_item) => (
                    <DashboardLayoutNavMenuItem key={_item.title} {..._item} isInsideOfNested />
                  )}
                  {...item}
                />
              );
            })}
          </Menu>
        )}
      />
    );
  }, []);

  return (
    <>
      {renderCollapsableWrapper(foundationGroup)}
      {renderCollapsableWrapper(managementGroup)}
    </>
  );
});

/**
 * 菜单子元素仅显示图标
 */
const ParentIconOnlyNavMenu: NamedExoticComponent<{
  isVertical?: boolean;
  showChildItemTitleUnderIcon?: boolean;
}> = memo(({ isVertical = true, showChildItemTitleUnderIcon = true }) => {
  const { foundationGroup, managementGroup } = useDashboardNavMenuItems();

  const popperPlacement = useMemo<PopperPlacement>(() => {
    if (isVertical) return PopperPlacement.right;
    return PopperPlacement.bottom;
  }, [isVertical]);

  const popperStyle = useMemo<CSSProperties>(() => {
    if (isVertical) return { marginLeft: "16px !important" };
    return { marginTop: "4px !important" };
  }, [isVertical]);

  return (
    <Menu>
      {[...foundationGroup.list, ...managementGroup.list].map((item) => {
        const { nestList, ...itemWithoutNestList } = item;
        const isSelected: boolean = nestList
          ? nestList.some((subItem) => window.location.pathname.endsWith(subItem.path ?? ""))
          : window.location.pathname.endsWith(item.path ?? "");
        return (
          <MuiBox
            key={item.title}
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", mx: "1px" }}
          >
            {/* Parent Icon */}
            <MuiBox sx={{ position: "relative", width: "50px", mb: isVertical ? 3 : 0 }}>
              <ListItemWithIconPopper
                {...item}
                popperPlacement={popperPlacement}
                popperContentSx={popperStyle}
                renderTrigger={(params) => (
                  <>
                    <DashboardLayoutNavMenuItem
                      {...itemWithoutNestList}
                      selected={isSelected}
                      onClick={(e) => {
                        if (item.path) item.onClick?.(e);
                        params.handleOpen(e);
                      }}
                      sx={{
                        "& .MuiListItemIcon-root": {
                          margin: 0,
                          transform: "translate(-2px, 0)",
                        },
                        ...item.sx,
                      }}
                    />
                    {/* Parent Title */}
                    {showChildItemTitleUnderIcon && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: "bold",
                          fontSize: 10,
                          position: "absolute",
                          bottom: -12,
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        {item.title}
                      </Typography>
                    )}
                  </>
                )}
                renderNestListItem={(_item) => (
                  <DashboardLayoutNavMenuItem key={_item.title} {..._item} />
                )}
              />
            </MuiBox>
          </MuiBox>
        );
      })}
    </Menu>
  );
});

export default {
  ParentCollapsable: ParentCollapsableNavMenu,
  ParentIconOnly: ParentIconOnlyNavMenu,
};

// ----------------------------------------------------------------------------------------------------

type DashboardNavMenuItemsGroup = {
  title: string;
  list: Array<DashboardNavMenuItem & { nestList?: Array<DashboardNavMenuItem> }>;
};

function useDashboardNavMenuItems() {
  const foundationGroup = useMemo<DashboardNavMenuItemsGroup>(() => {
    return {
      title: "Foundation",
      list: [
        {
          title: "Analysis",
          icon: "solar:pie-chart-2-bold-duotone",
          path: DASHBOARD_PATHS.analysis,
        },
        {
          title: "Workflows",
          icon: "solar:routing-3-bold-duotone",
          nestList: [
            {
              title: "List",
              icon: "solar:list-bold-duotone",
              path: DASHBOARD_PATHS.workflows.list,
            },
            {
              title: "Create",
              icon: "solar:add-circle-line-duotone",
              path: DASHBOARD_PATHS.workflows.create,
            },
          ],
        },
        // {
        //   title: "Chat",
        //   icon: "solar:chat-line-bold-duotone",
        //   subtitle: "Developing...",
        //   nestList: [
        //     {
        //       title: "List",
        //       icon: "solar:list-bold-duotone",
        //       path: "/dashboard/chat/list",
        //     },
        //     {
        //       title: "Create",
        //       icon: "solar:add-circle-line-duotone",
        //       path: "/dashboard/chat/create",
        //     },
        //   ],
        // },
      ],
    };
  }, []);

  const managementGroup = useMemo<DashboardNavMenuItemsGroup>(() => {
    return {
      title: "Management",
      list: [
        // {
        //   title: "Users",
        //   icon: "solar:users-group-rounded-bold-duotone",
        //   path: "/dashboard/management/users",
        // },
        {
          title: "API",
          icon: "solar:ufo-2-bold-duotone",
          path: "/dashboard/management/users",
        },
        {
          title: "Files",
          icon: "solar:folder-with-files-bold-duotone",
          path: "/dashboard/management/users",
        },
        // {
        //   title: "404",
        //   icon: "solar:box-minimalistic-bold-duotone",
        //   path: "/errors/404",
        // },
      ],
    };
  }, []);

  // ----------------------------------------------------------------------------------------------------

  const { push } = useRouteNavigate();

  const formatNavItems = useCallback(
    (navItemsGroup: DashboardNavMenuItemsGroup) => {
      return {
        ...navItemsGroup,
        list: navItemsGroup.list.map(({ path, ...item }) => ({
          ...item,
          path,
          onClick: !item.nestList?.length && path ? () => push(path || "") : item.onClick,
          nestList: item.nestList?.map(({ path, ...nestItem }) => ({
            ...nestItem,
            path,
            onClick: path ? () => push(path || "") : nestItem.onClick,
          })),
        })),
      };
    },
    [push],
  );

  // ----------------------------------------------------------------------------------------------------

  return useMemo(() => {
    return {
      foundationGroup: formatNavItems(foundationGroup),
      managementGroup: formatNavItems(managementGroup),
    };
  }, [foundationGroup, managementGroup, formatNavItems]);
}
