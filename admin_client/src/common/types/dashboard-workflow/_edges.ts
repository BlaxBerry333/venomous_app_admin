import type { NamedExoticComponent, PropsWithChildren } from "react";

import type { Edge as _Edge, EdgeProps as _EdgeProps } from "@xyflow/react";

export enum CustomEdgeTypeName {
  default = "default",
  deleteLabel = "deleteLabel",
}

export type CustomEdgeType = _Edge<CustomEdgeDataType>;

export type CustomEdgeDataType = {
  showDeleteButton?: boolean /** 是否在边上展示删除按钮 */;
  animationDuration?: number /** 边上展示动画小点时的耗时 ( sec ) */;
};

export type CustomEdgeComponentsType = Record<
  CustomEdgeTypeName,
  NamedExoticComponent<CustomEdgeProps>
>;

export type CustomEdgeWrapperProps = PropsWithChildren<CustomEdgeProps>;

export type CustomEdgeProps = _EdgeProps<CustomEdgeType>;
