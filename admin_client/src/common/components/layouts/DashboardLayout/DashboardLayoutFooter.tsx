import type { FC } from "react";
import { memo } from "react";

import { Icon } from "@iconify/react";

import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiDivider from "@mui/material/Divider";
import MuiTypography from "@mui/material/Typography";

import { ADMIN_CLIENT_CONFIGS } from "~/configs/_base";

const COPYRIGHT_TEXT =
  `Copyright © ${new Date().getFullYear()} - ${ADMIN_CLIENT_CONFIGS.info.author}` as const;

const LINKS = [
  {
    href: ADMIN_CLIENT_CONFIGS.links.twitter,
    icon: <Icon icon="logos:x" />,
  },
  {
    href: ADMIN_CLIENT_CONFIGS.links.repository,
    icon: <Icon icon="devicon:github" width={32} />,
  },
] as const;

const DashboardLayoutFooter: FC = () => {
  // ----------------------------------------------------------------------------------------------------

  return (
    <MuiBox component="footer">
      <MuiDivider />
      <MuiTypography
        component="div"
        sx={{ p: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}
      >
        <MuiTypography variant="caption" sx={{ color: "text.secondary", mx: 2 }}>
          {COPYRIGHT_TEXT}
        </MuiTypography>

        {LINKS.map((link) => (
          <MuiAvatar
            key={link.href}
            component="a"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ width: 32, height: 32, mx: 0.5 }}
          >
            {link.icon}
          </MuiAvatar>
        ))}
      </MuiTypography>
    </MuiBox>
  );
};

export default memo(DashboardLayoutFooter);
