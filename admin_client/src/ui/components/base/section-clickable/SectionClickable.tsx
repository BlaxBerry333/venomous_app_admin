import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import MuiCardActionArea from "@mui/material/CardActionArea";
import MuiCardContent, {
  type CardContentProps as MuiCardContentProps,
} from "@mui/material/CardContent";

export type SectionClickableProps = PropsWithChildren<Omit<MuiCardContentProps, "onClick">> & {
  onClick?: () => void;
  wrapperSx?: MuiCardProps["sx"];
};

const SectionClickable: NamedExoticComponent<SectionClickableProps> = memo(
  ({ children, onClick, wrapperSx, ...props }) => {
    return (
      <MuiCard
        sx={{
          boxShadow: "none",
          borderRadius: 4,
          backgroundColor: "transparent",
          backgroundImage: "none",
          border: 0,
          ...wrapperSx,
        }}
      >
        <MuiCardActionArea onClick={onClick}>
          <MuiCardContent {...props}>{children}</MuiCardContent>
        </MuiCardActionArea>
      </MuiCard>
    );
  },
);

export default SectionClickable;
