import { useMemo } from "react";

import { FEATURE_WORKFLOWS_CONFIGS } from "~/app/_configs/feature-workflows";
import { Workflows } from "~/app/features/workflows/_types";
import type { CardWithActionsProps } from "~/ui/components";

export default function useNodeStyle({
  nodeColor,
  selected,
}: Pick<Workflows.NodeProps, "selected"> & { nodeColor: string }) {
  const nodeWrapperSX = useMemo<CardWithActionsProps["wrapperSx"]>(
    () => ({
      width: FEATURE_WORKFLOWS_CONFIGS.styles.nodeWidth,
      minHeight: FEATURE_WORKFLOWS_CONFIGS.styles.nodeHeight,
      display: "flex",
      flexDirection: "column",
      padding: "8px !important",
      overflow: "visible",
      outline: `4px solid ${selected ? nodeColor : "transparent"}`,
      outlineOffset: "-2px",
    }),
    [selected, nodeColor],
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
