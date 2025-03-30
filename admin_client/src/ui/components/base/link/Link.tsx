import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiLink, { type LinkProps as MuiLinkProps } from "@mui/material/Link";
import { Link as ReactRouterLink, type LinkProps as ReactRouterLinkProps } from "react-router-dom";

type LinkProps = PropsWithChildren<ReactRouterLinkProps & MuiLinkProps>;

const Link: NamedExoticComponent<LinkProps> = memo(({ children, to, sx, ...props }) => {
  return (
    <MuiLink
      component={ReactRouterLink}
      to={to}
      color="primary"
      underline="hover"
      sx={{ display: "inline-block", typography: "body2", fontWeight: "bold", ...sx }}
      {...props}
    >
      {children}
    </MuiLink>
  );
});

export default Link;
