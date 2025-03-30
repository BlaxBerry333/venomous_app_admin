import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiPaper, { type PaperProps as MuiPaperProps } from "@mui/material/Paper";
import { Typography, type TypographyProps } from "../typography";

export type PaperProps = PropsWithChildren<
  Omit<MuiPaperProps, "elevation" | "variant"> & {
    hasElevation?: boolean;
    title?: string;
    titleSx?: TypographyProps["sx"];
    subTitle?: string;
    subTitleSx?: TypographyProps["sx"];
    keepSubTitlePlaceholder?: boolean;
  }
>;

const Paper: NamedExoticComponent<PaperProps> = memo(
  ({
    children,
    hasElevation = true,
    title,
    sx,
    titleSx,
    subTitle,
    subTitleSx,
    keepSubTitlePlaceholder = false,
    ...props
  }) => {
    return (
      <MuiPaper
        elevation={hasElevation ? 3 : undefined}
        variant={hasElevation ? "elevation" : "outlined"}
        sx={{
          borderRadius: "8px",
          padding: "4px",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.119), rgba(255, 255, 255, 0.119));",
          transition: "background-color 0s, background-image 0s",
          ...sx,
        }}
        {...props}
      >
        {/* Paper Title */}
        <Typography
          variant="h5"
          noWrap
          sx={{ display: title ? "block" : "none", fontWeight: "bold", ...titleSx }}
        >
          {title}
        </Typography>

        {/* Paper SubTitle */}
        <Typography
          variant="subtitle1"
          noWrap
          sx={{
            display: !subTitle && !keepSubTitlePlaceholder ? "none" : "block",
            opacity: keepSubTitlePlaceholder ? 0 : 1,
            minHeight: "28px",
            lineHeight: "28px",
            fontWeight: "bold",
            color: "text.secondary",
            ...subTitleSx,
          }}
        >
          {subTitle}
        </Typography>

        {/* Paper Content */}
        {children}
      </MuiPaper>
    );
  },
);

export default Paper;
