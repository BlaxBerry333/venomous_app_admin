import { PageContent } from "~/ui/components/layouts";
import DashboardWorkflowsDetailPageView from "./view";

export default function DashboardWorkflowsDetailPage() {
  return (
    <PageContent helmet={{ title: "Workflows Detail" }}>
      <DashboardWorkflowsDetailPageView />
    </PageContent>
  );
}
