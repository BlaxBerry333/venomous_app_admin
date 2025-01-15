import { Helmet } from "react-helmet-async";

import DashboardWorkflowPlaygroundPageView from "./view";

export default function DashboardWorkflowPlaygroundPage() {
  return (
    <>
      <Helmet>
        <title>Venomous Admin | Workflow Playground</title>
      </Helmet>

      <DashboardWorkflowPlaygroundPageView />
    </>
  );
}
