import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";
import MuiChip from "@mui/material/Chip";

export type SectionWithLabelProps = PropsWithChildren<MuiBoxProps> & {
  title: string;
  wrapperSx?: MuiBoxProps["sx"];
};

const SectionWithLabel: NamedExoticComponent<SectionWithLabelProps> = memo(
  ({ title, children, sx, wrapperSx, ...props }) => {
    return (
      <MuiBox
        component="section"
        sx={{
          position: "relative",
          mt: 2,
          ...wrapperSx,
        }}
        {...props}
      >
        <MuiChip
          label={title}
          variant="outlined"
          sx={{
            position: "absolute",
            top: -12,
            left: 8,
            zIndex: 1,
            height: 24,
            bgcolor: "background.paper",
            transition: "background-color 0s ease-in-out",
            color: "text.primary",
            borderColor: "divider",
            fontWeight: "bold",
          }}
        />

        <MuiBox
          sx={{
            px: 2,
            pt: 4,
            pb: 3,
            border: 1,
            borderColor: "divider",
            borderRadius: 4,
            fontWeight: "normal",
            ...sx,
          }}
        >
          {children}
        </MuiBox>
      </MuiBox>
    );
  },
);

export default SectionWithLabel;
