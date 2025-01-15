import type { FC } from "react";
import { memo, useEffect, useState } from "react";

import NProgress from "nprogress";
import { useLocation } from "react-router-dom";

import GlobalStyles from "@mui/material/GlobalStyles";
import useTheme from "@mui/material/styles/useTheme";

const ProgressBar: FC = () => {
  const { pathname } = useLocation();

  const [mounted, setMounted] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      NProgress.start();
      setVisible(true);
    }
    if (visible) {
      NProgress.done();
      setVisible(false);
    }
    if (!visible && mounted) {
      setVisible(false);
      NProgress.done();
    }
    return () => {
      NProgress.done();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, mounted]);

  if (!mounted) return null;
  return <StyledProgressBar />;
};

function StyledProgressBar() {
  const muiTheme = useTheme();
  const color = muiTheme.palette.primary.main;

  return (
    <GlobalStyles
      styles={{
        "#nprogress": {
          top: 0,
          left: 0,
          width: "100%",
          height: "2.5px",
          zIndex: 9999,
          position: "fixed",
          pointerEvents: "none",
          ".bar": {
            height: "100%",
            backgroundColor: color,
            boxShadow: `0 0 2.5px ${color}`,
          },
          ".peg": {
            right: 0,
            opacity: 1,
            width: "100px",
            height: "100%",
            display: "block",
            position: "absolute",
            transform: "rotate(3deg) translate(0px, -4px)",
            boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
          },
        },
      }}
    />
  );
}

const ProgressBarMemo = memo(ProgressBar);
export default ProgressBarMemo;
