import type { FC } from "react";
import { memo } from "react";

import { Icon } from "@iconify/react";

import MuiBox from "@mui/material/Box";
import MuiFab from "@mui/material/Fab";
import MuiFade from "@mui/material/Fade";
import useScrollTrigger from "@mui/material/useScrollTrigger";

export const BackToTopAnchor = "back-to-top-anchor" as const;

type Props = {
  scrollTarget: Node | Window | undefined;
};

const CustomBackToTop: FC<Props> = ({ scrollTarget }) => {
  const trigger = useScrollTrigger({
    target: scrollTarget,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      `#${BackToTopAnchor}`,
    );

    if (anchor) {
      anchor.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiFade in={trigger}>
      <MuiBox
        onClick={handleClick}
        sx={{
          position: "sticky",
          bottom: 0,
          right: 0,
          width: 1,
          display: trigger ? "flex" : "none",
          justifyContent: "flex-end",
          pr: 2,
        }}
      >
        <MuiFab size="large" color="primary" sx={{ fontSize: "2em" }}>
          <Icon icon="solar:alt-arrow-up-linear" />
        </MuiFab>
      </MuiBox>
    </MuiFade>
  );
};

export default memo(CustomBackToTop);
