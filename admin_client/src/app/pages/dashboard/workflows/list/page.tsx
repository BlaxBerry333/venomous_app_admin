import { PageContent } from "~/ui/components/layouts";
import DashboardWorkflowsListView from "./view";

export default function DashboardWorkflowsListPage() {
  return (
    <PageContent helmet={{ title: "Workflows list" }}>
      <DashboardWorkflowsListView />
    </PageContent>
  );
}
