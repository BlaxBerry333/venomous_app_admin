import { Helmet } from "react-helmet-async";

import DashboardWorkflowListPageView from "./view";

export default function DashboardWorkflowListPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Workflow List</title>
      </Helmet>

      <DashboardWorkflowListPageView />
    </>
  );
}
