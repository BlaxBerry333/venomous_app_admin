import { useCallback } from "react";

import type { Workflows } from "~/app/features/workflows/_types";
import useInstance from "./use-instance";

export default function useNodeUpdate() {
  const { updateNode, updateNodeData } = useInstance();

  const updateSpecificNode = useCallback(
    (id: string, nodeProps: Partial<Workflows.NodeProps>) => {
      updateNode(id, nodeProps);
    },
    [updateNode],
  );

  const updateSpecificNodeData = useCallback(
    (id: string, nodeData: Partial<Workflows.NodeData>) => {
      updateNodeData(id, nodeData);
    },
    [updateNodeData],
  );

  const updateSpecificNodeFormValue = useCallback(
    (id: string, formValue: Workflows.NodeDataFormValue) => {
      updateSpecificNodeData(id, { formValue });
    },
    [updateSpecificNodeData],
  );

  return { updateSpecificNode, updateSpecificNodeData, updateSpecificNodeFormValue };
}
