import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo, Suspense, useMemo } from "react";

import MuiDrawer, { type DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";

export enum DrawerPosition {
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom",
}

type DrawerProps = PropsWithChildren<
  Omit<MuiDrawerProps, "open" | "anchor"> & {
    width: number;
    isOpen: MuiDrawerProps["open"];
    position?: MuiDrawerProps["anchor"];
  }
>;

const Drawer: NamedExoticComponent<DrawerProps> = memo(
  ({ isOpen, onClose, children, width, position = DrawerPosition.LEFT, PaperProps, ...props }) => {
    const borderRadiusOfPosition = useMemo(() => {
      switch (position) {
        case DrawerPosition.RIGHT:
          return { borderTopRightRadius: 0, borderBottomRightRadius: 0 };
        case DrawerPosition.TOP:
          return { borderTopLeftRadius: 0, borderTopRightRadius: 0 };
        case DrawerPosition.BOTTOM:
          return { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 };
        case DrawerPosition.LEFT:
        default:
          return { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 };
      }
    }, [position]);

    return (
      <Suspense>
        <MuiDrawer
          open={isOpen}
          onClose={onClose}
          anchor={position}
          PaperProps={{
            sx: {
              p: 0,
              width,
              ...borderRadiusOfPosition,
              ...PaperProps?.sx,
            },
          }}
          {...props}
        >
          {children}
        </MuiDrawer>
      </Suspense>
    );
  },
);

export default Drawer;
