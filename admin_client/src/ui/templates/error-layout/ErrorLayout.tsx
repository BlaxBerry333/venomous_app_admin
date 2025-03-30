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
  Link,
  Logo,
  SettingsDrawer,
  Typography,
} from "~/ui/components";

type ErrorLayoutProps = {
  errorCode: ErrorCode;
  title?: string;
  subtitle?: string;
  hideNavigationButton?: boolean;
  navigationButtonText?: string;
  navigationUrl?: string;
};

const ErrorLayout: NamedExoticComponent<ErrorLayoutProps> = memo(
  ({
    errorCode,
    title,
    subtitle,
    hideNavigationButton = false,
    navigationButtonText = "Back To Home",
    navigationUrl = "/",
  }) => {
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
          renderLogo={<Logo to="/" sx={{ ml: 3 }} />}
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
          {!hideNavigationButton && (
            <Link to={navigationUrl} replace underline="none">
              <Button sx={{ mt: 5 }}>{navigationButtonText}</Button>
            </Link>
          )}
        </MuiBox>
      </ContainerWrapper>
    );
  },
);

export default ErrorLayout;
