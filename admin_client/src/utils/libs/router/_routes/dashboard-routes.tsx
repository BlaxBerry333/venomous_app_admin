import { Suspense } from "react";
import { Navigate, Outlet, type RouteObject } from "react-router-dom";

import { FullPageLoading } from "~/ui/components";
import { DashboardLayout } from "~/ui/templates";
import { autoImportedLazyRoutes, type AutoImportedRoutesModulesType } from "../_helpers";

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
    DETAIL: "detail",
    CREATE: "create",
  },
  SEGMENT: {
    ANALYSIS: "analysis",
    WORKFLOW: "workflow",
  },
} as const;

export const DashboardRoutes: RouteObject[] = [
  {
    path: `/${DASHBOARD_ROUTE_PATH.BASE}`,
    element: (
      <DashboardLayout>
        <Suspense fallback={<FullPageLoading />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={DASHBOARD_ROUTE_PATH.ROOT} replace />,
      },

      ...DASHBOARD_ROUTES_AUTO_IMPORTED,

      {
        path: "*",
        element: <Navigate to={DASHBOARD_ROUTE_PATH.ROOT} replace />,
      },
    ],
  },
];
