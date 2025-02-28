import type { NamedExoticComponent } from "react";
import { memo } from "react";

import MuiBox from "@mui/material/Box";

const Label: NamedExoticComponent<{ label: string; elementId?: string }> = memo(
  ({ label, elementId }) => {
    return (
      <MuiBox
        component="label"
        htmlFor={elementId}
        sx={{
          typography: "caption",
          fontWeight: "bold",
          color: "text.secondary",
          cursor: "pointer",
        }}
      >
        {label}
      </MuiBox>
    );
  },
);

export default Label;
