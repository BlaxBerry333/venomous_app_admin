import type { ReactNode } from "react";
import { useMemo } from "react";

import { Icon } from "@iconify/react";

import { ROUTE_PATHS } from "~/common/router";
import useTranslation from "../useTranslation";

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
  const { t } = useTranslation();

  const OverviewNavigationList = useMemo<Array<NavMenuItemType>>(
    () => [
      {
        icon: <Icon icon="solar:pie-chart-2-bold-duotone" />,
        name: t("dashboard.nav-menu.reports"),
        path: ROUTE_PATHS.dashboard.report.list,
      },
      {
        icon: <Icon icon="solar:routing-3-bold-duotone" />,
        name: t("dashboard.nav-menu.workflows"),
        path: ROUTE_PATHS.dashboard.workflow.list,
      },
      {
        icon: <Icon icon="solar:notes-bold-duotone" />,
        name: t("dashboard.nav-menu.notes"),
        path: ROUTE_PATHS.dashboard.note.list,
      },
      {
        icon: <Icon icon="solar:chat-round-line-bold-duotone" />,
        name: t("dashboard.nav-menu.chats"),
        path: ROUTE_PATHS.error.unknown,
      },
    ],
    [t],
  );

  const managementNavigationList = useMemo<Array<NavMenuItemType>>(
    () => [
      {
        icon: <Icon icon="solar:users-group-two-rounded-bold-duotone" />,
        name: t("dashboard.nav-menu.accounts"),
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
      {
        icon: <Icon icon="solar:shield-user-bold-duotone" />,
        name: t("dashboard.nav-menu.security"),
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
    [t],
  );

  return {
    OverviewNavigationList,
    managementNavigationList,
  };
}
