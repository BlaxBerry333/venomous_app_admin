import type { FC, PropsWithChildren } from "react";
import { memo } from "react";

import MuiContainer from "@mui/material/Container";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MuiContainer
      maxWidth="xs"
      sx={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </MuiContainer>
  );
};

export default memo(AuthLayout);
