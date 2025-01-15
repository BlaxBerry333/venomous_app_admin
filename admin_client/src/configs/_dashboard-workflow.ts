import { blue, green, grey, orange, red } from "@mui/material/colors";
import { CustomNodeTypeName } from "~/common/types/dashboard-workflow";

export const DASHBOARD_WORKFLOW_CONFIGS = {
  /** 节点的最大展示个数 */
  NodesMaxCount: Infinity,

  /** 节点的最大最小宽高 */
  NodeMinWidth: 160,
  NodeMaxWidth: 400,
  NodeMinHeight: 90,
  NodeMaxHeight: 320,

  /** 节点种类的分组 */
  NodeTypeGroup: {
    communication: [CustomNodeTypeName.message, CustomNodeTypeName.resizable],
    logic: [CustomNodeTypeName.condition],
    transform: [CustomNodeTypeName.code],
  },

  // ----------------------------------------------------------------------------------------------------

  /** Workflow 更新历史记录的最大存储个数 */
  RecordHistoryMaxCount: 5,

  /** Workflow UndoRedo 历史记录的最大存储个数 */
  UndoRedoHistoryMaxCount: 10,

  /** Workflow 自动保存时间最短间隔 ( ms ) */
  AutoSaveMinTime: 5000,

  // ----------------------------------------------------------------------------------------------------

  /** Canvas 上的通用颜色 */
  CommonColors: {
    error: red["600"],
    blank: grey["600"],
    logic: blue["400"],
    transform: green["400"],
    communication: orange["400"],
  },

  /** Canvas Hotkeys 热键 */
  CanvasHotkeys: {
    CopyNode: "meta+c",
    PasteNode: "meta+v",
    DeleteElements: "Backspace",
    Undo: "meta+z",
    Redo: "meta+shift+z",
  },

  /** Canvas 视图移动过过渡时间 ( ms ) */
  CanvasViewportTransitionDuration: 200,

  /** Canvas Gird 布局的单位 */
  CanvasGridLayoutGap: [32, 32] as [number, number],
} as const;
