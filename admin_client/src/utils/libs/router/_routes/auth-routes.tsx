import { lazy, Suspense } from "react";
import { Navigate, Outlet, type RouteObject } from "react-router-dom";

import { FullPageLoading } from "~/ui/components";
import { autoImportedLazyRoutes, type AutoImportedRoutesModulesType } from "../_helpers";

const AuthLayout = lazy(() => import("~/ui/templates").then((m) => ({ default: m.AuthLayout })));

const AUTH_ROUTES_AUTO_IMPORTED: RouteObject[] = autoImportedLazyRoutes(
  import.meta.glob("~/app/pages/auth/**/page.tsx", {
    eager: false,
  }) as AutoImportedRoutesModulesType,
);

const AUTH_ROUTE_PATH = {
  BASE: "auth",
  ROOT: "login",
  SEGMENT: {
    LOGIN: "login",
    SIGNUP: "signup",
    VERIFY_EMAIL: "verify-email",
    RESET_PASSWORD: "reset-password",
  },
} as const;

export const AUTH_PATHS = {
  login: `/${AUTH_ROUTE_PATH.BASE}/${AUTH_ROUTE_PATH.SEGMENT.LOGIN}`,
  signup: `/${AUTH_ROUTE_PATH.BASE}/${AUTH_ROUTE_PATH.SEGMENT.SIGNUP}`,
  verifyEmail: `/${AUTH_ROUTE_PATH.BASE}/${AUTH_ROUTE_PATH.SEGMENT.VERIFY_EMAIL}`,
  resetPassword: `/${AUTH_ROUTE_PATH.BASE}/${AUTH_ROUTE_PATH.SEGMENT.RESET_PASSWORD}`,
} as const;

export const AuthRoutes: RouteObject[] = [
  {
    path: `/${AUTH_ROUTE_PATH.BASE}`,
    element: (
      <AuthLayout>
        <Suspense fallback={<FullPageLoading />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={AUTH_ROUTE_PATH.SEGMENT.LOGIN} replace />,
      },

      ...AUTH_ROUTES_AUTO_IMPORTED,

      {
        path: "*",
        element: <Navigate to={AUTH_ROUTE_PATH.SEGMENT.LOGIN} replace />,
      },
    ],
  },
];
