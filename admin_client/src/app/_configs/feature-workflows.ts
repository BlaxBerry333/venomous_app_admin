export const FEATURE_WORKFLOWS_CONFIGS = {
  styles: {
    nodeWidth: 250,
    nodeHeight: 100,

    nodeColor: {
      default: "#fff",
      message: "#fff",
      fetch: "#fff",
      script: "#fff",
    },
  },

  canvas: {
    isGridLayout: false, // 是否使用 Grid 布局
    gridLayoutGap: [20, 20] as [number, number], // Grid 布局间隔
  },

  history: {
    maxCount: 10, // 最大记录条数
  },

  undoRedo: {
    maxCount: 10, // 最大记录条数
  },

  hotkeys: {},
} as const;
