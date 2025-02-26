import type { CSSProperties, NamedExoticComponent } from "react";
import { memo } from "react";

import MuiBox from "@mui/material/Box";
import { m } from "motion/react";

import { getColor } from "~/ui/_helpers";
import { Avatar, type AvatarProps } from "~/ui/components/base/avatar";
import AnimationWrapper from "../AnimationWrapper";

const AnimationAvatar: NamedExoticComponent<
  AvatarProps & {
    wrapperStyle?: CSSProperties;
  }
> = memo(({ wrapperStyle, ...props }) => {
  return (
    <AnimationWrapper style={{ display: "inline-block", ...wrapperStyle }}>
      <MuiBox
        sx={{
          flexShrink: 0,
          borderRadius: "50%",
          position: "relative",
          alignItems: "center",
          display: "inline-flex",
          justifyContent: "center",
          cursor: "pointer",
          p: 0.25,
        }}
      >
        <Avatar {...props} />

        <MuiBox
          component={m.span}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          sx={{
            padding: "3px",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: "inherit",
            transition: "all 0s !important",
            background: ({ palette }) =>
              `conic-gradient(${getColor(palette.primary.main).opacity(0.1)}, ${palette.primary.main}, transparent, transparent)`,
            mask: ({ palette }) =>
              `linear-gradient(${palette.background.paper} 0 0) content-box, linear-gradient(${palette.background.paper} 0 0)`,
            WebkitMask: ({ palette }) =>
              `linear-gradient(${palette.background.paper} 0 0) content-box, linear-gradient(${palette.background.paper} 0 0)`,
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />
      </MuiBox>
    </AnimationWrapper>
  );
});

export default AnimationAvatar;
