import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo, useCallback, useState } from "react";

import MuiBox from "@mui/material/Box";

import { UI_CONFIGS } from "~/ui/_configs";
import { BaseColor } from "~/ui/_helpers";
import { Drawer, DrawerPosition, IconButton } from "~/ui/components/base";
import { Header, HeaderDesign } from "~/ui/components/layouts";
import { DASHBOARD_PATHS } from "~/utils/libs/router";
import { Logo } from "../logo";

const NavMenuVerticalInMobile: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleIsOpen = useCallback((newOpen: boolean) => {
    return () => setIsOpen(newOpen);
  }, []);

  return (
    <>
      <IconButton
        icon={"solar:hamburger-menu-line-duotone"}
        color={BaseColor.INHERIT}
        onClick={toggleIsOpen(true)}
      />

      <Drawer
        isOpen={isOpen}
        onClose={toggleIsOpen(false)}
        width={UI_CONFIGS.size.NAV_MENU_WIDTH.EXPANDED_IN_SMALL_SCREEN}
        position={DrawerPosition.LEFT}
      >
        {/* Nav Menu Header */}
        <Header
          design={HeaderDesign.GLASS}
          renderLogo={<Logo to={DASHBOARD_PATHS.analysis} sx={{ ml: 1.5 }} />}
          sx={{ backgroundColor: "transparent !important" }}
        />

        {/* Nav Menu Scrollable List */}
        <MuiBox
          component="nav"
          sx={{
            height: `calc(100svh - ${UI_CONFIGS.size.HEADER_HEIGHT}px)`,
            overflowY: "scroll",
            px: 1,
            "& li.MuiListItem-root": {
              width: "100% !important",
              transition: "width 0.2s ease-in-out",
            },
          }}
        >
          {children}
        </MuiBox>
      </Drawer>
    </>
  );
});

export default NavMenuVerticalInMobile;
