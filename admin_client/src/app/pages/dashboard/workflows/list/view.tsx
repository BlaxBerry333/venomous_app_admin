import { memo, type NamedExoticComponent } from "react";

import { useDashboardWorkflowsListView } from "~/app/features/workflows/_hooks";
import { FullPageLoading, Link } from "~/ui/components";
import { DASHBOARD_PATHS } from "~/utils/libs/router";

const DashboardWorkflowsListView: NamedExoticComponent = memo(() => {
  const { data, isLoading } = useDashboardWorkflowsListView();

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <>
      <div>{JSON.stringify(data)}</div>

      <Link to={DASHBOARD_PATHS.workflows.playground + "?id=1"}>Playground Page</Link>
    </>
  );
});

export default DashboardWorkflowsListView;
