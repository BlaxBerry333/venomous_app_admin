import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiTypography, {
  type TypographyProps as MuiTypographyProps,
} from "@mui/material/Typography";

export enum TypographyVariant {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  SUBTITLE1 = "subtitle1",
  SUBTITLE2 = "subtitle2",
  BODY1 = "body1",
  BODY2 = "body2",
  CAPTION = "caption",
}

export enum TypographyColor {
  INHERIT = "inherit",
  PRIMARY = "primary",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export type TypographyProps = PropsWithChildren<MuiTypographyProps>;

const Typography: NamedExoticComponent<TypographyProps> = memo(({ variant, color, ...props }) => {
  return (
    <MuiTypography
      variant={variant || TypographyVariant.BODY2}
      color={color || TypographyColor.INHERIT}
      {...props}
    />
  );
});

export default Typography;
