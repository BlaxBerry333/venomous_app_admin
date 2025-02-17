import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import MuiCardActionArea from "@mui/material/CardActionArea";
import MuiChip from "@mui/material/Chip";

export type SectionWithLabelProps = PropsWithChildren<MuiBoxProps> & {
  title: string;
  isClickableArea?: boolean;
  onClick?: () => void;
  wrapperSx?: MuiBoxProps["sx"];
};

const SectionWithLabel: NamedExoticComponent<SectionWithLabelProps> = memo(
  ({ title, children, isClickableArea = false, onClick, sx, wrapperSx, ...props }) => {
    return (
      <MuiBox
        sx={{
          position: "relative",
          mt: 2,
          ...(isClickableArea
            ? { cursor: "pointer" }
            : {
                px: 2,
                pt: 4,
                pb: 2,
                border: 1,
                borderColor: "divider",
                borderRadius: 3,
              }),
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

        {isClickableArea && (
          <MuiCard
            id="xx"
            variant="outlined"
            sx={{ width: "100%", borderRadius: 3, bgcolor: "transparent" }}
          >
            <MuiCardActionArea
              onClick={onClick}
              sx={{
                ...sx,
                px: 2,
                pt: 3,
                pb: 2,
              }}
            >
              {children}
            </MuiCardActionArea>
          </MuiCard>
        )}

        {!isClickableArea && children}
      </MuiBox>
    );
  },
);

export default SectionWithLabel;
