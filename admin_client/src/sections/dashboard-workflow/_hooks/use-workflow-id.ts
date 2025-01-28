import useRouteSearchParams from "~/common/hooks/useRouteSearchParams";

export default function useWorkflowId() {
  const searchParams = useRouteSearchParams<{ workflowId: string }>();
  const workflowId = searchParams.workflowId;

  return workflowId;
}
