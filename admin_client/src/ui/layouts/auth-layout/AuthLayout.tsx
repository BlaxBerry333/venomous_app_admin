import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { getColor } from "~/ui/_helpers";
import { HEADER_HEIGHT } from "~/ui/_hooks";
import { ContainerMaxBreakpoint, ContainerWrapper } from "~/ui/components";
import { Header, HeaderDesign } from "../_header";
import { Logo } from "../_logo";
import { SettingsDrawer } from "../_settings";

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
        height={HEADER_HEIGHT}
        renderLogo={() => <Logo />}
        renderActions={() => (
          <>
            <SettingsDrawer
              showOptionBlocks={{
                themeMode: true,
                themePaletteColorName: true,
                dashboardNavMenuPosition: false,
              }}
            />
          </>
        )}
      />

      {children}
    </ContainerWrapper>
  );
});

export default AuthLayout;
