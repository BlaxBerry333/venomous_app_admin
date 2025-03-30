import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo, useCallback, useMemo, useState } from "react";

import MuiPopover, { type PopoverProps as MuiPopoverProps } from "@mui/material/Popover";

import { BasePosition, getPositionOfMuiPopover } from "~/ui/_helpers";
import { Arrow } from "~/ui/components/base/arrow";

export type PopoverProps = PropsWithChildren<Omit<MuiPopoverProps, "open" | "onClose">> & {
  isOpen?: boolean;
  handleClose?: () => void;
  escapeKeyDown?: boolean;
  arrow?: boolean;
  position?: BasePosition;
  autoWidth?: boolean;
  minWidth?: number;
  maxWidth?: number;
};

/**
 * Popover 组件在展示期间，页面其它元素无法被操作
 */
const Popover: NamedExoticComponent<PopoverProps> = memo(
  ({
    children,
    anchorEl,
    isOpen,
    handleClose,
    escapeKeyDown = false,
    arrow = true,
    position = BasePosition.RIGHT_CENTER,
    autoWidth = false,
    minWidth = 100,
    maxWidth = 200,
    sx,
    ...props
  }) => {
    const placementAttributes = useMemo(
      () => getPositionOfMuiPopover(position, arrow),
      [position, arrow],
    );

    const anchorElementWidth = useMemo<number>(
      () => (anchorEl as Element)?.getBoundingClientRect()?.width || 0,
      [anchorEl],
    );

    if (!anchorEl) {
      return null;
    }

    return (
      <MuiPopover
        open={!!isOpen}
        anchorEl={anchorEl}
        onClose={escapeKeyDown ? undefined : handleClose}
        slotProps={{
          paper: {
            sx: {
              overflow: "inherit !important",
              minWidth: autoWidth ? anchorElementWidth : minWidth,
              maxWidth: autoWidth ? anchorElementWidth : maxWidth,
              width: autoWidth ? anchorElementWidth : undefined,
              ...placementAttributes.slotPaperSx,
            },
          },
        }}
        anchorOrigin={placementAttributes.anchorOrigin}
        transformOrigin={placementAttributes.transformOrigin}
        sx={sx}
        {...props}
      >
        {/* Arrow */}
        {arrow && <Arrow anchorEl={anchorEl as Element} backgroundPosition={position} />}

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            width: "100%",
            padding: 4,
          }}
        >
          {children}
        </div>
      </MuiPopover>
    );
  },
);

export default Popover;

/**
 * @example
 * ```tsx
 * const { isOpen, anchorEl, handleOpen, handleClose } = usePopover();
 * <>
 *   <button onClick={handleOpen}>open</button>
 *   <Popover {...{ isOpen, anchorEl, handleClose }}>
 *     xxxx
 *   </Popover>
 * </>
 * ```
 */
export function usePopover() {
  const [anchorEl, setAnchorEl] = useState<MuiPopoverProps["anchorEl"]>(null);
  const handleOpen = useCallback((e: React.MouseEvent<MuiPopoverProps["anchorEl"]>) => {
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
