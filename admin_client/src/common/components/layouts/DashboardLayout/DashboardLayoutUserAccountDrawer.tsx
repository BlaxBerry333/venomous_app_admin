import type { FC, PropsWithChildren } from "react";
import { memo, Suspense, useMemo } from "react";

import MuiLoadingButton from "@mui/lab/LoadingButton";
import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiIconButton from "@mui/material/IconButton";
import MuiList from "@mui/material/List";
import MuiTypography from "@mui/material/Typography";

import { Icon } from "@iconify/react";

import useAccount from "~/common/hooks/use-dashboard/useAccount";
import useBoolean from "~/common/hooks/useBoolean";
import useTranslation from "~/common/hooks/useTranslation";
import { formatDate } from "~/common/utils/handle-date-formatters";
import { useGetUserProfile } from "~/services/apis-hooks/users";

const DashboardLayoutUserAccountDrawerButton: FC = () => {
  const { t } = useTranslation();

  const profileDrawer = useBoolean(false);

  // ----------------------------------------------------------------------------------------------------

  const { data: user } = useGetUserProfile();

  const userProfileMenuItems = useMemo(
    () => [
      {
        title: t("auth.user-data.last_login"),
        label: formatDate(user?.last_login),
      },
      {
        title: t("auth.user-data.date_joined"),
        label: formatDate(user?.date_joined),
      },
      {
        title: t("auth.user-data.role"),
        label: user?.is_superuser
          ? t("auth.user-data.super-admin-user")
          : user?.is_staff
            ? t("auth.user-data.normal-admin-user")
            : t("auth.user-data.normal-user"),
      },
      {
        title: t("auth.user-data.is_active"),
        label: (
          <Icon
            icon={
              user?.is_active
                ? "solar:check-circle-bold-duotone"
                : "solar:close-circle-bold-duotone"
            }
            width={24}
            height={24}
          />
        ),
      },
    ],
    [user, t],
  );

  // ----------------------------------------------------------------------------------------------------

  return (
    <>
      <MuiIconButton size="large" color="inherit" onClick={profileDrawer.setTrue}>
        <Icon icon="solar:user-circle-bold-duotone" width="32" height="32" />
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
              alt={user?.username}
              sx={{ width: 80, height: 80, mt: 2, mb: 2 }}
              imgProps={{ draggable: false }}
            >
              <Icon icon="solar:user-circle-bold-duotone" width="80" height="80" />
            </MuiAvatar>
            <MuiTypography variant="h6" color="textPrimary">
              {user?.username}
            </MuiTypography>
            <MuiTypography variant="body2" color="textSecondary">
              {user?.email}
            </MuiTypography>
          </MuiBox>

          <MuiList disablePadding sx={{ width: "100%", px: 2, mb: 1 }}>
            {userProfileMenuItems.map((item) => (
              <MuiBox
                key={item.title}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                }}
              >
                <MuiTypography
                  variant="subtitle2"
                  color="textPrimary"
                  noWrap
                  flex={1}
                  textAlign="left"
                >
                  {item.title}
                </MuiTypography>
                <MuiTypography
                  variant="body2"
                  color="textSecondary"
                  noWrap
                  flex={1}
                  textAlign="right"
                >
                  {item.label}
                </MuiTypography>
              </MuiBox>
            ))}
          </MuiList>
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
  const { t } = useTranslation();

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
          {t("common.buttons.logout")}
        </MuiLoadingButton>
      </MuiBox>
    </MuiDrawer>
  );
});

export default memo(DashboardLayoutUserAccountDrawerButton);
