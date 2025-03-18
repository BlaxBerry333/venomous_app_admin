import { useAPIWorkflowsList } from "~/utils/libs/apis/_hooks/workflows";

export default function useDashboardWorkflowsListView() {
  const { data, isLoading } = useAPIWorkflowsList();

  return {
    data,
    isLoading,
  };
}
