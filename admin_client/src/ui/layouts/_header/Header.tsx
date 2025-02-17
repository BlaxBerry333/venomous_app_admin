import type { NamedExoticComponent, PropsWithChildren, ReactNode } from "react";
import { memo, useEffect, useState } from "react";

import { throttle } from "lodash-es";

import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";
import type { Theme as MuiTheme } from "@mui/material/styles";

import { getColor } from "~/ui/_helpers";
import { HEADER_HEIGHT } from "~/ui/_hooks";

export enum HeaderDesign {
  NONE = "none",
  GLASS = "glass",
  SHADOW = "shadow",
}

export type HeaderProps = PropsWithChildren<MuiBoxProps> & {
  height?: number;
  design?: HeaderDesign;
  hideOnScroll?: boolean;
  renderLogo?: () => ReactNode;
  renderActions?: () => ReactNode;
};

const Header: NamedExoticComponent<HeaderProps> = memo(
  ({
    height = HEADER_HEIGHT,
    design = HeaderDesign.NONE,
    hideOnScroll = false,
    renderLogo,
    renderActions,
    ...props
  }) => {
    const { transformValue } = useHideOnScroll({ height, hideOnScroll });

    return (
      <MuiBox
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          height: `${height}px`,
          width: "100%",
          display: "flex",
          alignItems: "center",
          px: 2,
          transform: hideOnScroll ? `translateY(-${transformValue}px)` : "none",
          transition: "transform 0.2s linear",
          ...getLayoutHeaderDesignStyle(design),
        }}
        {...props}
      >
        {/* Logo */}
        {renderLogo?.()}

        <div style={{ flexGrow: 1 }} />

        {/* Actions */}
        {renderActions?.()}
      </MuiBox>
    );
  },
);

export default Header;

function getLayoutHeaderDesignStyle(design: HeaderDesign): MuiBoxProps["sx"] {
  switch (design) {
    case HeaderDesign.GLASS:
      return {
        backdropFilter: "blur(8px)",
        backgroundColor: ({ palette }: MuiTheme) => getColor(palette.background.default).opacity(),
      };
    case HeaderDesign.SHADOW:
      return {
        backgroundColor: ({ palette }: MuiTheme) => palette.background.paper,
        boxShadow: 2,
      };
    case HeaderDesign.NONE:
    default:
      return {
        borderBottom: 1,
        borderColor: "divider",
      };
  }
}

function useHideOnScroll({
  height = HEADER_HEIGHT,
  hideOnScroll = false,
}: {
  height?: number;
  hideOnScroll?: boolean;
}) {
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [transformValue, setTransformValue] = useState<number>(0);

  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = throttle(() => {
      const scrollY: number = window.scrollY;
      const delta: number = scrollY - lastScrollY;
      setTransformValue((prev) => {
        if (delta > 0) return Math.min(prev + delta, height);
        return Math.max(prev + delta, 0);
      });
      setLastScrollY(scrollY);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [lastScrollY, height, hideOnScroll]);

  return { transformValue };
}
