import { Workflows } from "~/app/features/workflows/_types";

type ElementFromFrontend = Workflows.Element;

type ElementFromBackend = {
  nodes: Array<{
    id: Workflows.Node["id"];
    type: Exclude<Workflows.Node["type"], undefined>;
    position: Workflows.Node["position"];
    data: Workflows.NodeDataFormValue;
  }>;
  edges: Array<Workflows.Edge>;
};

/**
 * 转换 element 的数据结构
 * 后端数据结构 → 前端视图结构
 */
export function transformElementFromBackendToFrontend(
  element: ElementFromBackend,
): ElementFromFrontend {
  return {
    nodes: element.nodes.map((n) => ({
      id: n.id,
      type: n.type!,
      position: n.position,
      data: {
        formValue: n.data,
      },
    })),
    edges: element.edges,
  };
}

/**
 * 转换 element 的数据结构
 * 前端视图结构 → 后端数据结构
 */
export function transformElementFromFrontendToBackend(
  element: ElementFromFrontend,
): ElementFromBackend {
  return {
    nodes: element.nodes.map((n) => ({
      id: n.id,
      type: n.type!,
      position: n.position,
      data: n.data.formValue!,
    })),
    edges: element.edges,
  };
}
