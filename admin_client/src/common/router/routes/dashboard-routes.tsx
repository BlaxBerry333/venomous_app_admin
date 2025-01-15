import { lazy, Suspense } from "react";

import type { RouteObject } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

import { CustomLoadingScreen } from "~/common/components/custom/loadings";
import { DashboardLayout } from "~/common/components/layouts";

import { ROUTE_PATHS, ROUTE_SEGMENTS } from "../path";

const AccountsListPage = lazy(() => import("~/pages/dashboard/accounts/list/page"));
const AccountsDetailPage = lazy(() => import("~/pages/dashboard/accounts/[id]/page"));
const WorkflowListPage = lazy(() => import("~/pages/dashboard/workflow/list/page"));
const WorkflowPlaygroundPage = lazy(() => import("~/pages/dashboard/workflow/playground/page"));
const ReportListPage = lazy(() => import("~/pages/dashboard/report/list/page"));
const ReportDetailPage = lazy(() => import("~/pages/dashboard/report/[id]/page"));

const DashboardRoutes: RouteObject[] = [
  {
    path: ROUTE_PATHS.dashboard.root,
    element: (
      <DashboardLayout>
        <Suspense fallback={<CustomLoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        element: <Navigate to={ROUTE_PATHS.dashboard.workflow.root} replace />,
        index: true,
      },

      // Accounts
      // ----------------------------------------------------------------------------------------------------
      {
        path: ROUTE_SEGMENTS.accounts,
        children: [
          {
            element: <Navigate to={ROUTE_PATHS.dashboard.accounts.list} replace />,
            index: true,
          },
          {
            path: ROUTE_SEGMENTS.list,
            element: <AccountsListPage />,
          },
          {
            path: ROUTE_SEGMENTS.specific_id,
            element: <AccountsDetailPage />,
          },
          {
            path: "*",
            element: <Navigate to={ROUTE_PATHS.dashboard.accounts.list} replace />,
          },
        ],
      },

      // WorkFlow
      // ----------------------------------------------------------------------------------------------------
      {
        path: ROUTE_SEGMENTS.workflow,
        children: [
          {
            element: <Navigate to={ROUTE_PATHS.dashboard.workflow.list} replace />,
            index: true,
          },
          {
            path: ROUTE_SEGMENTS.list,
            element: <WorkflowListPage />,
          },
          {
            path: ROUTE_SEGMENTS.playground,
            element: <WorkflowPlaygroundPage />,
          },
          {
            path: "*",
            element: <Navigate to={ROUTE_PATHS.dashboard.workflow.list} replace />,
          },
        ],
      },

      // Report
      // ----------------------------------------------------------------------------------------------------
      {
        path: ROUTE_SEGMENTS.report,
        children: [
          {
            element: <Navigate to={ROUTE_PATHS.dashboard.report.list} replace />,
            index: true,
          },
          {
            path: ROUTE_SEGMENTS.list,
            element: <ReportListPage />,
          },
          {
            path: ROUTE_SEGMENTS.specific_id,
            element: <ReportDetailPage />,
          },
          {
            path: "*",
            element: <Navigate to={ROUTE_PATHS.dashboard.report.list} replace />,
          },
        ],
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

export default DashboardRoutes;
