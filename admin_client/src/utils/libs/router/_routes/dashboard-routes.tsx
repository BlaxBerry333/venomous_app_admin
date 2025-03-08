import { lazy, Suspense } from "react";
import { Navigate, Outlet, type RouteObject } from "react-router-dom";

import { DashboardLayoutAccount } from "~/app/features/auth/_components";
import { AuthGuard } from "~/app/features/dashboard/_providers";
import { FullPageLoading } from "~/ui/components";
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
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<FullPageLoading />}>
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
