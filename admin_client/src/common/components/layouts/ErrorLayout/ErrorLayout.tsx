import type { FC, PropsWithChildren } from "react";
import { memo } from "react";

import MuiBox from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";

const ErrorLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MuiContainer
      maxWidth="md"
      sx={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MuiBox>{children}</MuiBox>
    </MuiContainer>
  );
};

export default memo(ErrorLayout);
