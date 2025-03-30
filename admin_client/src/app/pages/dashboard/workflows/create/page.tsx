import { PageContent } from "~/ui/components/layouts";
import DashboardWorkflowsCreatePageView from "./view";

export default function DashboardWorkflowsCreatePage() {
  return (
    <PageContent helmet={{ title: "Workflows Create" }}>
      <DashboardWorkflowsCreatePageView />
    </PageContent>
  );
}
