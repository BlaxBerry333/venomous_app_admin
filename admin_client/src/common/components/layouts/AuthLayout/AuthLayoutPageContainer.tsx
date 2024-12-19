import type { FC, ReactNode } from "react";
import { memo } from "react";

import MuiCard from "@mui/material/Card";
import MuiTypography from "@mui/material/Typography";

import { CustomRouterLink } from "~/common/components/custom/router-link";

const AuthLayoutPageContainer: FC<{
  title: string;
  subtitle: string;
  subtitleLink: string;
  form: ReactNode;
}> = ({ title, subtitle, subtitleLink, form }) => {
  return (
    <>
      <MuiTypography variant="h2">{title}</MuiTypography>

      <CustomRouterLink to={subtitleLink} underline="hover" typography="subtitle2" sx={{ my: 2 }}>
        {subtitle}
      </CustomRouterLink>

      <MuiCard
        variant="outlined"
        sx={{
          minHeight: 410,
          width: 380,
          py: 4,
          px: 2,
        }}
      >
        {form}
      </MuiCard>
    </>
  );
};

export default memo(AuthLayoutPageContainer);
