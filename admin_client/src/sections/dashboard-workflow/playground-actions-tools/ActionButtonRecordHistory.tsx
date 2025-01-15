import type { NamedExoticComponent } from "react";

import { Icon } from "@iconify/react";
import { memo, useState } from "react";

import MuiDivider from "@mui/material/Divider";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";
import MuiMenu from "@mui/material/Menu";
import MuiTypography from "@mui/material/Typography";

import { CustomSquareBlock } from "~/common/components/custom/buttons";
import { DASHBOARD_WORKFLOW_CONFIGS } from "~/configs";

const ActionButtonRecordHistory: NamedExoticComponent = memo(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenHistoryList = Boolean(anchorEl);
  const openHistoryList = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const closeHistoryList = () => setAnchorEl(null);

  // ----------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <CustomSquareBlock style={{ height: 40, width: 40 }} disabled onClick={openHistoryList}>
        <Icon icon="solar:history-bold-duotone" width={24} />
      </CustomSquareBlock>

      <MuiMenu
        anchorEl={anchorEl}
        open={isOpenHistoryList}
        onClose={closeHistoryList}
        slotProps={{
          paper: {
            sx: {
              minWidth: 250,
              height: 285,
              borderRadius: 2,
              mt: 1,
              mr: 2,
              pt: 2,
              px: 1,
            },
          },
        }}
        MenuListProps={{
          dense: true,
          disablePadding: true,
        }}
      >
        <MuiTypography variant="subtitle1" sx={{ px: 2 }}>
          {"历史记录"}
        </MuiTypography>
        <MuiDivider />

        {[...new Array(DASHBOARD_WORKFLOW_CONFIGS.RecordHistoryMaxCount)]
          .map((_, i) => i)
          .sort((a, b) => b - a)
          .map((i) => (
            <MuiListItemButton key={i} sx={{ py: 0 }} onClick={() => {}}>
              <MuiListItemIcon sx={{ typography: "subtitle2" }}>{`#${i + 1}`}</MuiListItemIcon>

              <MuiListItemText
                primary={"xxxxxxx"}
                secondary={new Date().toDateString()}
                primaryTypographyProps={{ variant: "subtitle2", noWrap: true }}
                secondaryTypographyProps={{ variant: "caption", noWrap: true }}
              />
            </MuiListItemButton>
          ))}
      </MuiMenu>
    </>
  );
});

export default ActionButtonRecordHistory;
