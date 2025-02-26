import type { NamedExoticComponent } from "react";
import { memo, useMemo } from "react";

import MuiBox from "@mui/material/Box";

import { BasePosition, getPositionOfArrow } from "~/ui/_helpers";

const Arrow: NamedExoticComponent<{
  size?: number;
  position?: BasePosition;
}> = memo(({ size = 16, position = BasePosition.RIGHT_CENTER }) => {
  const placementAttributes = useMemo(() => getPositionOfArrow(position), [position]);

  return (
    <MuiBox
      className="arrow"
      component="span"
      sx={{
        display: "inline-block",
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
