import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiBox from "@mui/material/Box";

import { UI_CONFIGS } from "~/ui/_configs";
import { getColor } from "~/ui/_helpers";
import {
  ContainerMaxBreakpoint,
  ContainerWrapper,
  Header,
  HeaderDesign,
  Logo,
  SettingsDrawer,
} from "~/ui/components";

const AuthLayout: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
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
        renderLogo={<Logo to="/auth/login" sx={{ ml: 3 }} />}
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
        component="main"
        sx={{
          height: `calc(100svh - ${UI_CONFIGS.size.HEADER_HEIGHT}px)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MuiBox sx={{ width: { xs: 300, sm: 400 } }}>
          {/* Content */}
          {children}
        </MuiBox>
      </MuiBox>
    </ContainerWrapper>
  );
});

export default AuthLayout;
