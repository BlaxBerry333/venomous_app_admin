import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import MuiStack from "@mui/material/Stack";

import type { ICurrentUserProfileResponse } from "~/app/types/_user";
import { BaseColor, BasePosition, BaseSize } from "~/ui/_helpers";
import {
  AnimationAvatar,
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
import { elementID } from "~/ui/templates";
import { useAPIAuthLogout } from "~/utils/libs/apis/_hooks/auth";
import { useAPIUserProfile } from "~/utils/libs/apis/_hooks/user";
import { AUTH_PATHS, useRouteNavigate } from "~/utils/libs/router";
import { formateDateTime, formateFromNow } from "~/utils/libs/tools/datetime";

const DashboardLayoutAccount: NamedExoticComponent = memo(() => {
  const popover = usePopover();

  return (
    <Portal targetElementID={elementID}>
      <AnimationAvatar
        src="https://avatars.githubusercontent.com/u/166675080?v=4"
        size={BaseSize.SMALL}
        onClick={popover.handleOpen}
      />
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
  const { data } = useAPIUserProfile<ICurrentUserProfileResponse>();

  if (!data) {
    return null;
  }
  return (
    <ModalWrapper
      escapeKeyDown
      renderModalTrigger={(params) => (
        <ListItem title="个人信息" icon="solar:user-id-line-duotone" onClick={params.handleOpen} />
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
                上次登录:
              </Typography>
              <Typography variant="subtitle2" noWrap>
                {formateFromNow(data.last_login)}
              </Typography>
            </div>
          )}

          <div>
            <Typography variant="subtitle2" color="text.secondary">
              注册时间:
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
    const { replace } = useRouteNavigate();

    const { mutateAsync, isPending } = useAPIAuthLogout();

    const handleLogout = useCallback(async () => {
      mutateAsync()
        .then(() => {
          toast.success("LOGOUT SUCCESS");
        })
        .catch(() => {
          toast.error("LOGOUT FAILED");
        })
        .finally(() => {
          replace(AUTH_PATHS.login);
          callback();
        });
    }, [mutateAsync, replace, callback]);

    return (
      <ModalWrapper
        escapeKeyDown
        title="确定要退出登录吗?"
        handleConfirm={() => handleLogout()}
        isConfirmLoading={isPending}
        renderModalTrigger={(params) => (
          <ListItem
            title="退出登录"
            icon="solar:logout-2-line-duotone"
            onClick={params.handleOpen}
          />
        )}
      />
    );
  },
);
