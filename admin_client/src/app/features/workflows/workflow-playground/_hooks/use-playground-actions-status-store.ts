import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { BackgroundVariant as XYFlowBackgroundVariant } from "@xyflow/react";

import { sleep } from "~/utils/custom/process";
import usePlaygroundSelectedNodeStore from "./use-playground-selected-node-store";

const usePlaygroundActionStatusStore = create<{
  // Node Delete Confirm Modal
  isOpenNodeDeleteConfirmModal: boolean;
  openNodeDeleteConfirmModal: VoidFunction;
  closeNodeDeleteConfirmModal: () => Promise<void>;

  // Node Detail Modal
  isOpenNodeDetailModal: boolean;
  openNodeDetailModal: VoidFunction;
  closeNodeDetailModal: () => Promise<void>;

  // Canvas Background
  isGridLayout: boolean;
  gridBackgroundVariant: XYFlowBackgroundVariant;
  setGridBackgroundVariant: (variant: XYFlowBackgroundVariant) => void;

  // Canvas MiniMap
  isOpenMiniMap: boolean;
  toggleMiniMap: VoidFunction;
}>()(
  devtools(
    (set) => ({
      isOpenNodeDeleteConfirmModal: false,
      openNodeDeleteConfirmModal: () => {
        set({ isOpenNodeDeleteConfirmModal: true });
      },
      closeNodeDeleteConfirmModal: async () => {
        set({ isOpenNodeDeleteConfirmModal: false });
        await sleep(1000); // 延时清空，以避免实时清空时页面会渲染出 undefined
        usePlaygroundSelectedNodeStore.getState().clearSelectedNode();
      },

      isOpenNodeDetailModal: false,
      openNodeDetailModal: () => {
        set({ isOpenNodeDetailModal: true });
      },
      closeNodeDetailModal: async () => {
        set({ isOpenNodeDetailModal: false });
        await sleep(1000); // 延时清空，以避免实时清空时页面会渲染出 undefined
        usePlaygroundSelectedNodeStore.getState().clearSelectedNode();
      },

      isGridLayout: false,
      gridBackgroundVariant: XYFlowBackgroundVariant.Dots,
      setGridBackgroundVariant: (variant: XYFlowBackgroundVariant) => {
        set({ gridBackgroundVariant: variant });
      },

      isOpenMiniMap: true,
      toggleMiniMap: () => {
        console.log(1);

        set((state) => ({ isOpenMiniMap: !state.isOpenMiniMap }));
      },
    }),
    { name: "WORKFLOW_PLAYGROUND__ACTION_STATUS" },
  ),
);

export default usePlaygroundActionStatusStore;
