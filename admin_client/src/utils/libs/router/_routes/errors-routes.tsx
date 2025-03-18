import { Suspense } from "react";
import { Navigate, Outlet, type RouteObject } from "react-router-dom";

import { FullPageLoading } from "~/ui/components";
import { autoImportedLazyRoutes, type AutoImportedRoutesModulesType } from "../_helpers";

const ERRORS_ROUTES_AUTO_IMPORTED: RouteObject[] = autoImportedLazyRoutes(
  import.meta.glob("~/app/pages/errors/**/page.tsx", {
    eager: false,
  }) as AutoImportedRoutesModulesType,
);

const ERRORS_ROUTE_PATH = {
  BASE: "errors",
  ROOT: "404",
  SEGMENT: {
    403: "403",
    404: "404",
    500: "500",
  },
} as const;

export const ERRORS_PATHS = {
  403: `/${ERRORS_ROUTE_PATH.BASE}/${ERRORS_ROUTE_PATH.SEGMENT[403]}`,
  404: `/${ERRORS_ROUTE_PATH.BASE}/${ERRORS_ROUTE_PATH.SEGMENT[404]}`,
  500: `/${ERRORS_ROUTE_PATH.BASE}/${ERRORS_ROUTE_PATH.SEGMENT[500]}`,
} as const;

export const ErrorsRoutes: RouteObject[] = [
  {
    path: `/${ERRORS_ROUTE_PATH.BASE}`,
    element: (
      <Suspense fallback={<FullPageLoading />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={ERRORS_ROUTE_PATH.SEGMENT[404]} replace />,
      },

      ...ERRORS_ROUTES_AUTO_IMPORTED,
    ],
  },
];
