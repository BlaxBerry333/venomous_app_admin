import type { NamedExoticComponent } from "react";
import { memo, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { ICurrentUserProfileResponse } from "~/app/types/_user";
import { BaseColor, BasePosition, BaseSize } from "~/ui/_helpers";
import {
  AnimationAvatar,
  Icon,
  ListItem,
  Menu,
  Modal,
  Popover,
  toast,
  Typography,
  usePopover,
} from "~/ui/components";
import { useAPIAuthLogout } from "~/utils/libs/apis/_hooks/auth";
import { useAPIUserProfile } from "~/utils/libs/apis/_hooks/user";
import { useRouteNavigate } from "~/utils/libs/router";
import { formateDateTime, formateFromNow } from "~/utils/libs/tools/datetime";

const DashboardLayoutAccount: NamedExoticComponent = memo(() => {
  const popover = usePopover();

  // ----------------------------------------------------------------------------------------------------

  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const element = document.getElementById("dashboard-layout-account");
    setTargetElement(element);
  }, []);

  // ----------------------------------------------------------------------------------------------------

  if (!targetElement) {
    return null;
  }

  return createPortal(
    <>
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
        <Menu subheader={<PopoverItemOfCurrentUserProfile />}>
          <PopoverItemOfAuthLogout callback={popover.handleClose} />
        </Menu>
      </Popover>
    </>,
    targetElement,
    "dashboard-layout-account",
  );
});

export default DashboardLayoutAccount;

const PopoverItemOfCurrentUserProfile: NamedExoticComponent = memo(() => {
  const { data } = useAPIUserProfile<ICurrentUserProfileResponse>();

  if (!data) {
    return null;
  }

  return (
    <Modal
      renderModalTrigger={(params) => (
        <ListItem
          title="个人信息"
          icon="solar:user-circle-line-duotone"
          onClick={params.handleOpen}
        />
      )}
      renderModalContent={() => (
        <>
          <Typography
            component="div"
            variant="h6"
            noWrap
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6" noWrap>
              {data.username}
            </Typography>
            {data.is_superuser && (
              <Icon icon="solar:crown-line-bold-duotone" color={BaseColor.PRIMARY} sx={{ mx: 1 }} />
            )}
          </Typography>

          <Typography variant="subtitle1" noWrap color="text.secondary" sx={{ mb: 2 }}>
            {data.email}
          </Typography>

          {data.last_login && (
            <>
              <Typography variant="subtitle2" color="text.secondary">
                上次登录:
              </Typography>
              <Typography variant="subtitle2" noWrap sx={{ mb: 1 }}>
                {formateFromNow(data.last_login)}
              </Typography>
            </>
          )}

          <Typography variant="subtitle2" color="text.secondary">
            注册时间:
          </Typography>
          <Typography variant="subtitle2" noWrap>
            {data.last_login ? formateDateTime(data.date_joined) : formateFromNow(data.date_joined)}
          </Typography>
        </>
      )}
    />
  );
});

const PopoverItemOfAuthLogout: NamedExoticComponent<{ callback: VoidFunction }> = memo(
  ({ callback }) => {
    const { replace } = useRouteNavigate();

    const { mutateAsync } = useAPIAuthLogout();

    const handleLogout = useCallback(() => {
      mutateAsync()
        .then(() => {
          toast.success("LOGOUT SUCCESS");
          replace("/auth/login");
        })
        .catch(() => {
          toast.error("LOGOUT FAILED");
          replace("/auth/login");
        })
        .finally(() => {
          callback();
        });
    }, [mutateAsync, replace, callback]);

    return <ListItem title="退出登录" icon="solar:logout-2-line-duotone" onClick={handleLogout} />;
  },
);
