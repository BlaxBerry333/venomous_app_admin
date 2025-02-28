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
};

/**
 * Popover 组件是通过定位浮动，其触发元素在显示期间无法被操作
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
              minWidth: autoWidth ? anchorElementWidth : 100,
              maxWidth: autoWidth ? anchorElementWidth : 200,
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
