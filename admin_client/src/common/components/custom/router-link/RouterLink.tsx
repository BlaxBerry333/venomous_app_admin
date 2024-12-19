import type { FC, PropsWithChildren } from "react";
import { memo } from "react";

import { Link as ReactRouterLink, type LinkProps as ReactRouterLinkProps } from "react-router-dom";

import MuiLink, { type LinkProps as MuiLinkProps } from "@mui/material/Link";

type Props = ReactRouterLinkProps & MuiLinkProps;

const CustomRouterLink: FC<PropsWithChildren<Props>> = ({ children, to, ...props }) => {
  return (
    <MuiLink component={ReactRouterLink} to={to} color="primary" underline="hover" {...props}>
      {children}
    </MuiLink>
  );
};

export default memo(CustomRouterLink);
