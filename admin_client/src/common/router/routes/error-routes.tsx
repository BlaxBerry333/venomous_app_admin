import { lazy, Suspense } from "react";

import type { RouteObject } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

import { CustomLoadingScreen } from "~/common/components/custom/loadings";
import { ErrorLayout } from "~/common/components/layouts";
import { ROUTE_PATHS, ROUTE_SEGMENTS } from "../path";

const Error403Page = lazy(() => import("~/pages/errors/403"));
const Error404Page = lazy(() => import("~/pages/errors/404"));
const Error500Page = lazy(() => import("~/pages/errors/500"));
const ErrorUnknownPage = lazy(() => import("~/pages/errors/unknown"));

const ErrorsRoutes: RouteObject[] = [
  {
    path: ROUTE_SEGMENTS.error,
    element: (
      <ErrorLayout>
        <Suspense fallback={<CustomLoadingScreen />}>
          <Outlet />
        </Suspense>
      </ErrorLayout>
    ),
    children: [
      // 403 page
      // ----------------------------------------------------------------------------------------------------
      {
        path: "403",
        element: <Error403Page />,
      },

      // 404 page
      // ----------------------------------------------------------------------------------------------------
      {
        path: "404",
        element: <Error404Page />,
      },

      // 500 page
      // ----------------------------------------------------------------------------------------------------
      {
        path: "500",
        element: <Error500Page />,
      },

      // unknown error page
      // ----------------------------------------------------------------------------------------------------
      {
        path: "unknown",
        element: <ErrorUnknownPage />,
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

export default ErrorsRoutes;
