import type { FC, PropsWithChildren, ReactNode } from "react";
import { memo, startTransition, useCallback, useRef, useState } from "react";

import MuiBox from "@mui/material/Box";
import MuiClickAwayListener from "@mui/material/ClickAwayListener";
import MuiGrow from "@mui/material/Grow";
import MuiPaper from "@mui/material/Paper";
import MuiPopper from "@mui/material/Popper";

const CustomPulldown: FC<
  PropsWithChildren<{
    defaultIsOpen?: boolean;
    renderMainItem: ({ isOpen }: { isOpen: boolean }) => ReactNode;
    afterCloseMenuList?: () => void;
    afterOpenMenuList?: () => void;
  }>
> = ({
  defaultIsOpen = false,
  children,
  renderMainItem,
  afterCloseMenuList,
  afterOpenMenuList,
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
      <MuiBox ref={anchorRef} onClick={handleToggleMenuList}>
        {renderMainItem({ isOpen: open })}
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
            <MuiPaper sx={{ p: 0, borderRadius: 2 }}>
              <MuiClickAwayListener onClickAway={handleCloseMenuList}>
                <div>{children}</div>
              </MuiClickAwayListener>
            </MuiPaper>
          </MuiGrow>
        )}
      </MuiPopper>
    </>
  );
};

export default memo(CustomPulldown);
