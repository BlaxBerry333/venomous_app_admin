import type { FC } from "react";
import { memo } from "react";

import MuiBox from "@mui/material/Box";
import MuiCircularProgress from "@mui/material/CircularProgress";
import MuiLinearProgress from "@mui/material/LinearProgress";
import MuiPortal from "@mui/material/Portal";

type Props = {
  /** 加载状态从默认环状改为条状 */
  isLinear?: boolean;
};

const CustomLoadingScreen: FC<Props> = ({ isLinear = true }) => {
  return (
    <MuiPortal>
      <MuiBox
        sx={{
          width: 1,
          minHeight: 1,
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed", // 基于 <body>
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        {isLinear && <MuiLinearProgress color="primary" sx={{ width: 1, maxWidth: 360 }} />}
        {!isLinear && <MuiCircularProgress color="primary" />}
      </MuiBox>
    </MuiPortal>
  );
};

export default memo(CustomLoadingScreen);
