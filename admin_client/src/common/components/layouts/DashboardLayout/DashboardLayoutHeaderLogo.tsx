import type { FC } from "react";
import { memo } from "react";

import MuiBox from "@mui/material/Box";
import MuiTypography from "@mui/material/Typography";

import Logo from "~/assets/images/logo.webp";

const DashboardLayoutHeaderLogo: FC<{ showLogo?: boolean; showTitle?: boolean }> = ({
  showLogo = true,
  showTitle = true,
}) => {
  return (
    <MuiBox
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <MuiBox
        sx={{
          height: 50,
          width: 50,
          display: showLogo ? "block" : "none",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: `url(${Logo})`,
        }}
      />

      <MuiTypography
        component="h1"
        noWrap
        sx={{
          display: showTitle ? "block" : "none",
          fontWeight: 600,
          fontSize: "1.2rem",
          fontStyle: "italic",
          ml: -0.5,
          pt: 1.5,
        }}
      >
        {"Venomous Admin"}
      </MuiTypography>
    </MuiBox>
  );
};

export default memo(DashboardLayoutHeaderLogo);
