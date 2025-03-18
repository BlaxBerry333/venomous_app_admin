import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { sleep } from "~/utils/custom/process";
import usePlaygroundSelectedNodeStore from "./use-playground-selected-node-store";

const usePlaygroundActionStatusStore = create<{
  // Node Delete Confirm Modal
  isOpenNodeDeleteConfirmModal: boolean;
  openNodeDeleteConfirmModal: () => void;
  closeNodeDeleteConfirmModal: () => Promise<void>;

  // Node Detail Modal
  isOpenNodeDetailModal: boolean;
  openNodeDetailModal: () => void;
  closeNodeDetailModal: () => Promise<void>;
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
    }),
    { name: "WORKFLOW_PLAYGROUND__ACTION_STATUS" },
  ),
);

export default usePlaygroundActionStatusStore;
