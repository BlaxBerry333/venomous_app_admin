import { PageContent } from "~/ui/components/layouts";
import DashboardWorkflowsPlaygroundView from "./view";

export default function DashboardWorkflowsPlaygroundPage() {
  return (
    <PageContent helmet={{ title: "Workflows Playground" }}>
      <DashboardWorkflowsPlaygroundView />
    </PageContent>
  );
}
