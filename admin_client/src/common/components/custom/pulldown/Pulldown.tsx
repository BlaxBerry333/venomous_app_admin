import type { FC, PropsWithChildren, ReactNode } from "react";
import { memo, startTransition, useCallback, useRef, useState } from "react";

import MuiBox from "@mui/material/Box";
import MuiClickAwayListener from "@mui/material/ClickAwayListener";
import MuiGrow from "@mui/material/Grow";
import MuiPaper from "@mui/material/Paper";
import MuiPopper from "@mui/material/Popper";
import type { SxProps } from "@mui/material/styles";

export type CustomPulldownProps = PropsWithChildren<{
  defaultIsOpen?: boolean;
  renderMainItem: (params: { isOpen: boolean; toggle: VoidFunction }) => ReactNode;
  afterCloseMenuList?: VoidFunction;
  afterOpenMenuList?: VoidFunction;
  mainItemWrapperSx?: SxProps;
  menuListWrapperPaperSx?: SxProps;
  allowClickAwayToClose?: boolean;
}>;

const CustomPulldown: FC<CustomPulldownProps> = ({
  defaultIsOpen = false,
  children,
  renderMainItem,
  afterCloseMenuList,
  afterOpenMenuList,
  mainItemWrapperSx,
  menuListWrapperPaperSx,
  allowClickAwayToClose = true,
}) => {
  const [open, setOpen] = useState<boolean>(defaultIsOpen);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggleMenuList = useCallback(() => {
    startTransition(() => setOpen((prev) => !prev));
    afterOpenMenuList?.();
  }, [afterOpenMenuList, setOpen]);

  const handleCloseMenuList = useCallback(
    (event: Event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
        return;
      }
      setOpen(false);
      afterCloseMenuList?.();
    },
    [afterCloseMenuList, setOpen],
  );

  return (
    <>
      <MuiBox ref={anchorRef} onClick={handleToggleMenuList} sx={mainItemWrapperSx}>
        {renderMainItem({ isOpen: open, toggle: handleToggleMenuList })}
      </MuiBox>

      <MuiPopper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <MuiGrow
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
          >
            <MuiPaper sx={{ p: 0, borderRadius: 2, ...menuListWrapperPaperSx }}>
              {allowClickAwayToClose ? (
                <MuiClickAwayListener onClickAway={handleCloseMenuList}>
                  <div style={{ width: "100%", height: "100%" }}>{children}</div>
                </MuiClickAwayListener>
              ) : (
                <div style={{ width: "100%", height: "100%" }}>{children}</div>
              )}
            </MuiPaper>
          </MuiGrow>
        )}
      </MuiPopper>
    </>
  );
};

export default memo(CustomPulldown);
