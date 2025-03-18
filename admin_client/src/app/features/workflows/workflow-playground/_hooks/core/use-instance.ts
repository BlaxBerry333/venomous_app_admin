import { useMemo } from "react";

import { useReactFlow } from "@xyflow/react";

import { Workflows } from "~/app/features/workflows/_types";

export default function useInstance() {
  const originalInstance = useReactFlow<Workflows.Node, Workflows.Edge>();

  const instance = useMemo(() => {
    return {
      ...originalInstance,

      getElement: () => ({
        nodes: originalInstance.getNodes().map(({ id, type, position, data }) => ({
          id,
          type,
          position,
          data,
        })),
        edges: originalInstance
          .getEdges()
          .map(({ id, type, source, target, sourceHandle, targetHandle }) => ({
            id,
            type,
            source,
            target,
            sourceHandle,
            targetHandle,
          })),
      }),

      setElement: ({ nodes, edges }: Workflows.Element): void => {
        originalInstance.setNodes(nodes);
        originalInstance.setEdges(edges);
      },
    };
  }, [originalInstance]);

  return instance;
}
