import { Navigate, useRoutes } from "react-router-dom";

import { AuthRoutes } from "./auth-routes";
import { DashboardRoutes } from "./dashboard-routes";
import { ErrorsRoutes } from "./errors-routes";

export function RouterViews(): React.ReactElement | null {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to={"/auth"} replace />,
    },

    ...AuthRoutes,

    ...DashboardRoutes,

    ...ErrorsRoutes,

    {
      path: "*",
      element: <Navigate to={"/errors/404"} replace />,
    },
  ]);
}
