import type { FC, PropsWithChildren } from "react";
import { memo, Suspense } from "react";

import MuiLoadingButton from "@mui/lab/LoadingButton";
import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiIconButton from "@mui/material/IconButton";
import MuiTypography from "@mui/material/Typography";

import { _MOCK_USER } from "~/__mocks__/_user";
import useAccount from "~/common/hooks/use-dashboard/useAccount";
import useBoolean from "~/common/hooks/useBoolean";

const DashboardLayoutUserAccountDrawerButton: FC = () => {
  const profileDrawer = useBoolean(false);

  return (
    <>
      <MuiIconButton onClick={profileDrawer.setTrue}>
        <MuiAvatar
          alt={_MOCK_USER.displayname}
          src={_MOCK_USER.avatar}
          imgProps={{ draggable: false }}
        />
      </MuiIconButton>

      <Suspense>
        <DashboardLayoutUserAccountDrawer
          isOpen={profileDrawer.value}
          onOpen={profileDrawer.setTrue}
          onClose={profileDrawer.setFalse}
        >
          <MuiBox
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              pt: 8,
              pb: 4,
            }}
          >
            <MuiAvatar
              alt={_MOCK_USER.displayname}
              src={_MOCK_USER.avatar}
              sx={{ width: 80, height: 80, mt: 2, mb: 4 }}
              imgProps={{ draggable: false }}
            />
            <MuiTypography variant="h6">{_MOCK_USER.displayname}</MuiTypography>
            <MuiTypography variant="body2" color="textSecondary">
              {_MOCK_USER.email}
            </MuiTypography>
          </MuiBox>

          <MuiBox sx={{ px: 2 }}>...</MuiBox>
        </DashboardLayoutUserAccountDrawer>
      </Suspense>
    </>
  );
};

const DashboardLayoutUserAccountDrawer = memo<
  PropsWithChildren<{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }>
>(({ children, isOpen, onClose }) => {
  const { isLogoutLoading, handleLogout } = useAccount();

  return (
    <MuiDrawer
      variant="temporary"
      anchor="right"
      ModalProps={{ keepMounted: true }}
      open={isOpen}
      onClose={onClose}
      sx={{
        display: "block",
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 300 },
      }}
    >
      <MuiBox
        sx={{
          height: "calc(100svh - 80px)",
          overflowY: "scroll",
        }}
      >
        {children}
      </MuiBox>

      <MuiBox sx={{ height: 80, display: "flex", alignItems: "center", px: 1 }}>
        <MuiLoadingButton
          size="large"
          color="error"
          fullWidth
          onClick={handleLogout}
          loading={isLogoutLoading}
        >
          {"Logout"}
        </MuiLoadingButton>
      </MuiBox>
    </MuiDrawer>
  );
});

export default memo(DashboardLayoutUserAccountDrawerButton);
