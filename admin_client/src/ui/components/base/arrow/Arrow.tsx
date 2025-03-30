import type { NamedExoticComponent } from "react";
import { memo, useMemo } from "react";

import MuiBox from "@mui/material/Box";

import { BasePosition, getPositionOfArrow } from "~/ui/_helpers";

const Arrow: NamedExoticComponent<{
  size?: number;
  anchorEl?: null | Element;
  backgroundPosition?: BasePosition;
}> = memo(({ size = 16, anchorEl, backgroundPosition = BasePosition.RIGHT_CENTER }) => {
  const anchorElWidth: number = anchorEl?.getBoundingClientRect()?.width || 0;
  const anchorElHeight: number = anchorEl?.getBoundingClientRect()?.height || 0;

  const placementAttributes = useMemo(() => {
    return getPositionOfArrow({
      size,
      anchorEl: { width: anchorElWidth, height: anchorElHeight },
      backgroundPosition,
    });
  }, [size, anchorElWidth, anchorElHeight, backgroundPosition]);

  return (
    <MuiBox
      className="arrow"
      component="span"
      sx={{
        display: anchorEl ? "block" : "none",
        width: size,
        height: size,
        position: "absolute",
        /* MUI Paper 颜色 */
        /* -------------- */
        backgroundColor: ({ palette }) => palette.background.paper,
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.119), rgba(255, 255, 255, 0.119));",
        /* -------------- */
        ...placementAttributes,
      }}
    />
  );
});

export default Arrow;
