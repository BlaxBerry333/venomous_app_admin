import { memo, type NamedExoticComponent } from "react";

import { Icon } from "@iconify/react";
import MuiFab, { type FabProps as MuiFabProps } from "@mui/material/Fab";
import MuiFade from "@mui/material/Fade";
import useScrollTrigger from "@mui/material/useScrollTrigger";

/**
 * @example
 * const [scrollTarget, setScrollTarget] = useState<HTMLElement | undefined>(undefined);
 *
 * return (
 *   <div sx={{ position: "relative" }}>
 *     <div
 *       style={{ overflowY: "scroll", height: "100vh" }}
 *       ref={(node: HTMLElement) => node && setScrollTarget(node)}
 *     >
 *       // ...
 *       // ...
 *     </div>
 *     <BackToTop target={scrollTarget} />
 *   </div>
 * );
 */
const BackToTop: NamedExoticComponent<{
  target: HTMLElement | undefined;
  sx?: MuiFabProps["sx"];
}> = memo(({ target, sx }) => {
  const trigger = useScrollTrigger({
    target,
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <MuiFade in={trigger}>
      <MuiFab
        color="primary"
        sx={{ position: "absolute", bottom: 80, right: 40, ...sx }}
        onClick={() => {
          if (target) {
            target.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        <Icon icon="solar:alt-arrow-up-linear" width={20} />
      </MuiFab>
    </MuiFade>
  );
});

export default BackToTop;
