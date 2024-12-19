import type { ReactNode } from "react";
import { useMemo } from "react";

import { Icon } from "@iconify/react";

import { ROUTE_PATHS } from "~/router";

export type BaseNavMenuItemType = {
  name: string;
  icon?: ReactNode;
  path?: string;
  isDraft?: boolean;
};

export type NavMenuItemType = BaseNavMenuItemType & {
  subitems?: Array<BaseNavMenuItemType>;
};

export default function useCustomLayoutNavigation() {
  const OverviewNavigationList = useMemo<Array<NavMenuItemType>>(
    () => [
      {
        icon: <Icon icon="solar:users-group-two-rounded-bold-duotone" />,
        name: "Account",
        path: ROUTE_PATHS.dashboard.accounts.list,
      },
      {
        icon: <Icon icon="solar:routing-3-bold-duotone" />,
        name: "Workflow",
        path: ROUTE_PATHS.dashboard.workflow.playground,
      },
      {
        icon: <Icon icon="solar:pie-chart-2-bold-duotone" />,
        name: "Report",
        path: ROUTE_PATHS.dashboard.report.list,
      },
    ],
    [],
  );

  const managementNavigationList = useMemo<Array<NavMenuItemType>>(
    () => [
      {
        icon: <Icon icon="solar:chat-round-line-bold-duotone" />,
        name: "Chat",
        subitems: [
          {
            name: "TODO....",
            path: ROUTE_PATHS.error.unknown,
            isDraft: true,
          },
        ],
      },
      {
        icon: <Icon icon="solar:notes-bold-duotone" />,
        name: "Notes",
        subitems: [
          {
            name: "TODO....",
            path: ROUTE_PATHS.error.unknown,
            isDraft: true,
          },
        ],
      },
      {
        icon: <Icon icon="solar:shield-user-bold-duotone" />,
        name: "Security",
        subitems: [
          {
            name: "TODO...",
            path: "",
            isDraft: true,
          },
          {
            name: "TODO....",
            path: ROUTE_PATHS.error.unknown,
          },
        ],
      },
    ],
    [],
  );

  return {
    OverviewNavigationList,
    managementNavigationList,
  };
}
