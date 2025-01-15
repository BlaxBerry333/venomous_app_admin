import type { FC } from "react";
import { memo } from "react";

import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

const DashboardLayoutFooter: FC = () => {
  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiBox component="footer">
      <MuiTypography>{"Footer"}</MuiTypography>
    </MuiBox>
  );
};

export default memo(DashboardLayoutFooter);
