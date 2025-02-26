import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo, useCallback, useMemo, useState } from "react";

import MuiPopover, { type PopoverProps as MuiPopoverProps } from "@mui/material/Popover";
import { BasePosition, getPositionOfMuiPopover } from "~/ui/_helpers";
import { Arrow } from "../arrow";

export type PopoverProps = PropsWithChildren<Omit<MuiPopoverProps, "open" | "onClose">> & {
  isOpen?: boolean;
  handleClose?: () => void;
  position?: BasePosition;
};

const Popover: NamedExoticComponent<PopoverProps> = memo(
  ({
    children,
    anchorEl,
    isOpen,
    handleClose,
    position = BasePosition.RIGHT_CENTER,
    sx,
    ...props
  }) => {
    const placementAttributes = useMemo(() => getPositionOfMuiPopover(position), [position]);

    return (
      <MuiPopover
        open={!!isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              overflow: "inherit !important",
              minWidth: 100,
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
        <Arrow position={position} />

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

type PopoverAnchorEl = PopoverProps["anchorEl"];

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
