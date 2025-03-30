import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Link, Typography } from "~/ui/components";

type AuthLayoutTitleProps = {
  title: string;
  subtitle: string;
  subTitleExtraText?: string;
  subTitleExtraUrl?: string;
};

const AuthLayoutTitle: NamedExoticComponent<AuthLayoutTitleProps> = memo(
  ({ title, subtitle, subTitleExtraText, subTitleExtraUrl }) => {
    return (
      <Typography component="div" sx={{ width: 1, transform: "translateY(-40px)" }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
          {title}
        </Typography>

        <Typography variant="subtitle2">
          <Typography component="span" color="text.secondary">
            {subtitle}
          </Typography>
          &nbsp;
          {subTitleExtraUrl && (
            <Link to={subTitleExtraUrl}>
              <Typography component="span" fontWeight="bold" color="primary.main">
                {subTitleExtraText}
              </Typography>
            </Link>
          )}
        </Typography>
      </Typography>
    );
  },
);

export default AuthLayoutTitle;
