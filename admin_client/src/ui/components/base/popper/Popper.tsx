import type { NamedExoticComponent } from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import MuiClickAwayListener from "@mui/material/ClickAwayListener";
import MuiPopper, { type PopperProps as MuiPopperProps } from "@mui/material/Popper";

export enum PopperPlacement {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
}

export type PopperProps = Omit<MuiPopperProps, "open" | "anchorEl" | "sx" | "placement"> & {
  renderPopperTrigger: (popper: ReturnType<typeof usePopper>) => React.ReactNode;
  renderPopperContent: (popper: ReturnType<typeof usePopper>) => React.ReactNode;
  handleOnClose?: () => void;
  autoWidth?: boolean;
  hidePopperContent?: boolean;
  popperContentSx?: MuiPopperProps["sx"];
  placement?: PopperPlacement;
};

/**
 * Popper 组件在展示期间，页面其它元素任然可被操作
 */
const Popper: NamedExoticComponent<PopperProps> = memo(
  ({
    renderPopperTrigger,
    renderPopperContent,
    handleOnClose,
    placement = PopperPlacement.right,
    autoWidth = false,
    hidePopperContent = false,
    popperContentSx,
    ...props
  }) => {
    const popper = usePopper();
    const anchorElementWidth = useMemo(
      () => (popper.anchorEl as Element)?.getBoundingClientRect()?.width || 0,
      [popper.anchorEl],
    );

    useEffect(() => {
      if (!popper.isOpen) {
        handleOnClose?.();
      }
    }, [popper.isOpen, handleOnClose]);

    return (
      <MuiClickAwayListener onClickAway={popper.handleClose}>
        <div>
          {/* Popper Trigger */}
          {renderPopperTrigger(popper)}

          {/* Popper Content */}
          <MuiPopper
            open={popper.isOpen}
            anchorEl={popper.anchorEl}
            placement={placement}
            sx={{
              display: hidePopperContent ? "none" : "block",
              minWidth: autoWidth ? anchorElementWidth : 100,
              maxWidth: autoWidth ? anchorElementWidth : 200,
              width: autoWidth ? anchorElementWidth : undefined,
              overflowY: "scroll",
              borderRadius: "8px",
              border: 1,
              borderColor: "divider",
              backgroundColor: "background.paper",
              p: "4px",
              zIndex: 1100,
              ...popperContentSx,
            }}
            {...props}
          >
            {renderPopperContent(popper)}
          </MuiPopper>
        </div>
      </MuiClickAwayListener>
    );
  },
);

export default Popper;

function usePopper() {
  const [anchorEl, setAnchorEl] = useState<MuiPopperProps["anchorEl"]>(null);
  const handleOpen = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    isOpen: !!anchorEl,
    anchorEl,
    setAnchorEl,
    handleOpen,
    handleClose,
  };
}
