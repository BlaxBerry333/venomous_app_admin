import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo, useCallback, useState } from "react";

import MuiPopover, { type PopoverProps as MuiPopoverProps } from "@mui/material/Popover";

export type PopoverProps = PropsWithChildren<Omit<MuiPopoverProps, "open" | "onClose">> & {
  isOpen?: boolean;
  handleClose?: () => void;
};

const Popover: NamedExoticComponent<PopoverProps> = memo(
  ({ children, anchorEl, isOpen, handleClose, ...props }) => {
    return (
      <MuiPopover
        open={!!isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        transformOrigin={{ vertical: "center", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              ml: 0.5,
              p: 0.5,
              borderRadius: 2,
              minWidth: 100,
            },
          },
        }}
        {...props}
      >
        {children}
      </MuiPopover>
    );
  },
);

export default Popover;

type PopoverAnchorEl = PopoverProps["anchorEl"];

/**
 * @example
 * ```tsx
 * const { isOpen, anchorEl, handleOpen, handleClose } = usePopover();
 * <>
 *   <button onClick={popover.onOpen}>open</button>
 *   <Popover open={isOpen} anchorEl={anchorEl} onClose={onClose}>
 *     xxxx
 *   </Popover>
 * </>
 * ```
 */
export function usePopover() {
  const [anchorEl, setAnchorEl] = useState<PopoverAnchorEl>(null);
  const handleOpen = useCallback((e: React.MouseEvent<PopoverAnchorEl>) => {
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
