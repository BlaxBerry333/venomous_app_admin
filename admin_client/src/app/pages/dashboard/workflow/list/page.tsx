import { PageContent } from "~/ui/components/layouts";
import DashboardWorkflowListView from "./view";

export default function DashboardWorkflowListPage() {
  return (
    <PageContent helmet={{ title: "Workflow list" }}>
      <DashboardWorkflowListView />
    </PageContent>
  );
}
