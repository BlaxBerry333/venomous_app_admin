import type { NamedExoticComponent } from "react";
import { memo } from "react";

import MuiBox from "@mui/material/Box";

import { UI_CONFIGS } from "~/ui/_configs";
import { getColor } from "~/ui/_helpers";
import {
  Button,
  ContainerMaxBreakpoint,
  ContainerWrapper,
  ErrorCode,
  ErrorImage,
  Header,
  HeaderDesign,
  Logo,
  SettingsDrawer,
  Typography,
} from "~/ui/components";

const ErrorLayout: NamedExoticComponent<{
  errorCode: ErrorCode;
  title?: string;
  subtitle?: string;
}> = memo(({ errorCode, title, subtitle }) => {
  return (
    <ContainerWrapper
      maxWidth={ContainerMaxBreakpoint.FULL_WIDTH}
      sx={{
        backgroundColor: ({ palette }) => getColor(palette.background.default).opacity(1),
      }}
    >
      <Header
        design={HeaderDesign.GLASS}
        height={UI_CONFIGS.size.HEADER_HEIGHT}
        renderLogo={<Logo sx={{ ml: 1.5 }} />}
        renderActions={
          <>
            <SettingsDrawer
              showOptionBlocks={{
                themeMode: true,
                themePaletteColorName: true,
                dashboardNavMenuPosition: false,
              }}
            />
          </>
        }
      />

      <MuiBox
        sx={{
          height: `calc(100svh - ${UI_CONFIGS.size.HEADER_HEIGHT}px)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Titles */}
        <MuiBox sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {title || errorCode}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {subtitle || errorCode}
          </Typography>
        </MuiBox>

        {/* Error Code Image */}
        <ErrorImage errorCode={errorCode} />

        {/* Navigation Button */}
        <Button href="/" sx={{ mt: 5 }}>
          Back To Home
        </Button>
      </MuiBox>
    </ContainerWrapper>
  );
});

export default ErrorLayout;
