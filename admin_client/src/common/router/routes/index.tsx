import { Navigate, useRoutes } from "react-router-dom";

import { ROUTE_PATHS } from "../path";
import AuthRoutes from "./auth-routes";
import DashboardRoutes from "./dashboard-routes";
import ErrorsRoutes from "./error-routes";

export function Router() {
  return useRoutes([
    {
      path: ROUTE_PATHS.root,
      element: <Navigate to={ROUTE_PATHS.auth.login} replace />,
    },

    // Auth
    // ----------------------------------------------------------------------------------------------------
    ...AuthRoutes,

    // Dashboard
    // ----------------------------------------------------------------------------------------------------
    ...DashboardRoutes,

    // Errors
    // ----------------------------------------------------------------------------------------------------
    ...ErrorsRoutes,

    // Fallback
    // ----------------------------------------------------------------------------------------------------
    {
      path: "*",
      element: <Navigate to={ROUTE_PATHS.error[404]} replace />,
    },
  ]);
}
