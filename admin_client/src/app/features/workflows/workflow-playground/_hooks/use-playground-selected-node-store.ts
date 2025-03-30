import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { Workflows } from "~/app/features/workflows/_types";

const usePlaygroundSelectedNodeStore = create<{
  selectedNode: Workflows.NodeProps | null;
  setSelectedNode: (nodeProps: Workflows.NodeProps) => void;
  clearSelectedNode: () => void;
}>()(
  devtools(
    (set) => ({
      selectedNode: null,
      setSelectedNode: (node) => set({ selectedNode: node }),
      clearSelectedNode: () => set({ selectedNode: null }),
    }),
    { name: "WORKFLOW_PLAYGROUND__SELECTED_NODE" },
  ),
);

export default usePlaygroundSelectedNodeStore;
