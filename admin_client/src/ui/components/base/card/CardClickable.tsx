import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import MuiCardActionArea from "@mui/material/CardActionArea";
import MuiCardContent, {
  type CardContentProps as MuiCardContentProps,
} from "@mui/material/CardContent";

type CardClickableProps = PropsWithChildren<Omit<MuiCardContentProps, "onClick">> & {
  onClick?: () => void;
  wrapperSx?: MuiCardProps["sx"];
};

const CardClickable: NamedExoticComponent<CardClickableProps> = memo(
  ({ children, onClick, wrapperSx, sx, ...props }) => {
    return (
      <MuiCard
        sx={{
          boxShadow: "none",
          borderRadius: 4,
          backgroundColor: "transparent",
          backgroundImage: "none",
          border: 0,
          p: 0,
          ...wrapperSx,
        }}
      >
        <MuiCardActionArea onClick={onClick} sx={{ borderRadius: 4, overflow: "hidden" }}>
          <MuiCardContent sx={{ py: 3, px: 3, ...sx }} {...props}>
            {children}
          </MuiCardContent>
        </MuiCardActionArea>
      </MuiCard>
    );
  },
);

export default CardClickable;
