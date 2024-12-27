import { lazy, Suspense } from "react";

import type { RouteObject } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

import { CustomLoadingScreen } from "~/common/components/custom/loadings";
import { AuthLayout } from "~/common/components/layouts";
import { ROUTE_PATHS, ROUTE_SEGMENTS } from "../path";

const AuthSignUpPage = lazy(() => import("~/pages/auth/signup/page"));
const AuthLoginPage = lazy(() => import("~/pages/auth/login/page"));

const AuthRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.auth.root,
    element: (
      <AuthLayout>
        <Suspense fallback={<CustomLoadingScreen />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    ),
    children: [
      {
        element: <Navigate to={ROUTE_PATHS.auth.login} replace />,
        index: true,
      },

      // signup page
      // ----------------------------------------------------------------------------------------------------
      {
        path: ROUTE_SEGMENTS.auth_signup,
        element: <AuthSignUpPage />,
      },

      // login page
      // ----------------------------------------------------------------------------------------------------
      {
        path: ROUTE_SEGMENTS.auth_login,
        element: <AuthLoginPage />,
      },

      // Fallback
      // ----------------------------------------------------------------------------------------------------
      {
        path: "*",
        element: <Navigate to={ROUTE_PATHS.error[404]} replace />,
      },
    ],
  },
];

export default AuthRoutes;
