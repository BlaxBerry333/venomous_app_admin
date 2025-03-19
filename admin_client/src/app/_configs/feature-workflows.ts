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
    gridLayoutGap: [20, 20] as [number, number], // Grid 布局间隔
    minZoom: 0.5, // 最小缩放比例
    maxZoom: 2, // 最大缩放比例
    zoomDuration: 200, // 缩放动画时长
  },

  history: {
    maxCount: 10, // 最大记录条数
  },

  undoRedo: {
    maxCount: 10, // 最大记录条数
  },

  hotkeys: {},
} as const;
