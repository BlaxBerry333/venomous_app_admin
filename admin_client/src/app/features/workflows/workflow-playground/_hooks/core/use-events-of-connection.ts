import { useCallback } from "react";

import {
  getOutgoers as XYFlowGetOutgoers,
  type Connection as XYFlowConnection,
  type IsValidConnection as XYFlowIsValidConnection,
} from "@xyflow/react";

import type { Workflows } from "~/app/features/workflows/_types";
import useInstance from "./use-instance";

export default function useEventsOfConnection() {
  const { getElement } = useInstance();

  const isValidConnection: XYFlowIsValidConnection = useCallback(
    (connection) => {
      return _preventCycle(getElement(), connection as XYFlowConnection);
    },
    [getElement],
  );

  return {
    isValidConnection,
  };
}

function _preventCycle({ nodes, edges }: Workflows.Element, connection: XYFlowConnection) {
  function _hasCycle(node: Workflows.Node | undefined, visited = new Set()) {
    if (!node) return false;
    if (visited.has(node.id)) return false;
    visited.add(node?.id);
    for (const outgoer of XYFlowGetOutgoers(node, nodes, edges)) {
      if (outgoer.id === connection.source) return true;
      if (_hasCycle(outgoer, visited)) return true;
    }
  }
  const target = nodes.find((node) => node.id === connection.target);
  if (target?.id === connection.source) return false;
  return !_hasCycle(target);
}
