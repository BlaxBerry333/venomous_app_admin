import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import MuiStack from "@mui/material/Stack";

import { BaseColor, BasePosition } from "~/ui/_helpers";
import {
  AnimationIconButton,
  Icon,
  ListItem,
  Menu,
  ModalWrapper,
  Popover,
  Portal,
  toast,
  Typography,
  usePopover,
} from "~/ui/components";
import { dashboardAccountProtalElementID } from "~/ui/templates";
import { useAPIAuthLogout } from "~/utils/libs/apis/_hooks/auth";
import { useAPIUserProfile } from "~/utils/libs/apis/_hooks/user";
import type { ICurrentUserProfileResponse } from "~/utils/libs/apis/types/_user";
import { useTranslation } from "~/utils/libs/i18n";
import { AUTH_PATHS, useRouteNavigate } from "~/utils/libs/router";
import { formateDateTime, formateFromNow } from "~/utils/libs/tools/datetime";

const DashboardLayoutAccount: NamedExoticComponent = memo(() => {
  const popover = usePopover();

  return (
    <Portal targetElementID={dashboardAccountProtalElementID}>
      <AnimationIconButton icon="solar:user-circle-bold-duotone" onClick={popover.handleOpen} />
      <Popover
        isOpen={popover.isOpen}
        anchorEl={popover.anchorEl}
        handleClose={popover.handleClose}
        position={BasePosition.BOTTOM_LEFT}
      >
        <Menu>
          <PopoverItemOfCurrentUserProfile />
          <PopoverItemOfAuthLogout callback={popover.handleClose} />
        </Menu>
      </Popover>
    </Portal>
  );
});

export default DashboardLayoutAccount;

const PopoverItemOfCurrentUserProfile: NamedExoticComponent = memo(() => {
  const { t } = useTranslation("auth");
  const { data } = useAPIUserProfile<ICurrentUserProfileResponse>();

  if (!data) {
    return null;
  }
  return (
    <ModalWrapper
      renderModalTrigger={(params) => (
        <ListItem
          title={t("buttons.PROFILE")}
          icon="solar:user-id-line-duotone"
          onClick={params.handleOpen}
        />
      )}
      renderModalContent={() => (
        <MuiStack spacing={2}>
          <div>
            <Typography component="div" noWrap sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" noWrap>
                {data.username}
              </Typography>
              {data.is_superuser && (
                <Icon
                  icon="solar:crown-line-bold-duotone"
                  color={BaseColor.PRIMARY}
                  sx={{ mx: 1 }}
                />
              )}
            </Typography>

            <Typography variant="subtitle1" noWrap color="text.secondary">
              {data.email}
            </Typography>
          </div>

          {data.last_login && (
            <div>
              <Typography variant="subtitle2" color="text.secondary">
                {t("labels.UPDATED_AT")}
              </Typography>
              <Typography variant="subtitle2" noWrap>
                {formateFromNow(data.last_login)}
              </Typography>
            </div>
          )}

          <div>
            <Typography variant="subtitle2" color="text.secondary">
              {t("labels.CREATED_AT")}
            </Typography>
            <Typography variant="subtitle2" noWrap>
              {data.last_login
                ? formateDateTime(data.date_joined)
                : formateFromNow(data.date_joined)}
            </Typography>
          </div>
        </MuiStack>
      )}
    />
  );
});

const PopoverItemOfAuthLogout: NamedExoticComponent<{ callback: VoidFunction }> = memo(
  ({ callback }) => {
    const { t } = useTranslation("auth");
    const { replace } = useRouteNavigate();

    const { mutateAsync, isPending } = useAPIAuthLogout();

    const handleLogout = useCallback(async () => {
      mutateAsync()
        .then(() => toast.success(t("alerts.LOGOUT_SUCCESS")))
        .catch(() => toast.error(t("alerts.LOGOUT_FAILED")))
        .finally(() => {
          replace(AUTH_PATHS.login);
          callback();
        });
    }, [mutateAsync, replace, callback, t]);

    return (
      <ModalWrapper
        escapeKeyDown
        title={t("titles.CONFIRM_LOGOUT")}
        cancelText={t("buttons.CANCEL")}
        confirmText={t("buttons.LOGOUT")}
        handleConfirm={handleLogout}
        isConfirmLoading={isPending}
        renderModalTrigger={(params) => (
          <ListItem
            title={t("buttons.LOGOUT")}
            icon="solar:logout-2-line-duotone"
            onClick={params.handleOpen}
          />
        )}
      />
    );
  },
);
