import { memo, type NamedExoticComponent } from "react";

import { useAPIWorkflowList } from "~/utils/libs/apis/_hooks/workflow";

const DashboardWorkflowListView: NamedExoticComponent = memo(() => {
  const { data, isLoading } = useAPIWorkflowList();

  if (isLoading) {
    return <>Loading...</>;
  }
  return <>{JSON.stringify(data)}</>;
});

export default DashboardWorkflowListView;
