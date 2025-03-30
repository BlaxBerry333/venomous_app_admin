import { lazy, Suspense } from "react";
import { Navigate, Outlet, type RouteObject } from "react-router-dom";

import { DashboardLayoutAccount } from "~/app/features/auth/_portals";
import { AuthGuard } from "~/app/features/auth/_providers";
import { FullPageLoading } from "~/ui/components";
import { LanguageSwitcher } from "~/utils/libs/i18n";
import { autoImportedLazyRoutes, type AutoImportedRoutesModulesType } from "../_helpers";

const DashboardLayout = lazy(() =>
  import("~/ui/templates").then((m) => ({ default: m.DashboardLayout })),
);

const DASHBOARD_ROUTES_AUTO_IMPORTED: RouteObject[] = autoImportedLazyRoutes(
  import.meta.glob("~/app/pages/dashboard/**/page.tsx", {
    eager: false,
  }) as AutoImportedRoutesModulesType,
);

const DASHBOARD_ROUTE_PATH = {
  BASE: "dashboard",
  ROOT: "analysis",
  LEAF: {
    LIST: "list",
    CREATE: "create",
    DETAIL: "detail",
    PLAYGROUND: "playground",
  },
  SEGMENT: {
    ANALYSIS: "analysis",
    WORKFLOWS: "workflows",
  },
} as const;

export const DASHBOARD_PATHS = {
  analysis: `/${DASHBOARD_ROUTE_PATH.BASE}/${DASHBOARD_ROUTE_PATH.ROOT}`,
  workflows: {
    list: `/${DASHBOARD_ROUTE_PATH.BASE}/${DASHBOARD_ROUTE_PATH.SEGMENT.WORKFLOWS}/${DASHBOARD_ROUTE_PATH.LEAF.LIST}`,
    create: `/${DASHBOARD_ROUTE_PATH.BASE}/${DASHBOARD_ROUTE_PATH.SEGMENT.WORKFLOWS}/${DASHBOARD_ROUTE_PATH.LEAF.CREATE}`,
    detail: `/${DASHBOARD_ROUTE_PATH.BASE}/${DASHBOARD_ROUTE_PATH.SEGMENT.WORKFLOWS}/${DASHBOARD_ROUTE_PATH.LEAF.DETAIL}`, // ?id=<id>
    playground: `/${DASHBOARD_ROUTE_PATH.BASE}/${DASHBOARD_ROUTE_PATH.SEGMENT.WORKFLOWS}/${DASHBOARD_ROUTE_PATH.LEAF.PLAYGROUND}`, // ?id=<id>
  },
} as const;

export const DashboardRoutes: RouteObject[] = [
  {
    path: `/${DASHBOARD_ROUTE_PATH.BASE}`,
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<FullPageLoading />}>
            <LanguageSwitcher />
            <DashboardLayoutAccount />
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={DASHBOARD_ROUTE_PATH.ROOT} replace />,
        loader: () => {
          console.log("loader");
          return null;
        },
      },

      ...DASHBOARD_ROUTES_AUTO_IMPORTED,

      {
        path: "*",
        element: <Navigate to={DASHBOARD_ROUTE_PATH.ROOT} replace />,
      },
    ],
  },
];
