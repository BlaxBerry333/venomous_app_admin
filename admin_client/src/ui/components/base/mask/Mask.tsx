import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiBox from "@mui/material/Box";

import { getColor } from "~/ui/_helpers";

export enum MaskCursor {
  NOT_ALLOWED = "not-allowed",
  LOADING = "wait",
}

/**
 * @example
 * ```tsx
 * <div style={{ position: "relative", width: 300, height: 300 }}>
 *   <Mask />
 * </div>
 * ```
 */
const Mask: NamedExoticComponent<
  PropsWithChildren<{
    show?: boolean;
    cursor?: MaskCursor;
  }>
> = memo(({ children, show = true, cursor = MaskCursor.NOT_ALLOWED }) => {
  return (
    <MuiBox
      id="mask"
      sx={{
        display: show ? "block" : "none",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        backgroundColor: ({ palette }) => getColor(palette.background.paper).opacity(0.9),
        height: "100%",
        width: "100%",
        cursor: cursor,
      }}
    >
      {children}
    </MuiBox>
  );
});

export default Mask;
