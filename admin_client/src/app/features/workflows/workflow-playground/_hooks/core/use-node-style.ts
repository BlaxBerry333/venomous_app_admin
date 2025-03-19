import { useMemo } from "react";

import { FEATURE_WORKFLOWS_CONFIGS } from "~/app/_configs/feature-workflows";
import { getNodeColor, getNodeIcon } from "~/app/features/workflows/_helpers";
import { Workflows } from "~/app/features/workflows/_types";
import { getColor } from "~/ui/_helpers";
import type { CardWithActionsProps, IconProps } from "~/ui/components";

export default function useNodeStyle({
  selected,
  type = Workflows.NodeType.message,
  isFormInvalid,
}: Pick<Workflows.NodeProps, "selected" | "type"> & Pick<Workflows.NodeData, "isFormInvalid">) {
  const nodeColor = useMemo<string>(() => getColor(getNodeColor(type)).main, [type]);

  const nodeWrapperSX = useMemo<CardWithActionsProps["wrapperSx"]>(
    () => ({
      width: FEATURE_WORKFLOWS_CONFIGS.styles.nodeWidth,
      minHeight: FEATURE_WORKFLOWS_CONFIGS.styles.nodeHeight,
      display: "flex",
      flexDirection: "column",
      padding: "8px !important",
      overflow: "visible",
      outline: `4px solid ${isFormInvalid ? "red" : selected ? nodeColor : "transparent"}`,
      outlineOffset: "-2px",
      "&:hover": {
        boxShadow: (theme) => theme.shadows[6],
      },
    }),
    [selected, nodeColor, isFormInvalid],
  );

  const nodeHeaderSX = useMemo<CardWithActionsProps["headerSx"]>(
    () => ({
      paddingBottom: "8px !important",
    }),
    [],
  );

  const nodeContentSX = useMemo<CardWithActionsProps["contentSx"]>(
    () => ({
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0px !important",
    }),
    [],
  );

  return {
    wrapper: nodeWrapperSX,
    header: nodeHeaderSX,
    content: nodeContentSX,
  };
}

export function useNodeIconStyle(
  type: undefined | Workflows.NodeProps["type"] = Workflows.NodeType.message,
) {
  const nodeIcon = useMemo<string>(() => getNodeIcon(type), [type]);

  const nodeColor = useMemo<string>(() => getColor(getNodeColor(type)).main, [type]);

  const nodeIconStyle = useMemo<IconProps["sx"]>(
    () => ({
      backgroundColor: nodeColor,
      borderRadius: "8px",
      color: "#FFFFFF",
      padding: "4px !important",
    }),
    [nodeColor],
  );

  return {
    icon: nodeIcon,
    color: nodeColor,
    style: nodeIconStyle,
  };
}
