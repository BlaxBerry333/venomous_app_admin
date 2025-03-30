import type { NamedExoticComponent } from "react";
import { memo, startTransition, useCallback, useState } from "react";

import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";
import MuiCollapse from "@mui/material/Collapse";

import CollapsableWrapperExpandIcon from "./CollapsableWrapperExpandIcon";

export type CollapsableWrapperProps = {
  defaultExpanded?: boolean;
  hideDefaultExpandIcon?: boolean;
  reverseDefaultExpandIcon?: boolean;
  renderCollapsedTrigger: (params: ReturnType<typeof useCollapse>) => JSX.Element;
  renderCollapsedContent: (params: ReturnType<typeof useCollapse>) => JSX.Element;
  triggerSx?: MuiBoxProps["sx"];
};

const CollapsableWrapper: NamedExoticComponent<CollapsableWrapperProps> = memo(
  ({
    defaultExpanded = false,
    hideDefaultExpandIcon = false,
    reverseDefaultExpandIcon = false,
    renderCollapsedTrigger,
    renderCollapsedContent,
    triggerSx,
  }) => {
    const collapse = useCollapse({ defaultExpanded });

    return (
      <>
        {/* Custom Collapsed Trigger */}
        <MuiBox sx={{ display: "flex", alignItems: "center", cursor: "pointer", ...triggerSx }}>
          {/* Default Expand/Collapse Icon */}
          {!hideDefaultExpandIcon && reverseDefaultExpandIcon && (
            <CollapsableWrapperExpandIcon
              isExpanded={collapse.isExpanded}
              onClick={collapse.toggleExpanded}
              sx={{ mr: 1 }}
            />
          )}

          {/* Custom Collapsed Trigger */}
          {renderCollapsedTrigger(collapse)}

          {/* Default Expand/Collapse Icon */}
          {!hideDefaultExpandIcon && !reverseDefaultExpandIcon && (
            <CollapsableWrapperExpandIcon
              isExpanded={collapse.isExpanded}
              onClick={collapse.toggleExpanded}
              sx={{ ml: 1 }}
            />
          )}
        </MuiBox>

        {/* Collapsed Content */}
        <MuiCollapse in={collapse.isExpanded} orientation="vertical" timeout="auto" unmountOnExit>
          {renderCollapsedContent(collapse)}
        </MuiCollapse>
      </>
    );
  },
);

export default CollapsableWrapper;

function useCollapse({ defaultExpanded = false } = {}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const toggleExpanded = useCallback(() => {
    startTransition(() => setIsExpanded((s) => !s));
  }, []);

  return { isExpanded, setIsExpanded, toggleExpanded };
}
