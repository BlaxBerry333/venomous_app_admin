import type { FC } from "react";
import { memo } from "react";

import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

import Logo from "~/common/assets/images/logo.webp";
import { ADMIN_CLIENT_CONFIGS } from "~/configs/_base";

const DashboardLayoutHeaderLogo: FC<{ showLogo?: boolean; showTitle?: boolean }> = ({
  showLogo = true,
  showTitle = true,
}) => {
  return (
    <MuiBox
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 240,
      }}
    >
      <MuiBox
        sx={{
          height: 40,
          width: 40,
          mr: 1,
          display: showLogo ? "block" : "none",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: `url(${Logo})`,
        }}
      />

      <MuiBox
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MuiTypography
          component="h1"
          noWrap
          sx={{
            display: showTitle ? "block" : "none",
            mt: 0.5,
            fontWeight: 600,
            fontSize: "1.15rem",
            fontStyle: "italic",
          }}
        >
          {ADMIN_CLIENT_CONFIGS.info.name}
        </MuiTypography>

        <MuiTypography
          component="div"
          variant="caption"
          sx={{
            mt: -0.8,
            ml: 0.2,
            fontWeight: 600,
            fontStyle: "italic",
          }}
        >
          {ADMIN_CLIENT_CONFIGS.info.version}
        </MuiTypography>
      </MuiBox>
    </MuiBox>
  );
};

export default memo(DashboardLayoutHeaderLogo);
