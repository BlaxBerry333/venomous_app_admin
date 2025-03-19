import { useCallback, useMemo } from "react";

import { useReactFlow } from "@xyflow/react";

import { Workflows } from "~/app/features/workflows/_types";

export default function useInstance() {
  const originalInstance = useReactFlow<Workflows.Node, Workflows.Edge>();
  const { getNodes, getEdges, setNodes, setEdges } = originalInstance;

  const getElement = useCallback(
    () => ({
      nodes: getNodes().map(({ id, type, position, data }) => ({
        id,
        type,
        position,
        data,
      })),
      edges: getEdges().map(({ id, type, source, target, sourceHandle, targetHandle }) => ({
        id,
        type,
        source,
        target,
        sourceHandle,
        targetHandle,
      })),
    }),
    [getNodes, getEdges],
  );

  const setElement = useCallback(
    ({ nodes, edges }: Workflows.Element): void => {
      setNodes(nodes);
      setEdges(edges);
    },
    [setNodes, setEdges],
  );

  const resetElements = useCallback(() => {
    setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));
    setEdges((eds) => eds.map((e) => ({ ...e, selected: false })));
  }, [setNodes, setEdges]);

  const instance = useMemo(
    () => ({
      ...originalInstance,
      getElement,
      setElement,
      resetElements,
    }),
    [originalInstance, getElement, setElement, resetElements],
  );

  return instance;
}
