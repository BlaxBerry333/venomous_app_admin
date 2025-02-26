import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";
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

      {children}
    </ContainerWrapper>
  );
});

export default AuthLayout;
